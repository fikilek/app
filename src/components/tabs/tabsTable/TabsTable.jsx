import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback,
	useContext,
} from "react";
import format, { toDate } from "date-fns";
import "./tabsTable.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import { useSelector, useDispatch } from "react-redux";

import {
	unpTableData,
	unpRoles,
	unpStates,
} from "../../../data/adminData/adminData";
import { UserContext } from "../../../contexts/UserContext";

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

// import table fields
// import { astTableFields, trnTableFields } from "./tableFields";
import useTableFields from "./useTableFields";

// const TabsTable = ({ tableData, ml1, ml2, ml3 }) => {
const TabsTable = ({ tabName, ml1, ml2, ml3 }) => {
	const gridRef = useRef(); // Optional - for accessing Grid's API
	const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row

	const { asts, trns } = useSelector(state => state);
	// console.log(`tabName`, tabName);
	// console.log(`asts`, asts);
	// console.log(`trns`, trns);

	// import table frields from useTableFields
	const {astTableFields, trnTableFields} = useTableFields()

	// Each Column Definition results in one Column.
	const [columnDefs, setColumnDefs] = useState([]);

	const defaultColDef = useMemo(() => ({
		sortable: true,
		filter: true,
		resizable: true,
		// flex: 1,
	}), []);

	useEffect(() => {
		switch (tabName) {
			case "Assets":
				setColumnDefs(astTableFields);
				setRowData(asts);
				return;
			case "Transactions":
				setColumnDefs(trnTableFields);
				setRowData(trns);
				return;
			default:
				return;
			// TODO: sort out the default return
		}
	}, [tabName, asts, trns]);

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
					// onFirstDataRendered={() => autoSizeAll(true)}
				/>
			</div>
		</>
	);
};

export default TabsTable;


// TODO: mouse over tips on the table skipHeader