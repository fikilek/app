import React, { useRef, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
// import { shallowEqual, useSelector, useStore } from "react-redux";
import useCollection from "../../../hooks/useCollection";

const TestAstsTable = () => {
	// const state = useSelector(state => state, shallowEqual);
	const { data: astsTestData } = useCollection("astsTestData");
	console.log(`astsTestData`, astsTestData)
	// const { grvData } = useSelector(state => state.sch);
	// const state = useSelector(state => state)
	// console.log(`state`, state);
	// const { astsTestData } = state.asts;

	const [rowData, setRowData] = useState([]);

	const [columnDefs] = useState([
		{ field: "id" },
		{ field: "grvId" },
		{ field: "astCartegory" },
		{ field: "astNo" },
	]);

	useEffect(() => {
		setRowData(astsTestData);
	}, [astsTestData]);

	const gridRef = useRef();
	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
		}),
		[]
	);

	console.log(`rowData`, rowData);

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

export default TestAstsTable;

// TODO: mouse over tips on the TestAstsTable skipHeader
