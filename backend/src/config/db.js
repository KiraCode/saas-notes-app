import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully...👍");
  } catch (error) {
    console.log("Failed to connect MongoDB...❌", error);
  }
};

export default db;
