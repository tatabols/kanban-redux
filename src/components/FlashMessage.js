import React from 'react';

const FlashMessage = props => {
  return <div className="flash-error">{props.message}</div>;
};

export default FlashMessage;

Error.defaultProps = {
  message: 'An error occured'
};
