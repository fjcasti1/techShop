import React from 'react';

const ShippingPreview = ({ shippingAddress }) => {
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
  return (
    <div>
      <p>
        {firstName} {lastName}
        <br />
        {line1}, {line2}
        <br />
        {city}, {state}, {postalCode}, {country}
      </p>
    </div>
  );
};

export default ShippingPreview;
