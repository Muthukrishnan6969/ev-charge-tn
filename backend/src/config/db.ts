import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    const errorMsg =
      '❌ FATAL DATABASE ERROR: Neither MONGO_URI nor MONGODB_URI environment variable is set!\n' +
      'Please configure MONGO_URI in your environment variables (.env locally or Render Dashboard).';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`❌ MongoDB Connection Failure: ${error.message}`);
    throw error;
  }
};

export default connectDB;
