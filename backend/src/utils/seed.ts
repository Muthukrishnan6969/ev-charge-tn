import dotenv from 'dotenv';
import ChargingStation from '../models/ChargingStation';
import connectDB from '../config/db';
import { dummyStations } from './seedData';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await ChargingStation.deleteMany();
    await ChargingStation.insertMany(dummyStations);
    console.log(`✅ Data Imported successfully! ${dummyStations.length} Tamil Nadu EV charging stations added.`);
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error}`);
    process.exit(1);
  }
};

importData();
