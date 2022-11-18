import React, { useRef, useMemo, useState, useCallback } from "react";
import "./poi.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import PoiBtnDeleteItem from "./PoiBtnDeleteItem";
import PoiBtnAddItem from "./PoiBtnAddItem";

const PoiTable = ({ po, setPo }) => {
	// console.log(`PoiTable po`, po);
	const columns = [
		{
			field: "itemId",
			headerName: "Id",
			flex: 1.5,
		},
		{
			field: "itemAddBtn",
			flex: 2,
			headerComponent: PoiBtnAddItem,
			headerComponentParams: { po, setPo },
		},
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
			valueParser: params => {
				console.log(`valueParser params`, params);
				return Number(params.newValue);
			},
		},
		{
			field: "Del",
			flex: 1.5,
			cellRenderer: p => PoiBtnDeleteItem(p),
			cellRendererParams: { po, setPo },
		},
		// {
		// 	field: "Edit",
		// 	flex: 1.5,
		// 	cellRenderer: params => PoiBtnEditItem(params),
		// },
	];
	const { poPi } = po;
	// console.log(`poPi`, poPi)
	const gridRef = useRef();
	const [rowData, setRowData] = useState(poPi);
	const [columnDefs] = useState(columns);

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			editable: true,
		}),
		[]
	);

	const onCellValueChanged = useCallback(event => {
		console.log("Data after change is", event.data);
	}, []);

	const getRowId = useMemo(() => {
		return params => params.data.itemId;
	}, []);

	const onCellEditRequest = useCallback(
		event => {
			console.log(`event`, event);
			const data = event.data;
			const field = event.colDef.field;
			const newValue = event.newValue;
			const newItem = { ...data };
			newItem[field] = event.newValue;
			console.log("onCellEditRequest, updating " + field + " to " + newValue);

			const newPoPi = po.poPi.map(oldItem => {
				console.log(`-----------------------`)
				console.log(`oldItem`, oldItem)
				console.log(`newItem`, newItem);

				return (oldItem.itemId === newItem.itemId) ? newItem : oldItem
			}
				
			);
			console.log(`newPoPi`, newPoPi);
			setRowData(newPoPi);
			setPo({
				...po,
				poPi: newPoPi,
			});
		},
		[po]
	);

	return (
		<div className="ag-theme-alpine" style={{ minHeight: 80 }}>
			{/* <button>+</button> */}
			<AgGridReact
				ref={gridRef} // Ref for accessing Grid's API
				rowData={rowData} // Row Data for Rows
				columnDefs={columnDefs} // Column Defs for Columns
				defaultColDef={defaultColDef} // Default Column Properties
				animateRows={true} // Optional - set to 'true' to have rows animate when sorted
				rowSelection="single" // Options - allows click selection of rows
				// onCellClicked={addItems}
				domLayout={"autoHeight"}
				getRowId={getRowId}
				onCellValueChanged={onCellValueChanged}
				readOnlyEdit={true}
				onCellEditRequest={onCellEditRequest}
			/>
		</div>
	);
};

export default PoiTable;

// TODO: mouse over tips on the table skipHeader
