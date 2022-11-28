import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { getGrvStatus } from "../../utils/utils";

const PoViewGrv = params => {
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	// console.log(`params`, params);

	const poInvStatus = params.data.poData.poInv.length > 0 ? true : false;
	const poPopStatus = params.data.poData.poInv.length > 0 ? true : false;
	const grvcrStatus = params.data.poData.poGrv.grvConfirmReceipt.grvcrStatus;
	const grvwrStatus = params.data.poData.poGrv.grvWitnessReceipt.grvwrStatus;

	const grvStatus = getGrvStatus(
		poInvStatus,
		poPopStatus,
		grvcrStatus,
		grvwrStatus
	);

	// TODO: Dont open the grv form when the status is "No Grv". Open omly when its "Created", "Received" and "Witnessed".

	const handleViewGrv = e => {
		e.preventDefault();
		// Open a modal with a grv form
		setComponentToOpen({
			...componentToOpen,
			name: "grvForm",
			payload: params.data,
		});
		setModalOpened(true);
	};

	return (
		<button onClick={handleViewGrv} className="btn-table-row btn-view-grv">
			{grvStatus}
		</button>
	);
};

export default PoViewGrv;
