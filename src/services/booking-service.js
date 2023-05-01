const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const BookingRepository = require("../repository/booking-repository");
const { ServiceError } = require("../utils/error");

class BookingService {
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async create(data){
        try{
            const flightId = data.flightId;
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/flightId`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            let priceOfFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the booking process', 'Insufficient seats in the flight')
            }
            const totalCost = data.noOfSeats * priceOfFlight;
            const bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL, {totalSeats : flightData.totalSeats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id,{status: 'Booked'});
            return finalBooking;
        }catch(err){
            if(err.name === 'RepositoryError' || err.name === 'ValidationError'){
                throw err;
            }
            throw new ServiceError();
        }
    }

}

module.exports = BookingService;