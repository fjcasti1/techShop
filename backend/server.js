import express from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

// Log visualization using morgan in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Accept json data in req.body
app.use(express.json());

// Products Routes
app.use('/api/products', productRoutes);
// Upload Routes
app.use('/api/upload', uploadRoutes);
// Users Routes
app.use('/api/users', userRoutes);
// Order Routes
app.use('/api/orders', orderRoutes);
// Payment Routes
app.use('/api/payments', paymentRoutes);
// PayPal Route
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// 404 Handling
app.use(notFound);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline
      .bold,
  ),
);
