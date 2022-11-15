import React, {
	useRef,
	useMemo,
	useState,
	useEffect,
	useCallback,
	useContext,
} from "react";
import "./poi.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { useSelector } from "react-redux";

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import PoiBtnDeleteItem from "./PoiBtnDeleteItem";
import PoiComponentInput from "./PoiComponentInput";
import PoiBtnAddItem from "./PoiBtnAddItem";
import { MdPerson } from "react-icons/md";
import { PoContext } from "../../../contexts/PoContext";
import PoiBtnEditItem from "./PoiBtnEditItem";
import PoiForm from './PoiForm'

	const columns = [
		{
			field: "itemName",
			headerName: "Name",
			flex: 3,
		},
		{
			field: "itemCode",
			headerName: "Code",
			flex: 3,
		},
		{
			field: "itemQuantity",
			headerName: "Quantity",
			flex: 2,
		},
		{
			field: "Del",
			flex: 2,
			cellRenderer: params => PoiBtnDeleteItem(params),
		},
		{
			field: "Edit",
			flex: 2,
			cellRenderer: params => PoiBtnEditItem(params),
		},
	];

const PoiTable = props => {
	const gridRef = useRef();
	const { poItemsInContext } = useContext(PoContext);
	const [rowData, setRowData] = useState(poItemsInContext);
	const [columnDefs] = useState(columns);

	useEffect(() => {
		// console.log(`poItemsInContext has changed`, poItemsInContext);
		setRowData(poItemsInContext);
	}, [poItemsInContext]);

  const onCellValueChanged = params => {
			console.log(`cell value has changed`, params.value)
		};

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			editable: true,
		}),
		[]
	);

	const onGridReady = e => {
		// console.log(`e.api`, e.api)
	};

	// console.log(`rowData`, rowData);
	//
	return (
		<div className="ag-theme-alpine" style={{ minHeight: 80 }}>
			<PoiForm />
			<AgGridReact
				ref={gridRef} // Ref for accessing Grid's API
				rowData={rowData} // Row Data for Rows
				columnDefs={columnDefs} // Column Defs for Columns
				defaultColDef={defaultColDef} // Default Column Properties
				animateRows={true} // Optional - set to 'true' to have rows animate when sorted
				rowSelection="single" // Options - allows click selection of rows
				// onCellClicked={addItems}
				onCellValueChanged={onCellValueChanged}
				domLayout={"autoHeight"}
				onGridReady={onGridReady}
			/>
		</div>
	);
};

export default PoiTable;

// TODO: mouse over tips on the table skipHeader
