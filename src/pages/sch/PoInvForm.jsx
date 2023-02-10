import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { MdPassword } from "react-icons/md";
import SubmitBtn from "../../components/forms/formComponents/submitBtn/SubmitBtn";
import "./PoInvPopForm.css";

const newInvFormData = {
	invId: nanoid(),
	invNo: "",
	invAmount: "",
	invImage: null,
};

const PoInvPopForm = ({
	po,
	type,
	index,
	showHideInvForm,
	setShowHideInvForm,
}) => {
	// console.log(`po`, po);
	// console.log(`type`, type);
	// console.log(`index`, index);
	// console.log(`showHideInvPopForm`, showHideInvPopForm);
	const formData = false ? po.poData.poInv[index] : newInvFormData;
	const [data, setData] = useState(formData);
	const [imageError, setImageError] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		// validate image file
		console.log(`Invoice data`, {
			...data,
			invId: nanoid(),
		});
	};

	const handleInvImageFile = e => {
		setData({
			...data,
			[e.target.name]: null
		})

		let selectedFile = e.target.files[0];
		if (!selectedFile) {
			setImageError("please select a file");
			return;
		}
		if (!selectedFile.type.includes("image")) {
			setImageError("selected file must be an image");
			return;
		}
		if (selectedFile.size > 200000) {
			setImageError("selected file must less than 200kb");
			return;
		}
		setImageError(null);
		console.log(`file`, selectedFile);
		setData({
			...data,
			[e.target.name]: selectedFile,
		});
	};

	console.log(`data`, data)

	return (
		// poipf
		<div className={`poipf-container`}>
			<div className={`${showHideInvForm} `}>
				<div className="poipf-header">
					<p>Po-2</p>
					<p>Inv / Pop Form</p>
					<button onClick={() => setShowHideInvForm("poipf-hide")}>x</button>
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
								name={`invNo`}
								id={`invNo`}
								placeholder={`invoice number`}
								value={data.invNo}
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
								type="text"
								name={`invAmount`}
								id={`invAmount`}
								placeholder={`invoice amount`}
								value={data.invAmount}
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
								name={`invImage`}
								id={`invImage`}
								placeholder={`invoice image`}
								onChange={handleInvImageFile}
							/>
						</div>
						{imageError && <div className="error">{imageError}</div>}
						<SubmitBtn />
					</form>
				</div>
			</div>
		</div>
	);
};

export default PoInvPopForm;
