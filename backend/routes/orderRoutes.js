import express from 'express';
import {
  addOrderItems,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from '../controllers/orderController.js';
import { isAuth, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(isAuth, isAdmin, getAllOrders);
router.route('/').post(isAuth, addOrderItems);
router.route('/myorders').get(isAuth, getUserOrders);
router.route('/:id').get(isAuth, getOrderById);
router.route('/:id/pay').put(isAuth, updateOrderToPaid);
router.route('/:id/deliver').put(isAuth, isAdmin, updateOrderToDelivered);

export default router;
