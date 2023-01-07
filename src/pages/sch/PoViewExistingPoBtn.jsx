import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

const PoViewExistingPoBtn = params => {

	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	// console.log(`params`, params)

	const handleClick = e => {
		e.preventDefault()
		// modalOpened a modal window
		setComponentToOpen({
			...componentToOpen,
			name: "poForm",
			payload: params.data,
		});
		setModalOpened(true);
	};

	return (
		<button onClick={handleClick} className="btn-table-row btn-view-po">
			{params.data.poData.poNo}
		</button>
	);
};

export default PoViewExistingPoBtn;
