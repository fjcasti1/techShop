import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import { Button, Row, Col, Accordion, Form } from 'react-bootstrap';
import ShippingPreview from './ShippingPreview';

const ShippingForm = () => {
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);
  const savedShippingAddress =
    shippingAddress.firstName &&
    shippingAddress.lastName &&
    shippingAddress.line1 &&
    shippingAddress.city &&
    shippingAddress.state &&
    shippingAddress.postalCode;

  const [firstName, setFirstName] = useState(shippingAddress.firstName || '');
  const [lastName, setLastName] = useState(shippingAddress.lastName || '');
  const [line1, setLine1] = useState(shippingAddress.line1 || '');
  const [line2, setLine2] = useState(shippingAddress.line2 || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [state, setState] = useState(shippingAddress.state || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');

  const formCompleted = firstName && lastName && line1 && city && state && postalCode;

  const [formHidden, setFormHidden] = useState(false);

  const submitShippingHandler = (e) => {
    if (formCompleted) {
      dispatch(
        saveShippingAddress({
          firstName,
          lastName,
          line1,
          line2,
          city,
          state,
          postalCode,
          country: 'US',
        }),
      );
      setFormHidden(true);
    }
  };

  return (
    <Accordion defaultActiveKey='0'>
      <Row className='justify-content-between'>
        <h3>Shipping Address</h3>
        <Accordion.Toggle
          as={Link}
          eventKey='0'
          onClick={() => setFormHidden(false)}
          hidden={!formHidden}
          to='/checkout'
        >
          Change
        </Accordion.Toggle>
      </Row>
      {savedShippingAddress && <ShippingPreview shippingAddress={shippingAddress} />}
      <Accordion.Collapse eventKey='0'>
        <Form>
          <Form.Row>
            <Col>
              <Form.Group controlId='firstName'>
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
              <Form.Group controlId='lastName'>
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
              <Form.Group controlId='line1'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Street address or P.O. Box'
                  value={line1}
                  required
                  onChange={(e) => setLine1(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='line2'>
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
              <Form.Group controlId='city'>
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
              <Form.Group controlId='state'>
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
              <Form.Group controlId='postalCode'>
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
        </Form>
      </Accordion.Collapse>
      <Accordion.Toggle
        as={Button}
        variant='primary'
        block
        eventKey='0'
        onClick={submitShippingHandler}
        disabled={!formCompleted}
        hidden={formHidden}
      >
        Save shipping address
      </Accordion.Toggle>
    </Accordion>
  );
};

export default ShippingForm;
