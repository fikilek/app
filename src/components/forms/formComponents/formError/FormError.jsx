import React from "react";

// fe: form error. This is the error that happend during form submission

const FormError = ({ error }) => {
	return (
		<div className="fe">
			<p>{error}</p>
		</div>
	);
};

export default FormError;
