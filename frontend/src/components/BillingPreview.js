import React, { Fragment } from 'react';
import Moment from 'react-moment';

const BillingPreview = ({ paymentInfo }) => {
  const { cardBrand, cardLast4, cardExpMonth, cardExpYear } = paymentInfo;

  return (
    <div>
      <p>
        {cardBrand.charAt(0).toUpperCase() + cardBrand.slice(1)} ****{cardLast4}
        <br />
        {cardExpMonth && cardExpYear && (
          <Fragment>
            Exp:{' '}
            <Moment
              element='span'
              format='MM/YYYY'
              date={
                cardExpMonth < 10
                  ? `${cardExpYear}-0${cardExpMonth}`
                  : `${cardExpYear}-${cardExpMonth}`
              }
            />
          </Fragment>
        )}
      </p>
    </div>
  );
};

export default BillingPreview;
