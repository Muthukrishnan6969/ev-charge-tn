import { Request, Response } from 'express';
import ChargingStation from '../models/ChargingStation';

// @desc    Get all charging stations
// @route   GET /api/stations
// @access  Public
export const getStations = async (req: Request, res: Response) => {
  try {
    const { city, network, type, minRating } = req.query;

    const query: any = {};

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }
    
    if (network) {
      query.network = { $regex: network, $options: 'i' };
    }

    if (type) {
        query['chargers.type'] = type;
    }

    if (minRating) {
        query.rating = { $gte: Number(minRating) };
    }

    const stations = await ChargingStation.find(query);
    res.json(stations);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Get single charging station by ID
// @route   GET /api/stations/:id
// @access  Public
export const getStationById = async (req: Request, res: Response) => {
  try {
    const station = await ChargingStation.findById(req.params.id);

    if (station) {
      res.json(station);
    } else {
      res.status(404).json({ message: 'Charging station not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};
