import { Request, Response } from 'express';
import ChargingStation from '../models/ChargingStation';
import { dummyStations, seedDatabaseIfEmpty } from '../utils/seedData';

// @desc    Get all charging stations (with search & filter options)
// @route   GET /api/stations
// @access  Public
export const getStations = async (req: Request, res: Response) => {
  try {
    const { city, network, type, minRating, q } = req.query;

    console.log(`[API /api/stations] Incoming request params:`, req.query);

    // Auto-seed if database is completely empty
    const totalCount = await ChargingStation.countDocuments();
    if (totalCount === 0) {
      console.log('⚠️ [API /api/stations] Database is empty. Triggering auto-seed...');
      await seedDatabaseIfEmpty();
    }

    const queryConditions: any[] = [];

    // Search query support (supports city, state, address, name)
    const searchTerm = (city || q) as string;
    if (searchTerm && searchTerm.trim() !== '') {
      const cleanTerm = searchTerm.trim();
      const regex = new RegExp(cleanTerm, 'i');
      queryConditions.push({
        $or: [
          { city: regex },
          { address: regex },
          { name: regex },
          { state: regex }
        ]
      });
    }

    if (network) {
      const cleanNetwork = (network as string).trim();
      queryConditions.push({ network: new RegExp(cleanNetwork, 'i') });
    }

    if (type) {
      queryConditions.push({ 'chargers.type': type });
    }

    if (minRating) {
      queryConditions.push({ rating: { $gte: Number(minRating) } });
    }

    const filterQuery = queryConditions.length > 0 ? { $and: queryConditions } : {};

    const stations = await ChargingStation.find(filterQuery);
    console.log(`[API /api/stations] Found ${stations.length} stations matching query.`);

    res.json(stations);
  } catch (error: any) {
    console.error(`❌ [API /api/stations] Error:`, error.message);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Seed stations data manually
// @route   POST /api/stations/seed, GET /api/stations/seed
// @access  Public
export const seedStations = async (req: Request, res: Response) => {
  try {
    console.log('🌱 [API /api/stations/seed] Manual seed requested.');
    await ChargingStation.deleteMany({});
    const inserted = await ChargingStation.insertMany(dummyStations);
    console.log(`✅ [API /api/stations/seed] Seeded ${inserted.length} stations.`);
    res.json({ message: `Successfully seeded ${inserted.length} charging stations!`, count: inserted.length, data: inserted });
  } catch (error: any) {
    console.error(`❌ [API /api/stations/seed] Seeding failed:`, error.message);
    res.status(500).json({ message: error.message || 'Seeding failed' });
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
