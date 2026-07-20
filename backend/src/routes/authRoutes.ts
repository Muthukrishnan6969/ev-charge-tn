import express from 'express';
import { registerUser, authUser, getUserProfile, toggleFavorite } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.post('/favorites/:id', protect, toggleFavorite);

export default router;
