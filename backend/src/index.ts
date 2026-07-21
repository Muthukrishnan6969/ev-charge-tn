import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db';
import stationRoutes from './routes/stationRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/stations', stationRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('EV Charge India API is running...');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error: any) {
    console.error(`❌ Server startup failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
