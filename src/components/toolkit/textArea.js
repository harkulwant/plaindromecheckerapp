// textarea.js

import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => {
  
  // spread (...) attributes should only contain valid attributes for an input box
  const { 
    placeholder,
    error,
    ...attributes
  } = props;

  return(
    <div className="form-group">
      <textarea {...attributes} required="required" rows="3" />
      <label className="control-label" htmlFor="textarea">{placeholder}</label>
      <i className="bar" />
      {error && <div className="has-error">{error}</div>}
    </div>
  );
};

TextArea.propTypes={
  placeholder: PropTypes.string,
  error: PropTypes.string
};

export default TextArea; 