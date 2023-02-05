import React, { useState } from "react";
import { useEffect } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import useAuthContext from "../../hooks/useAuthContext";
import { useAuthenticateUser } from "../../hooks/useAuthenticateUser";
import useModal from "../../hooks/useModal";
import FormError from "../../components/forms/formComponents/formError/FormError";
import SubmitBtn from "../forms/formComponents/submitBtn/SubmitBtn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPoAction } from "../../utils/utils";

const UserSignatureForm = ({ formData }) => {
	// console.log(`formData`, formData)
	const { user } = useAuthContext();
	const [password, setPassword] = useState(null);
	const { signatureName, poData } = formData;
	const { closeModal } = useModal();
	// console.log(`UserSignatureForm password:`, password);

	const {
		user: signature,
		authenticateUser,
		error,
		isPending,
		success,
	} = useAuthenticateUser(formData);

	useEffect(() => {
		setPassword(null);
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		// console.log(`signing a po`);
		// authenticate the user from firebase auth
		const confirmedReceiver = {
			email: user.email,
			password: password,
		};
		if (password) {
			// console.log(`witnessing PO`, confirmedReceiver);
			await authenticateUser(confirmedReceiver);
		}
	};

	// confirm witness using useAuthenticateUser
	useEffect(() => {
		if (success) {
			// console.log(`SUCCESS: auttentication succeeded`, signature.uid);
			// po actione
			let action = getPoAction(signatureName);

			// clear password
			setPassword(prev => (prev = null));
			// close modal
			closeModal();
			// open a success modal
			// console.log(`po ${signatureName} succeeded`);
			toast(`Purchase Order [ Po-${poData.poNo} ] ${action} succeesfully!`, {
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
		if (error) {
			console.log(`ERROR: Authentication failed`, error);
			// TODO: take care of auth error
		}
		if (isPending) {
			console.log(`PENDING: Authentication is pending`);
			// TODO: tale care of isPending
		}
	}, [success, error, isPending]);

	// console.log(`po`, po);

	return (
		<div className="sf">
			<div className="sf-info sf-header">
				<h2>
					{signatureName === "poApprove" ? "approval" : signatureName} signature
				</h2>
				<button onClick={() => closeModal()}>X</button>
			</div>
			<form className="sf-form" onClick={handleSubmit}>
				<div className="sf-form-field form-field form-field-email">
					<span className="form-field-icon">
						<MdEmail />
					</span>
					<input
						disabled
						type="email"
						name="email"
						id="email"
						value={user.email}
						placeholder="enter email adr"
					/>
				</div>
				<div className="sf-form-field form-field form-field-password">
					<span className="form-field-icon">
						<MdPassword />
					</span>
					<input
						autoFocus
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						value={password ? password : ""}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<FormError error={error} />
				<div className="sf-form-btns">
					<SubmitBtn isPending={isPending} />
				</div>
			</form>
		</div>
	);
};

export default UserSignatureForm;
