import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ stars, color, numReviews }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            stars >= 1
              ? 'fas fa-star'
              : stars >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            stars >= 2
              ? 'fas fa-star'
              : stars >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            stars >= 3
              ? 'fas fa-star'
              : stars >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            stars >= 4
              ? 'fas fa-star'
              : stars >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            stars >= 5
              ? 'fas fa-star'
              : stars >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <br />
      <span>{numReviews && ` ${numReviews} reviews`}</span>
    </div>
  );
};

Rating.propTypes = {
  stars: PropTypes.number,
  numReviews: PropTypes.number,
  color: PropTypes.string,
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;
