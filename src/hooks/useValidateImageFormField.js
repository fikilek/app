import { useState } from "react";

const useValidateFileFormField = () => {
	const [errorMsg, setErrorMsg] = useState(null);
	const [validationError, setValidationError] = useState(false);

	const validateFileFormField = file => {
		setValidationError(false);
		if (!file) {
			setValidationError(true);
			setErrorMsg("please select a file");
		}
		if (!file.type.includes("image")) {
			setValidationError(true);
			setErrorMsg("selected file must be an image");
		}
		if (file.size > 100000) {
			setValidationError(true);
			setErrorMsg("selected file must less than 100kb");
		}
		return {
			errorMsg,
			validationError,
		};
	};

	return {
		validateFileFormField,
	};
};

export default useValidateFileFormField;
