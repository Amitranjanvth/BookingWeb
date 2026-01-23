import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {checkAvailabilityAPI, createBookings, getHotelBookings, getUserBooking} from '../controllers/BookingController.js'


const bookingRouter = express.Router();

bookingRouter.post('/check-availabilty', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBookings);
bookingRouter.get('/user', protect, getUserBooking);
bookingRouter.get('/hotel', protect, getHotelBookings);

export default bookingRouter;