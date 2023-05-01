const { StatusCodes } = require("http-status-codes");
const BookingService = require("../services/booking-service");

const bookingService = new BookingService();

const create = async (req,res)=>{
    try{
        const response = await bookingService.create(req.body);
        return res.status(StatusCodes.OK).json({
            data: response,
            message: 'Successfully completed booking',
            success: true,
            error: {}
        });
    }catch(error){
        return res.status(error.statusCode).json({
            data: {},
            message: error.message,
            success: false,
            error : error.explaination
        })
    }
}


module.exports = {
    create
}