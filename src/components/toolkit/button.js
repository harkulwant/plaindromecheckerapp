// button.js

import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  
  // spread (...) attributes should only contain valid attributes for an input box
  const { 
    text,
    ...attributes
  } = props;

  return(
   <div className="button-container">
    <button className="button" type="button" {...attributes} ><span>{text}</span></button>
  </div>
  );
};

Button.propTypes={
  text: PropTypes.string
};

export default Button; 