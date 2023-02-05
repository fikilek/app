import React from "react";
import { useColumnDefs } from "../../../hooks/useColumnDefs";
import useModal from "../../../hooks/useModal";
import { getTotalQauntites } from "./poiUtils";

const PoiBtn = params => {
	const { poiTableFields: columnDefs } = useColumnDefs({ ml1: "poi" })
	const {openModal} = useModal()
	const poPi = params.data.poPi;
	const totalQuantites = getTotalQauntites(poPi, "itemQuantity");

	const handleClick = e => {
		openModal({
			modalName: "poiTable",
			payload: { rowData: params.data.poPi, columnDefs },
		});
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="btn-table-row btn-trn-count"
		>
			{totalQuantites}
		</button>
	);
};

export default PoiBtn;
