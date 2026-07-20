import express from 'express';
import { getStations, getStationById } from '../controllers/stationController';

const router = express.Router();

router.route('/').get(getStations);
router.route('/:id').get(getStationById);

export default router;
