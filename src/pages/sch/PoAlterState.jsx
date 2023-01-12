import React, { useContext, useEffect } from "react";
import "./PoAlterState.css";
import { MdCheck, MdClose } from "react-icons/md";
import { ModalContext } from "../../contexts/ModalContext";
import ClipLoader from "react-spinners/ClipLoader";

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { useFirestore } from "../../hooks/useFirestore";
import useAuthContext from "../../hooks/useAuthContext";
import { timestamp } from "../../firebaseConfig/fbConfig";
import useModal from "../../hooks/useModal";
import { useState } from "react";

const PoAlterState = ({ formData }) => {
	// console.log(`formData`, formData);
	const { poData } = formData;
	// console.log(`poData`, poData)
	const { updateDocument, response } = useFirestore("pos");
	// console.log(`response.isPending`, response.isPending);
	const { user } = useAuthContext();
	const { closeModal } = useModal();

	const { setModalOpened, setComponentToOpen } = useContext(ModalContext);
	const [color, setColor] = useState("red");

	const handleCancel = e => {
		// dont close the window but remove or close modal
		setModalOpened(false); //Close modal
	};

	useEffect(() => {
		if (response.success) {
			setModalOpened(false); //Close modal
		}
	}, [response]);

	const handleUpdatePoSatus = e => {
		// TODO: Implement logic to validate approval as outlined below:
		// 1. there must be a supplier against the po
		// 2. there are correct items and quantities

		// toggle poSatus
		const updatedStatus = poData.poStatus === "Created" ? "Approved" : "Created";
		// console.log(`updatedStatus`, updatedStatus);

		const newPo = {
			...poData,
			poStatus: updatedStatus,
			metaData: {
				...poData.metaData,
				updatedAtDatetime: timestamp.fromDate(new Date()),
				updatedByUser: user.displayName,
			},
		};
		// console.log(`newPo`, newPo)
		// remove the po id
		const id = newPo.id;
		delete newPo.id;
		// update po in firesotore
		// console.log(`About to update formData:`, newPo);
		updateDocument(newPo, id);
	};

	return (
		// po state alter (po-as) jsx
		<div className="po-as-container">
			<div className="po-as">
				<div className="po-as-header">
					<p>Purchase Order Authorisation</p>
					<div className="po-as-header-po-no">
						<p>{`Po-${poData.poNo}`}</p>
						<button onClick={() => closeModal()}>X</button>
					</div>
				</div>
				<div className="po-as-btns">
					<div className="po-as-cancel">
						<div className="cancel">
							Close the modal and leave things as they are.
						</div>
						<Tooltip
							// options
							title="Close without any action"
							position="bottom"
							// trigger="click"
						>
							<button
								className={`cancel-btn ${
									response.isPending ? "cancel-btn-on-is-pending" : ""
								} `}
								onClick={handleCancel}
								disabled={response.isPending}
							>
								<MdClose />
							</button>
						</Tooltip>
					</div>

					<div className="po-as-toggle">
						<div className="instruction">
							{poData.poStatus === "Created" ? (
								<>
									<p>You are about to approve a Purchase Order</p>
									<p>
										<strong>WARNING</strong> Only approve if there is suppier information
										and accurate quantities
									</p>
								</>
							) : (
								"Click to reverse aproval"
							)}
						</div>
						<Tooltip
							// options
							title={
								poData.poStatus === "Created"
									? "Click to Approve"
									: "Click to reverse aproval"
							}
							position="bottom"
							// trigger="click"
						>
							{response.isPending ? (
								<button disabled className="proceed-btn" onClick={handleUpdatePoSatus}>
									<ClipLoader
										color={color}
										loading={response.isPending}
										size={20}
										aria-label="Loading Spinner"
										data-testid="loader"
									/>
								</button>
							) : (
								<button className="proceed-btn" onClick={handleUpdatePoSatus}>
									<MdCheck />
								</button>
							)}
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PoAlterState;

// TODO: when the user clicks "ok" or the "tick" to proceed with the sign out, the page flickrs. Fix that at some stage.
