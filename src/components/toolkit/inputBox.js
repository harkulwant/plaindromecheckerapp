// inputBox.js

import React from 'react';
import PropTypes from 'prop-types';

const InputBox = (props) => {
	
	// spread (...) attributes should only contain valid attributes for an input box
	const { 
		placeholder,
		error,
		...attributes
	} = props;

	return(
		<div className="form-group">
			<input {...attributes} required="required" />
			<label className="control-label" htmlFor="input">{placeholder}</label>
			<i className="bar" />
			{error && <div className="has-error">{error}</div>}
		</div>
	);
};

InputBox.propTypes={
	placeholder: PropTypes.string,
	error: PropTypes.string
};

export default InputBox; 