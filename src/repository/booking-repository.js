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

  async update() {
    
  }
}

module.exports = BookingRepository;
