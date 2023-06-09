const express = require('express');
const router = express.Router();

const bookingController = require('../../controllers/booking-controller');

router.post('/bookings',bookingController.create);
router.patch('/bookings/:id',bookingController.update);

module.exports = router;