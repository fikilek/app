import React from "react";
import "./FormHeader.css";
import { MdClose } from "react-icons/md";

const FormHeader4 = props => {
	const { formName, closeModal, formNo } = props;
	return (
		<div className="form-header">
			<div className="header-line1">
				<p>{formName} Form</p>
				<p>{formNo? `${formName} No: ${formNo}` : ('No Erf Number')}</p>
			</div>
			<button onClick={() => closeModal()}>
				<MdClose />
			</button>
		</div>
	);
};

export default FormHeader4;
