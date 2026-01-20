import express from 'express';
import { getUserData } from '../controllers/userControllers';

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);

export default userRouter;