import React from "react";
import useModal from "../../../hooks/useModal";

const TableAstsInErfBtn = props => {
	// console.log(`props`, props)

	// Extract trnCount from metaData.trnCount
	const trnCount = props.data?.asts?.length || 0;

	// Get tenCount newTrns from metaData.trnCount
	const ast = props.data;
	// console.log(`trnCountArray`, trnCountArray)

	const { openModal } = useModal();

	const handleClick = e => {
		// console.log(`open modal tableTrnsForAst with: `, trnCountArray);

		if (trnCount) {
			e.preventDefault();
			openModal({
				modalName: "tableAstsInErf",
				payload: ast,
			});
		}
	};

	return (
		<button type="button" onClick={handleClick} className="table-row-btn">
			{trnCount}
		</button>
	);
};

export default TableAstsInErfBtn;
