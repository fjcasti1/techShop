import express from 'express';
import {
  addOrderItems,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, protectAdmin, getAllOrders);
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, protectAdmin, updateOrderToDelivered);

export default router;
