import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';
import PropTypes from 'prop-types';

const ProductScreen = ({ match }) => {
  const product = products.find((product) => product._id === match.params.id);
  const {
    name,
    image,
    rating,
    numReviews,
    price,
    description,
    countInStock,
  } = product;
  return (
    <Fragment>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={image} alt={name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating stars={rating} numReviews={numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${price}</ListGroup.Item>
            <ListGroup.Item>Description: ${description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

ProductScreen.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProductScreen;
