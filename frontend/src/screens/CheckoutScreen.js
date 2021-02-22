import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Message from '../components/Message';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import axios from 'axios';
import ShippingForm from '../components/ShippingForm';
import BillingForm from '../components/BillingForm';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import OrderSummary from '../components/OrderSummary';

const CheckoutScreen = ({ history }) => {
  const dispatch = useDispatch();

  const {
    cartItems,
    price,
    shippingAddress,
    billingAddress,
    paymentDetails,
  } = useSelector((state) => state.cart);

  const { order, success, error } = useSelector((state) => state.orderCreate);

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const savedShippingAddress =
    shippingAddress.firstName &&
    shippingAddress.lastName &&
    shippingAddress.line1 &&
    shippingAddress.city &&
    shippingAddress.state &&
    shippingAddress.postalCode;

  const savedBillingAddress =
    billingAddress.firstName &&
    billingAddress.lastName &&
    billingAddress.line1 &&
    billingAddress.city &&
    billingAddress.state &&
    billingAddress.postalCode;

  // == Component State ==
  // ==========================
  // -- Common
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  // -- Stripe
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  // == Stripe setup ==
  // ==================
  // Stripe Hooks
  const stripe = useStripe();
  const elements = useElements();
  // Load Stripe Payment Intent
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const {
          data: { clientSecret: stripeClientSecret },
        } = await axios.post(
          `/api/payments/create-payment-intent`,
          {
            amount: price.total * 100, // Stripe calculates amounts in the lowest denomination
            shippingAddress,
          },
          config,
        );
        setClientSecret(stripeClientSecret);
      } catch (error) {
        setPaymentError(error);
      }
    };
    if (savedShippingAddress) {
      fetchPaymentIntent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingAddress]);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);
  useEffect(() => {
    if (
      savedShippingAddress &&
      savedBillingAddress &&
      paymentDetails &&
      paymentDetails.paymentMethod
    ) {
      setDisabled(false);
    }
  }, [savedShippingAddress, savedBillingAddress, paymentDetails]);

  const placeOrderHandler = async (e) => {
    setProcessingPayment(true);

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        receipt_email: userInfo.email,
        payment_method: paymentDetails.paymentMethod.id,
      });
      if (payload.error) {
        setPaymentError(`Payment failed ${payload.error.message}`);
        setProcessingPayment(false);
      } else {
        setPaymentError(null);
        setProcessingPayment(false);
        setPaymentSucceeded(true);
        dispatch(
          createOrder({
            orderItems: cartItems,
            shippingAddress,
            billingAddress,
            payment: {
              type: 'card',
              cardBrand: paymentDetails.paymentMethod.card.brand,
              cardLast4: paymentDetails.paymentMethod.card.last4,
            },
            price,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <ShippingForm />
            </ListGroup.Item>

            <ListGroup.Item>
              <BillingForm />
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Review Order Items</h3>
              {cartItems.length > 0 ? (
                <ListGroup variant='flush'>
                  {cartItems.map((cartItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row className=''>
                        <Col xs={3} lg={2}>
                          <Link to={`/product/${cartItem.product}`}>
                            <Image src={cartItem.image} fluid rounded />
                          </Link>
                        </Col>
                        <Col xs={9} lg={10}>
                          <Link to={`/product/${cartItem.product}`}>{cartItem.name}</Link>
                          <p>
                            {cartItem.qty} x ${cartItem.price} = $
                            {cartItem.qty * cartItem.price}
                          </p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Message>Your cart is empty</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <OrderSummary price={price} />
              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type='button'
                  id='payButton'
                  block
                  onClick={placeOrderHandler}
                  disabled={processingPayment || disabled || paymentSucceeded}
                >
                  <span id='button-text'>
                    {processingPayment ? (
                      <div className='spinner-payment' id='spinner'></div>
                    ) : (
                      'Place Order'
                    )}
                  </span>
                </Button>
              </ListGroup.Item>
            </ListGroup>
            {/* Show any error that happens when processing the payment */}
            {paymentError && <Message variant='danger'>{paymentError}</Message>}
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CheckoutScreen;
