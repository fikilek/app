import React, { useContext } from "react";
import useModal from "../../hooks/useModal";

const PoInvPopBtn = params => {

	const { openModal } = useModal()
	
	const handleClick = e => {
		e.preventDefault()
		// modalOpened a modal window
		openModal({
			modalName: "poInvPop",
			payload: {
				poData: params.data,
			},
		});
	}

	return (
		<button onClick={handleClick} className="btn-table-row btn-trn-count">
			{params.data.poData.poInv.length} {` / `}
			{params.data.poData.poPop.length}
		</button>
	);
};

export default PoInvPopBtn;
