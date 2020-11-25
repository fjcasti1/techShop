import express from 'express';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/:id').delete(protect, protectAdmin, deleteProduct);

export default router;
