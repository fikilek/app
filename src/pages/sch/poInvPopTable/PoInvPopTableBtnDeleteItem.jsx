
import { useCallback } from "react";
import "./PoInvPopTableBtnDeleteItem.css";

const PoInvPopTableBtnDeleteItem = params => {
	
	const getRowData = useCallback(() => {
		const rowData = [];
		params.api.forEachNode(function (node) {
			rowData.push(node.data);
		});
		params.setPo({
			...params.po,
			poPi: rowData,
		});
	}, []);

	const handleDeleteItem = e => {
		e.preventDefault();
		const selectedRows = params.api.getSelectedRows();
		params.api.applyTransaction({ remove: selectedRows });
		getRowData()
	};

	return (
		<button
			type="button"
			className="btnPoi btnPoiDeleteItem"
			onClick={handleDeleteItem}
		>
			x
		</button>
	);
};

export default PoInvPopTableBtnDeleteItem;
