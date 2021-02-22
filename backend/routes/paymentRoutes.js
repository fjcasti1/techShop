import express from 'express';
import expressAsyncHandler from 'express-async-handler';
// import { isAuth } from '../middleware/authMiddleware.js';
import { isAuth } from '../middleware/authMiddleware.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

// Access to env variables
dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @route     POST api/payments/create-payment-intent
// @desc      Create payment intent for stripe
// @access    Private
router.post(
  '/create-payment-intent',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { amount, shippingAddress } = req.body;
    const {
      firstName,
      lastName,
      line1,
      line2,
      city,
      state,
      postalCode,
      country,
    } = shippingAddress;

    const address = {};
    if (line1) address.line1 = line1;
    if (line2) address.line2 = line2;
    if (city) address.city = city;
    if (state) address.state = state;
    if (postalCode) address.postal_code = postalCode;
    if (country) address.country = country;

    try {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        shipping: {
          name: shippingAddress.firstName + ' ' + shippingAddress.lastName,
          address,
        },
        // Verify your integration in this guide by including this parameter
        metadata: { integration_check: 'accept_a_payment' },
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      throw new Error(
        'Oops! This is embarrasing, something went wrong with the payment on our end. We are working to fix it.',
      );
    }
  }),
);

export default router;
