import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { MdPassword } from "react-icons/md";
import SubmitBtn from "../../components/forms/formComponents/submitBtn/SubmitBtn";
import useStorage from "../../hooks/useStorage";
import "./PoInvPopForm.css";

const newInvFormData = {
	popNo: "",
	popAmount: "",
	popImage: "",
};

const PoInvPopForm = ({ po, index, showHidePopForm, setShowHidePopForm }) => {
	// console.log(`po`, po);
	// console.log(`type`, type);
	// console.log(`index`, index);
	// console.log(`showHideInvPopForm`, showHideInvPopForm);
	const formData = false ? po.poData.poPop[index] : newInvFormData;
	const [data, setData] = useState(formData);
	const [imageError, setImageError] = useState("");
	const { addFile, progress, error, url } = useStorage();
	const [isPending, setIsPending] = useState(null)

	const handleSubmit = async  e => {
		e.preventDefault();
		console.log(`payment data`, {
			...data,
			popId: nanoid(),
		});
		// prepare path to store the image
		const popImagePath = `pos/${po.id}/pop/${data.popImage.name}`;
		// write image into forebase storage
		setIsPending(true)
		await addFile(popImagePath, data.popImage);
	};

	useEffect(() => {
		console.log(`progress`, progress);
		console.log(`error`, error);
		console.log(`url`, url);
		if (url) {
			setIsPending(false)
		}
	}, [progress, error, url]);

	const handlePopImageFile = e => {
		setData({
			...data,
			[e.target.name]: null,
		});

		let selectedFile = e.target.files[0];
		if (!selectedFile) {
			setImageError("please select a file");
			return;
		}
		if (!selectedFile.type.includes("image")) {
			setImageError("selected file must be an image");
			return;
		}
		if (selectedFile.size > 100000) {
			setImageError("selected file must less than 100kb");
			return;
		}
		setImageError(null);
		console.log(`file`, selectedFile);
		setData({
			...data,
			[e.target.name]: selectedFile,
		});
	};

	return (
		// poipf
		<div className={`poipf-container`}>
			<div className={`${showHidePopForm} `}>
				<div className="poipf-header">
					<p>Po-2</p>
					<p>Inv / Pop Form</p>
					<button onClick={() => setShowHidePopForm("poipf-hide")}>x</button>
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
								name={`popNo`}
								id={`popNo`}
								placeholder={`payment number`}
								value={data.popNo}
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
								name={`popAmount`}
								id={`popAmount`}
								placeholder={`pop amount`}
								value={data.popAmount}
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
								name={`popImage`}
								id={`popImage`}
								placeholder={`pop image`}
								onChange={handlePopImageFile}
							/>
						</div>
						{imageError && <div className="error">{imageError}</div>}
						<SubmitBtn isPending={isPending} />
					</form>
				</div>
			</div>
		</div>
	);
};

export default PoInvPopForm;
