import React from "react";
import "./UserSignatureBtn.css";
import useModal from "../../hooks/useModal";
import { useGetUser } from "../../hooks/useGetUser";

const signatureToUse = (user,sgName) => {
	switch (sgName) {
		case "poApprove": return  user ? "Approved" : "Not Approved";
		case "receiver": return user ? "Received" : "Not Received";
		case "witness": return user ? "Witnessed" : "Not Witnessed";
		default:
			return null
		// TODO: do a code review. This should throw an error.
	}
}

const UserSignatureBtn = params => {
	// console.log(`params`, params);
	const { openModal } = useModal();

	const {user} = useGetUser({ po: params.data, signatureName: params.signatureName });
	// console.log(`user`, user);

	const handleClick = e => {
		// console.log(`signature btn clicked`)
		e.preventDefault();
		openModal({
			modalName: "userSignature",
			payload: {
				poData: params.data,
				user: user,
				signatureName: params.signatureName,
			},
		});
	};

	return (
		<button onClick={handleClick} className={`btn-table-row user-signature-btn`}>
			{signatureToUse(user, params.signatureName)}
		</button>
	);
};

export default UserSignatureBtn;
