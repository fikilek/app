import React, { useContext, useEffect } from "react";
// import "../po.css";
import { MdCheck, MdClose } from "react-icons/md";
import { ModalContext } from "../../contexts/ModalContext";

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { useFirestore } from "../../hooks/useFirestore";
import useAuthContext from "../../hooks/useAuthContext";
import { timestamp } from "../../firebaseConfig/fbConfig";

const PoAlterState = ({ formData }) => {
	// console.log(`formData`, formData);
	const { poData } = formData
	console.log(`poData`, poData)
	const { updateDocument, response } = useFirestore("pos");
	const { user } = useAuthContext();

	const { setModalOpened, setComponentToOpen } = useContext(ModalContext);

	const handleCancel = e => {
		// dont close the window but remove or close modal
		setModalOpened(false); //Close modal
	};

	useEffect(() => {
		if (response.success) {
			setModalOpened(false); //Close modal
		}
	}, [response])
	

	const handleUpdatePoSatus = e => {
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
		// po state alter (posa) jsx
		<div className="po-sa-container">
			<div className="po-sa">
				<h3>Po Autorisation</h3>
				<div className="po-sa-btns">
					<Tooltip
						// options
						title="Cancel the operation"
						position="bottom"
						// trigger="click"
					>
						<button className="close-btn" onClick={handleCancel}>
							<MdClose />
						</button>
					</Tooltip>

					<Tooltip
						// options
						title="Toggle Purchase Order state"
						position="bottom"
						// trigger="click"
					>
						<button className="close-btn" onClick={handleUpdatePoSatus}>
							<MdCheck />
						</button>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default PoAlterState;

// TODO: when the user clicks "ok" or the "tick" to proceed with the sign out, the page flickrs. Fix that at some stage.
