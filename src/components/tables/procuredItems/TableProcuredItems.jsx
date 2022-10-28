import React, { useRef, useMemo, useState, useEffect } from "react";
// import "./table.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";



const columns = [
	{ field: "Id", headerName: "Id", width: 90 },
	{ field: "itemName", width: 90 },
	{ field: "itemCode", width: 90 },
	{ field: "quantity", width: 90 },
];

const TableProcuredItems = () => {
	const gridRef = useRef(); // Optional - for accessing Grid's API
	// import table frields from useTableConfig

	const initRowData = useMemo(() => [
		{
			Id: 1,
			itemName: "Single Phase Meters",
			itemCode: "wBEC44(09)",
			quantity: "10",
		},
		{
			Id: 2,
			itemName: "Three Phase Meters",
			itemCode: "wBEC62(09)",
			quantity: "5",
		},
		{
			Id: 3,
			itemName: "User Interface Unit",
			itemCode: "wUIU(09)",
			quantity: "15",
		},
	]);

	const [rowData] = useState(initRowData);
	const [columnDefs] = useState(columns);
	const [noOfRows, setNoOfRows] = useState(0);

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
		}),
		[]
	);

	useEffect(() => {
		setNoOfRows(() => initRowData.length * 60);
	}, [initRowData]);

	console.log(`rowData`, rowData);

	return (
		<>
			<div
				className="ag-theme-alpine ireps-table"
				style={{ height: parseInt(noOfRows) }}
			>
				<AgGridReact
					ref={gridRef} // Ref for accessing Grid's API
					rowData={rowData} // Row Data for Rows
					columnDefs={columnDefs} // Column Defs for Columns
					defaultColDef={defaultColDef} // Default Column Properties
					animateRows={true} // Optional - set to 'true' to have rows animate when sorted
					rowSelection="multiple" // Options - allows click selection of rows
				/>
			</div>
		</>
	);
};

export default TableProcuredItems;

// TODO: mouse over tips on the table skipHeader
