import { ErrorMessage, Field } from "formik";
import './Formik.css'
import React, { useContext } from "react";
import TextError from "../formError/TextError";
import { FormStateContext } from "../../../../contexts/FormStateContextProvider";


const FormikInput = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;

	const { formState } = useContext(FormStateContext);
	// console.log(`formState`, formState);

	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
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
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={TextError}></ErrorMessage>
		</div>
	);
};

export default FormikInput;
