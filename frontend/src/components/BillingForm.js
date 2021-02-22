import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import {
  getBillingDetails,
  saveBillingAddress,
  savePaymentMethod,
} from '../actions/cartActions';
import { Button, Row, Col, Accordion, Form } from 'react-bootstrap';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import BillingPreview from './BillingPreview';

const cardStyle = {
  hidePostalCode: true,
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Roboto, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#687075',
      },
    },
    invalid: {
      color: '#d9534f',
      iconColor: '#d9534f',
    },
  },
};

const BillingForm = () => {
  const dispatch = useDispatch();

  const { shippingAddress, billingAddress, paymentDetails } = useSelector(
    (state) => state.cart,
  );

  const savedBillingAddress =
    billingAddress.firstName &&
    billingAddress.lastName &&
    billingAddress.line1 &&
    billingAddress.city &&
    billingAddress.state &&
    billingAddress.postalCode;

  const [firstName, setFirstName] = useState(billingAddress.firstName || '');
  const [lastName, setLastName] = useState(billingAddress.lastName || '');
  const [line1, setLine1] = useState(billingAddress.line1 || '');
  const [line2, setLine2] = useState(billingAddress.line2 || '');
  const [city, setCity] = useState(billingAddress.city || '');
  const [state, setState] = useState(billingAddress.state || '');
  const [postalCode, setPostalCode] = useState(billingAddress.postalCode || '');

  const formCompleted = firstName && lastName && line1 && city && state && postalCode;

  const [formHidden, setFormHidden] = useState(false);
  const [billingIsShipping, setBillingIsShipping] = useState(false);

  // -- Stripe
  const [cardCompleted, setCardCompleted] = useState(false);
  const [cardBrand, setCardBrand] = useState('');
  const [cardLast4, setCardLast4] = useState('');
  const [cardExpMonth, setCardExpMonth] = useState('');
  const [cardExpYear, setCardExpYear] = useState('');
  const [cardError, setCardError] = useState(false);
  const [processingBilling, setProcessingBilling] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmitBilling = async () => {
    setProcessingBilling(true);
    const formData = {
      firstName,
      lastName,
      line1,
      line2,
      city,
      state,
      postalCode,
    };
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: getBillingDetails(
          billingIsShipping ? shippingAddress : formData,
        ),
      });
      dispatch(savePaymentMethod(paymentMethod));
    } catch (error) {
      console.error('error', error);
    }
    if (billingIsShipping) {
      dispatch(saveBillingAddress(shippingAddress));
    } else if (formCompleted) {
      dispatch(saveBillingAddress(formData));
    }
    setFormHidden(true);
  };

  const handleCardChange = async (ev) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setCardCompleted(ev.complete);
    setCardError(ev.error ? ev.error.message : '');
  };

  useEffect(() => {
    if (paymentDetails && paymentDetails.paymentMethod) {
      setCardLast4(paymentDetails.paymentMethod.card.last4);
      setCardBrand(paymentDetails.paymentMethod.card.brand);
      setCardExpMonth(paymentDetails.paymentMethod.card.exp_month);
      setCardExpYear(paymentDetails.paymentMethod.card.exp_year);
      setProcessingBilling(false);
    }
  }, [paymentDetails]);

  return (
    <Accordion defaultActiveKey='0'>
      <Row className='justify-content-between'>
        <h3>Payment Details</h3>
        <Accordion.Toggle
          as={Link}
          eventKey='0'
          onClick={() => {
            setFormHidden(false);
            setProcessingBilling(false);
          }}
          hidden={!formHidden}
          to='/checkout'
        >
          Change
        </Accordion.Toggle>
      </Row>
      {savedBillingAddress && cardBrand && cardLast4 && cardExpYear && cardExpMonth && (
        <BillingPreview
          paymentInfo={{ cardBrand, cardLast4, cardExpMonth, cardExpYear }}
        />
      )}
      <Accordion.Collapse eventKey='0'>
        <Fragment>
          <h4>Billing Address</h4>
          <Form>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Check
                    custom
                    type='checkbox'
                    id='billingCheckBox'
                    label='Same as shipping address'
                    checked={billingIsShipping}
                    onChange={() => setBillingIsShipping(!billingIsShipping)}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <div className={billingIsShipping ? 'hide' : ''}>
              <Form.Row>
                <Col>
                  <Form.Group controlId='billingFirstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter first name'
                      value={firstName}
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='billingLastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter last name'
                      value={lastName}
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId='billingLine1'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Street address or P.O. Box'
                      value={line1}
                      required
                      onChange={(e) => setLine1(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='billingLine2'>
                    <Form.Control
                      type='text'
                      placeholder='Apt, suite, unit, building, floor, etc.'
                      value={line2}
                      required
                      onChange={(e) => setLine2(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId='billingCity'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter city'
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='billingState'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter state'
                      value={state}
                      required
                      onChange={(e) => setState(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='billingPostalCode'>
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter ZIP code'
                      value={postalCode}
                      required
                      onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </div>
          </Form>
          <h4>Payment Method</h4>
          <CardElement
            id='card-element'
            options={cardStyle}
            onChange={handleCardChange}
            className='p-3 mb-2 border border-primary rounded'
          />
          {/* Show any error that happens when processing the payment */}
          {cardError && (
            <Message dismissible variant='danger'>
              {cardError}
            </Message>
          )}
        </Fragment>
      </Accordion.Collapse>
      <Accordion.Toggle
        as={Button}
        variant='primary'
        block
        eventKey='0'
        onClick={handleSubmitBilling}
        disabled={
          (!billingIsShipping && !formCompleted) || !cardCompleted || processingBilling
        }
        hidden={formHidden}
      >
        <span id='button-text'>
          {processingBilling ? (
            <div className='spinner-payment' id='spinner'></div>
          ) : (
            'Save payment details'
          )}
        </span>
      </Accordion.Toggle>
    </Accordion>
  );
};

export default BillingForm;
