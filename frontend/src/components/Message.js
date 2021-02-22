import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, dismissible, children }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant={variant}
        className='rounded'
        onClose={() => setShow(false)}
        dismissible={dismissible}
      >
        {children}
      </Alert>
    );
  } else {
    return <div></div>;
  }
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
