import express from 'express';
import { isAuth, isAdmin } from '../middleware/authMiddleware.js';
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

// Register user
router.post('/', registerUser);
// Log in user
router.post('/login', authUser);
// Get logged in user profile data
router.get('/profile', isAuth, getUserProfile);
// Update user profile
router.put('/profile', isAuth, updateUserProfile);

// Get all users. ADMIN
router.get('/', isAuth, isAdmin, getUsers);
// Delete user. ADMIN
router.delete('/:id', isAuth, isAdmin, deleteUser);
// Get user by Id. ADMIN
router.get('/:id', isAuth, isAdmin, getUserById);
// Update user. ADMIN
router.put('/:id', isAuth, isAdmin, updateUser);

export default router;
