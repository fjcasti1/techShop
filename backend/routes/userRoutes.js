import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  registerUser,
  authUser,
  getUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

// Register user
router.post('/', registerUser);
// Log in user
router.post('/login', authUser);
// Get logged in user
router.get('/profile', protect, getUserProfile);

export default router;
