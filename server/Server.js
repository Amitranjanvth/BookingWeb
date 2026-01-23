import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/database.js';
import { clerkMiddleware } from '@clerk/express'
import ClerkWebhooks from './controllers/ClerkWebhooks.js';
import hotelRouter from './route/hotelRoutes.js';
import roomRouter from './route/roomRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import bookingRouter from './route/bookingRoutes.js'



connectDB();
connectCloudinary();

const app = express();
app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());



app.use("/api/clerk", ClerkWebhooks);


app.use('/api/hotel', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);



app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

export default app;
