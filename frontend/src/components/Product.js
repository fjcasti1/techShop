import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import PropTypes from 'prop-types';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <Rating stars={product.rating} numReviews={product.numReviews} />
        </Card.Text>
        <Card.Text className='product-price' as='h3'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
