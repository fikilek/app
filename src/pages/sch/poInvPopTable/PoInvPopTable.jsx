import React, { useRef, useMemo, useState, useCallback } from "react";
import "./PoInvPopTable.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
// import { Tooltip } from "react-tippy";
import PoInvPopTableBtnDeleteItem from "./PoInvPopTableBtnDeleteItem";
import PoInvPopImage from "./PoInvPopImage";

const PoInvPopTable = ({ data: d }) => {
	// console.log(`PoInvPopTable d`, d);
	const columns = [
		{
			field: "id",
			headerName: "Id",
			flex: 1.5,
			hide: true,
		},
		{
			field: "no",
			headerName: "no",
			flex: 2,
			headerTooltip: "item number",
		},
		{
			field: "amount",
			headerName: "amount",
			flex: 3,
			headerTooltip: "Amount",
			// TODO: use value formater
		},
		{
			field: "url",
			headerName: "Image",
			flex: 3,
			headerTooltip: "Invoice / Pop image",
			cellRenderer: PoInvPopImage,
			cellRendererParams: {  },
		},
		{
			field: "",
			flex: 1.5,
			cellRenderer: p => PoInvPopTableBtnDeleteItem(p),
			cellRendererParams: { d },
			sortable: false,
			filter: false,
			resizable: false,
			editable: false,
			tooltipValueGetter: p => "Click to delete the row",
		},
	];

	const gridRef = useRef();
	const [rowData, setRowData] = useState(d);
	const [columnDefs] = useState(columns);

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: false,
			resizable: false,
			editable: false,
		}),
		[]
	);

	return (
		<div className="ag-theme-alpine" style={{ minHeight: 80 }}>
			<AgGridReact
				ref={gridRef} // Ref for accessing Grid's API
				rowData={rowData} // Row Data for Rows
				columnDefs={columnDefs} // Column Defs for Columns
				defaultColDef={defaultColDef} // Default Column Properties
				animateRows={true} // Optional - set to 'true' to have rows animate when sorted
				rowSelection="single" // Options - allows click selection of rows
				domLayout={"autoHeight"}
				enableCellChangeFlash={true}
			/>
		</div>
	);
};

export default PoInvPopTable;

// TODO: mouse over tips on the table skipHeader
// TODO: do tooltips
