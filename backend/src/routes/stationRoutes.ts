import express from 'express';
import { getStations, getStationById, seedStations } from '../controllers/stationController';

const router = express.Router();

router.route('/').get(getStations);
router.route('/seed').get(seedStations).post(seedStations);
router.route('/:id').get(getStationById);

export default router;

