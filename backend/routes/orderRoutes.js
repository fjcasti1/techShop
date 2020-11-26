import express from 'express';
import {
  addOrderItems,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, protectAdmin, getAllOrders);
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
