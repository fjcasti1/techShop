import React, { Fragment } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';

const OrderSummary = ({ price }) => {
  return (
    <Fragment>
      <ListGroup.Item>
        <h3>Order Summary</h3>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Items</Col>
          <Col>$ {price.items}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Shipping</Col>
          <Col>$ {price.shipping}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Tax</Col>
          <Col>$ {price.tax}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Total</Col>
          <Col>$ {price.total}</Col>
        </Row>
      </ListGroup.Item>
    </Fragment>
  );
};

export default OrderSummary;
