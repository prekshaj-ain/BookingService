const { StatusCodes } = require("http-status-codes");

const { ValidationError, AppError } = require("../utils/error");
const { Booking } = require('../models/index');

class BookingRepository {
  async create(data) {
    try {
        const booking = await Booking.create(data);
        return booking;
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        throw new ValidationError(err);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot create Booking",
        "There is some issue in creating the booking, try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(bookingId, data) {
    try{
      const booking = await Booking.findByPk(bookingId);
      if(data.status){
        booking.status = data.status;
      }
      if(data.noOfSeats){
        booking.noOfSeats = data.noOfSeats;
      }
      await booking.save();
      return booking;
    }catch(err){
      throw new AppError(
        "RepositoryError",
        "Cannot update Booking",
        "There is some issue in updating the booking, try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
