import { ErrorMessage, Field } from "formik";
import './Formik.css'
import React from "react";
import TextError from "../formError/TextError";


const FormikInput = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;
	return (
		<div className={`form-control ${name} `}>
			<Field name={name}>
				{props => {
					// console.log(`props`, props)
					const { field, meta, form } = props;
					return (
						<input
							{...field}
							{...rest}
							className={meta.error && meta.touched ? `inputError` : ""}
						/>
					);
				}}
			</Field>
			<label className="label" htmlFor={name}>{label}</label>
			<ErrorMessage name={name} component={TextError}></ErrorMessage>
		</div>
	);
};

export default FormikInput;
