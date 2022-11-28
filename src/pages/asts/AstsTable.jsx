import React, { useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";

const AstsTable = ({ rowData, columnDefs }) => {
	// console.log(`ml2`, ml2);

	const gridRef = useRef(); // Optional - for accessing Grid's API
	// import AstsTable frields from useTableConfig
	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
		}),
		[]
	);

	// console.log(`rowData`, rowData);

	return (
		<div className={`ag-theme-alpine `}>
			<AgGridReact
				ref={gridRef} // Ref for accessing Grid's API
				rowData={rowData} // Row Data for Rows
				columnDefs={columnDefs} // Column Defs for Columns
				defaultColDef={defaultColDef} // Default Column Properties
				animateRows={true} // Optional - set to 'true' to have rows animate when sorted
				rowSelection="single" // Options - allows click selection of rows
				domLayout={"autoHeight"}
			/>
		</div>
	);
};

export default AstsTable;

// TODO: mouse over tips on the AstsTable skipHeader
