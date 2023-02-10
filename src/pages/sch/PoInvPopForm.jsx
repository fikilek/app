import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { MdPassword } from "react-icons/md";
import SubmitBtn from "../../components/forms/formComponents/submitBtn/SubmitBtn";
import useStorage from "../../hooks/useStorage";
import "./PoInvPopForm.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebaseConfig/fbConfig";
import useModal from "../../hooks/useModal";

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
	const [fileDataURL, setFileDataURL] = useState(null);
	const [formError, setFormError] = useState("");
	const { addFile, progress, error, url } = useStorage();
	const [isPending, setIsPending] = useState(null);
	const { closeModal, openModal } = useModal();
	const [invPopImagePath, setInvPopImagePath] = useState('')

	const handleSubmit = async e => {
		e.preventDefault();
		// console.log(`data`, data);
		// prepare path to store the image if data is valid
		if (!data.no || !data.amount || !data.image) {
			setFormError("all fields must be completed");
		} else {
			const invPopImagePath = `pos/${po.id}/${type}/${data.image.name}`;
			setInvPopImagePath(invPopImagePath);
			// write image into firebase storage
			setIsPending(true);
			addFile(invPopImagePath, data.image);
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
				transactionType: 'add',
				schData: {
					id: nanoid(),
					no: data.no,
					amount: data.amount,
					url,
					invPopImagePath,
				},
			};
			// console.log(`update po.poInv / poPop`, poInvPopData);

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
			setInvPopImagePath('');
			closeModal();
		}
	}, [progress, error, url]);

	const handleImageFile = e => {
		setFormError("");
		setData({
			...data,
			[e.target.name]: null,
		});

		let selectedFile = e.target.files[0];

		// const { validationError, errorMsg } = validateFileFormField(selectedFile);

		if (!selectedFile) {
			setFormError("please select a file");
			console.log("please select a file");
			return;
		}
		if (!selectedFile.type.includes("image")) {
			setFormError("selected file must be an image");
			console.log("selected file must be an image");
			return;
		}
		if (Number(selectedFile.size) > 200000) {
			setFormError("selected file must less than 200kb");
			console.log("selected file must less than 200kb");
			return;
		}

		// No Error in the file form field
		setData({
			...data,
			[e.target.name]: selectedFile,
		});
	};

	useEffect(() => {
		let fileReader,
			isCancel = false;
		if (data.image) {
			fileReader = new FileReader();
			fileReader.onload = e => {
				const { result } = e.target;
				if (result && !isCancel) {
					setFileDataURL(result);
				}
			};
			fileReader.readAsDataURL(data.image);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [data.image]);

	const handleCloseForm = e => {
		setShowHideInvPopForm("poipf-hide");
		setData(newInvFormData);
		setFileDataURL(null);
		setFormError(null);
		setIsPending(null);
	};

	return (
		// poipf
		<div className={`poipf-container`}>
			<div className={`${showHideInvPopForm} `}>
				<div className="poipf-header">
					<p>Po-2</p>
					<p>{type} Form</p>
					<button onClick={handleCloseForm}>x</button>
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
					{fileDataURL ? (
						<div className="img-preview-wrapper">
							{<img src={fileDataURL} alt="preview" />}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default PoInvPopForm;
