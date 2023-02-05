import React, { useRef, useMemo, useState } from "react";
import "./PoTable.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
// import PoTooltip from "./PoTooltip";

const PoTable = ({ rowData, columnDefs }) => {
	// console.log(`rowData`, rowData);
	// const [style, setStyle] = useState({
	// 	height: "100%",
	// 	width: "100%",
	// });

	const gridRef = useRef(); // Optional - for accessing Grid's API
	// import PoTable frields from useTableConfig
	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			// tooltipComponent: PoTooltip,
		}),
		[]
	);

	// console.log(`rowData`, rowData);

	return (
		<div style={{ height: "calc(100% - 25px)" }} className="ag-theme-alpine">
			<AgGridReact
				ref={gridRef} // Ref for accessing Grid's API
				rowData={rowData} // Row Data for Rows
				columnDefs={columnDefs} // Column Defs for Columns
				defaultColDef={defaultColDef} // Default Column Properties
				animateRows={true} // Optional - set to 'true' to have rows animate when sorted
				rowSelection="single" // Options - allows click selection of rows
			/>
		</div>
	);
};

export default PoTable;

// TODO: mouse over tips on the PoTable skipHeader
