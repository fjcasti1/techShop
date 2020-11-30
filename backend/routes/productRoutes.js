import express from 'express';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts);
router.get('/top', getTopProducts);
router.route('/').post(protect, protectAdmin, createProduct);
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id').put(protect, protectAdmin, updateProduct);
router.route('/:id').delete(protect, protectAdmin, deleteProduct);

export default router;
