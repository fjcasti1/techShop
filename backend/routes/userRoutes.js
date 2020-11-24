import express from 'express';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js';

const router = express.Router();

// Register user
router.post('/', registerUser);
// Log in user
router.post('/login', authUser);
// Get logged in user profile data
router.get('/profile', protect, getUserProfile);
// Update user profile
router.put('/profile', protect, updateUserProfile);

// Get all users. ADMIN
router.get('/', protect, protectAdmin, getUsers);

export default router;
