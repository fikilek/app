import React, { useState } from "react";
import { useEffect } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { timestamp } from "../../firebaseConfig/fbConfig";
import useAuthContext from "../../hooks/useAuthContext";
import { useAuthenticateUser } from "../../hooks/useAuthenticateUser";
import { useFirestore } from "../../hooks/useFirestore";
import useModal from "../../hooks/useModal";
import FormError from "../../components/forms/formComponents/formError/FormError";
import SubmitBtn from "../forms/formComponents/submitBtn/SubmitBtn";

const UserSignatureForm = ({ formData }) => {
	const { user } = useAuthContext();
	const [password, setPassword] = useState(null);
	const { poData, signatureName } = formData;
	const [po, setPo] = useState(poData);
	const { response, updateDocument } = useFirestore("pos");
	const { closeModal } = useModal();
	// console.log(`UserSignatureForm password:`, password);

	const {
		user: signature,
		authenticateUser,
		error,
		isPending,
		success,
	} = useAuthenticateUser();

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
			setPassword(prev => (prev = null));
		} else {
			// console.log(`there is no password`, confirmedReceiver);
		}
	};

	// confirm witness using useAuthenticateUser
	const unsubsrcibe = useEffect(() => {
		if (success) {
			console.log(`SUCCESS: auttentication succeeded`, signature.uid);
			if (signatureName === "poApprove") {
				// console.log(`update po using setPo on : `, signatureName);
				setPo(prev => {
					return {
						...prev,
						metaData: {
							...prev.metaData,
							updatedAtDatetime: timestamp.fromDate(new Date()),
							updatedByUser: user.displayName,
						},
						poApprove: {
							...prev.poApprove,
							approveDate: timestamp.fromDate(new Date()),
							approveUid: signature.uid,
						},
					};
				});
				// console.log(`updated po`, po);
			}

			if (signatureName === "receiver") {
				// console.log(`update po using setPo on : `, signatureName);
				setPo(prev => {
					return {
						...prev,
						metaData: {
							...prev.metaData,
							updatedAtDatetime: timestamp.fromDate(new Date()),
							updatedByUser: user.displayName,
						},
						poData: {
							...prev.poData,
							poGrv: {
								...prev.poData.poGrv,
								grvReceiver: {
									...prev.poData.poGrv.grvReceiver,
									grvReceiverUid: signature.uid,
									grvReceiverDate: timestamp.fromDate(new Date()),
								},
							},
						},
					};
				});
				// console.log(`updated po`, po);
			}

			if (signatureName === "witness") {
				// console.log(`update po using setPo on : `, signatureName);
				setPo(prev => {
					return {
						...prev,
						metaData: {
							...prev.metaData,
							updatedAtDatetime: timestamp.fromDate(new Date()),
							updatedByUser: user.displayName,
						},
						poData: {
							...prev.poData,
							poGrv: {
								...prev.poData.poGrv,
								grvWitness: {
									...prev.poData.poGrv.grvWitness,
									grvWitnessUid: signature.uid,
									grvWitnessDate: timestamp.fromDate(new Date()),
								},
							},
						},
					};
				});
				// console.log(`updated po`, po);
			}
		}
		if (error) {
			console.log(`ERROR: Authentication failed`, error);
		}
		if (isPending) {
			console.log(`PENDING: Authentication is pending`);
		}

		// return () => {
		// 	// console.log(`password reset [unsubsribe]`, unsubsrcibe);
		// 	setPassword(null);
		// 	// unsubrscibe()
		// };
	}, [success, error, isPending]);

	// update firestore if po changes
	useEffect(() => {
		// update po in firestore using useFirestore hook ONLY if there is an id
		// console.log(`success`, success);
		const id = po.id;
		if (id && success) {
			updateDocument(po);
			// setPassword(prev => (prev = null));
		}
		// else {
		// 	console.log(`DID NOT UPDATE FIRESTORE with po: `, po);
		// }
	}, [
		po.poApprove.approveUid,
		po.poData.poGrv.grvReceiver.grvReceiverUid,
		po.poData.poGrv.grvWitness.grvWitnessUid,
	]);

	useEffect(() => {
		// console.log(`po updated succesfully with uid:`, po);
		// console.log(`response`, response);
		// console.log(`success`, success);
		if (success && response.success) {
			setPassword(null);
			closeModal();
		}
		return () => {
			// console.log(`clear password`);
			// setPassword(null);
			setPassword(prev => (prev = null));
		};
	}, [response.success]);

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
					{/* <button className="submit">Sign</button> */}
					<SubmitBtn isPending={response.isPending} />
				</div>
			</form>
		</div>
	);
};

export default UserSignatureForm;
