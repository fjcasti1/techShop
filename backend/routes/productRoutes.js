import express from 'express';
import { isAuth, isAdmin } from '../middleware/authMiddleware.js';
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
router.route('/').post(isAuth, isAdmin, createProduct);
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(isAuth, createProductReview);
router.route('/:id').put(isAuth, isAdmin, updateProduct);
router.route('/:id').delete(isAuth, isAdmin, deleteProduct);

export default router;
