import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/database.js';
import { clerkMiddleware } from '@clerk/express'
import ClerkWebhooks from './controllers/ClerkWebhooks.js';



connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());



app.use("/api/clerk", ClerkWebhooks);



app.get("/", (req, res) => {
  res.send("Backend running");
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});