import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

const PoAlterStateBtn = params => {
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	// console.log(`params`, params);

	const handleClick = e => {
		e.preventDefault();
		// modalOpened a modal window
		setComponentToOpen({
			...componentToOpen,
			name: "poAlterState",
			payload: {poData: params.data	},
		});
		setModalOpened(true);
	};

	return (
		<button
			onClick={handleClick}
			className={`btn-table-row ${params.data.poStatus === "Created" ? "btn-po-table-created" : "btn-po-table-approved" }`}
		>
			{params.data.poStatus}
		</button>
	);
};

export default PoAlterStateBtn;
