import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
    await mongoose
        .connect(MONGODB_URI)
        .then(() => console.log("connected to database"))
        .catch((err) => console.error(err));
}

export default connectDB
