import React, { useRef, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
import { useSelector } from "react-redux";

const GrvTestTable = () => {
	const { grvData } = useSelector(state => state.sch);
	console.log(`grvData`, grvData);

	const [rowData, setRowData] = useState(grvData);

	useEffect(() => {
		setRowData(grvData)
	}, [grvData]);

	const [columnDefs] = useState([
		{ field: "grvId" },
		{ field: "grvAstCartegory" },
		{ field: "grvAstNo" },
	]);

	const gridRef = useRef();
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

export default GrvTestTable;

// TODO: mouse over tips on the GrvTeastTable skipHeader
