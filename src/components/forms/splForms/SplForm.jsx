import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdLockClock, MdPerson } from "react-icons/md";
import { timestamp } from "../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../hooks/useAuthContext";
import FormBtn from "../formComponents/formBtn/FormBtn";
import "./SplForm.css";
import { object, string } from "yup";
import TextError from "../formComponents/formError/TextError";
import FormikControl from "../formComponents/formik/FormikControl";
import FormHeader1 from "../formComponents/formHeaders/FormHeader1";
import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = object({
	splName: string().required("required"),
	splAddress: string().required("required"),
	splContactEmailAdr: string().required("required").email("wrong email adr"),
	splContactSurname: string().required("required"),
	splContactName: string().required("required"),
	splContactNo: string().required("required"),
});

const SplForm = ({ formData }) => {
	// console.log(`formData`, formData);

	const { addDocument, response, updateDocument } = useFirestore("suppliers");
	const {closeModal} = useModal()

	const { user } = useAuthContext();
	// console.log(`user`, user)

	const [spl, setSpl] = useState({
		...formData,
		metaData: {
			...formData.metaData,
			updatedAtDatetime: timestamp.fromDate(new Date()),
			updatedByUser: user.displayName,
		},
	});

	const onSubmit = values => {
		console.log(`values`, values);
		addDocument(values);
	};
	// console.log(`spl`, spl);

	useEffect(() => {
		if (response.success) {
			closeModal()
			toast(`New Suppiler created succeesfully!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}, [response]);

	return (
		<div className="form-wrapper">
			<div className="form-container spl-form-container">
				<FormHeader1 formName="Supplier Form" closeModal={closeModal} />
				<Formik
					initialValues={spl}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						console.log(`formik`, formik)
						return (
							<Form>
								<FormikControl
									control="input"
									type="text"
									label="supplier name"
									name="splName"
									placeholder="supplier name"
								/>
								<FormikControl
									control="input"
									type="text"
									label="address"
									name="splAddress"
									placeholder="supplier address"
								/>
								{/* updated */}
								<div className="updated">
									<FormikControl
										control="input"
										type="text"
										label="updated by user"
										name="metaData.updatedByUser"
										readOnly="readOnly"
										placeholder="updated by user"
									/>

									<FormikControl
										control="datetime"
										label="updated at datetime"
										name="metaData.updatedAtDatetime"
										readOnly="readOnly"
										dateFormat="yyyy MM dd - HH:mm:ss"
										placeholder="updated at datetime"
									/>
								</div>
								{/* create */}
								<div className="created">
									<FormikControl
										control="input"
										type="text"
										label="created by user"
										name="metaData.createdByUser"
										readOnly="readOnly"
										placeholder="created by user"
									/>

									<FormikControl
										control="datetime"
										label="updated at datetime"
										name="metaData.createdAtDatetime"
										readOnly="readOnly"
										dateFormat="yyyy MM dd - HH:mm:ss"
										placeholder="dated at datetime"
									/>
								</div>
								{/* splContactEmailAdr */}
								<FormikControl
									control="input"
									type="text"
									label="contact email adr"
									name="splContactEmailAdr"
									placeholder="contact email adr"
								/>
								{/* splContactSurname */}

								<FormikControl
									control="input"
									type="text"
									label="contact surname"
									name="splContactSurname"
									placeholder="supplier contact surname"
								/>
								{/* splContactName */}
								<FormikControl
									control="input"
									type="text"
									label="contact name"
									name="splContactName"
									placeholder="supplier contact name"
								/>
								{/* splContactNo */}
								<FormikControl
									control="input"
									type="text"
									label="contact number"
									name="splContactNo"
									placeholder="supplier contact number"
								/>
								<div className="form-btns">
									<FormBtn isPending={false} btnName="reset" />
									<FormBtn
										isPending={formik.isSubmitting}
										btnName="submit"
										disabled={!formik.isValid}
									/>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default SplForm;
