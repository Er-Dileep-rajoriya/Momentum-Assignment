import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.MONGODB_URL;

export const connectToDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected To Database.");
  } catch (err) {
    console.log("Error in Connecting to Database : ", err);
  }
};
