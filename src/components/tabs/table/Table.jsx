import React, { useRef, useMemo } from "react";
import "./table.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

// import table fields
// import { astTableFields, trnTableFields } from "./tableFields";
import useTableConfig from "./useTableConfig";

const Table = ({ ml1, ml2, ml3 }) => {
	// console.log(`ml1`, ml1);
	// console.log(`ml2`, ml2);
	// console.log(`ml3`, ml3);

	const gridRef = useRef(); // Optional - for accessing Grid's API
	// import table frields from useTableConfig
	const { rowData, columnDefs } = useTableConfig({
		ml1,
		ml2,
		ml3,
	});

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
		<>
			<div className="ag-theme-alpine ireps-table">
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

export default Table;

// TODO: mouse over tips on the table skipHeader
