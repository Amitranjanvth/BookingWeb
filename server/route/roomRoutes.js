import express from 'express';
import { createRoom, getRooms, getOwnersRooms, toggleRoomAvailability } from '../controllers/roomController.js';
import { protect } from '../middleware/authMiddleware.js';

const roomRouter = express.Router();

roomRouter.post('/', upload, Array('images',4), protect, createRoom);
roomRouter.get('/', getRooms);
roomRouter.get('/owner', protect, getOwnersRooms);
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability);

export default roomRouter;