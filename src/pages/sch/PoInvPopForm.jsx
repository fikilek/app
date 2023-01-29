import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { MdPassword } from "react-icons/md";
import SubmitBtn from "../../components/forms/formComponents/submitBtn/SubmitBtn";
import useStorage from "../../hooks/useStorage";
import "./PoInvPopForm.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useValidateFileFormField from "../../hooks/useValidateImageFormField";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebaseConfig/fbConfig";

const newInvFormData = {
	no: "",
	amount: "",
	image: "",
};

const PoInvPopForm = ({
	po,
	type,
	index,
	showHideInvPopForm,
	setShowHideInvPopForm,
}) => {
	// console.log(`po`, po);
	// console.log(`type`, type);
	// console.log(`index`, index);
	// console.log(`showHideInvPopForm`, showHideInvPopForm);
	const formData = false ? po.poData.poPop[index] : newInvFormData;
	const [data, setData] = useState(formData);
	const [formError, setFormError] = useState("");
	const { addFile, progress, error, url } = useStorage();
	const [isPending, setIsPending] = useState(null);
	const { validateFileFormField } = useValidateFileFormField();

	const handleSubmit = async e => {
		e.preventDefault();
		// console.log(`data`, data);
		// prepare path to store the image if data is valid
		if (!data.no || !data.amount || !data.image) {
			setFormError("all fields must be completed");
		} else {
			const popImagePath = `pos/${po.id}/${type}/${data.image.name}`;
			// write image into firebase storage
			setIsPending(true);
			addFile(popImagePath, data.image);
		}
	};

	useEffect(() => {
		// console.log(`progress`, progress);
		// console.log(`error`, error);
		// console.log(`url`, url);
		if (url) {
			// update po.poInv / poPop using cloud https call function
			const poInvPopData = {
				poId: po.id,
				type,
				schData: {
					id: nanoid(),
					no: data.no,
					amount: data.amount,
					url,
				},
			};
			console.log(`update po.poInv / poPop`, poInvPopData);

			const updatePoInvPop = httpsCallable(functions, "updatePoInvPop");
			updatePoInvPop(poInvPopData);

			toast(`${type} for Po-${po.poNo} succesfully cuptured!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});

			setIsPending(false);
			setShowHideInvPopForm("poipf-hide");
			setFormError("");
			setData(newInvFormData);
		}
	}, [progress, error, url]);

	const handleImageFile = e => {
		setData({
			...data,
			[e.target.name]: null,
		});

		let selectedFile = e.target.files[0];

		const { validationError, ErrorMsg } = validateFileFormField(selectedFile);

		if (validationError) {
			// Error in the file form field
			setFormError(ErrorMsg);
		} else {
			// No Error in the file form field
			setData({
				...data,
				[e.target.name]: selectedFile,
			});
		}
	};

	return (
		// poipf
		<div className={`poipf-container`}>
			<div className={`${showHideInvPopForm} `}>
				<div className="poipf-header">
					<p>Po-2</p>
					<p>{type} Form</p>
					<button onClick={() => setShowHideInvPopForm("poipf-hide")}>x</button>
				</div>
				<div className="poipf-body">
					<form onSubmit={handleSubmit} className="poip-form">
						<div className="form-field form-field-number">
							<span className="form-field-icon">
								<MdPassword />
							</span>
							<input
								autoFocus
								type="text"
								name={`no`}
								id={`no`}
								placeholder={`${type} number`}
								value={data.no}
								onChange={e =>
									setData({
										...data,
										[e.target.id]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-field form-field-amount">
							<span className="form-field-icon">
								<MdPassword />
							</span>
							<input
								type="number"
								name={`amount`}
								id={`amount`}
								placeholder={`${type} amount`}
								value={data.amount}
								onChange={e =>
									setData({
										...data,
										[e.target.id]: e.target.value,
									})
								}
							/>
						</div>{" "}
						<div className="form-field form-field-image">
							<span className="form-field-icon">
								<MdPassword />
							</span>
							<input
								type="file"
								name={`image`}
								id={`image`}
								placeholder={`${type} image`}
								onChange={handleImageFile}
							/>
						</div>
						{formError && <div className="error">{formError}</div>}
						<SubmitBtn isPending={isPending} />
					</form>
				</div>
			</div>
		</div>
	);
};

export default PoInvPopForm;
