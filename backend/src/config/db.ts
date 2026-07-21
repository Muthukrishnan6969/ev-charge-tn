import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.warn('⚠️ WARNING: MONGO_URI environment variable is not configured!');
  }

  try {
    const conn = await mongoose.connect(mongoUri || 'mongodb://127.0.0.1:27017/ev-charge-india');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

export default connectDB;
