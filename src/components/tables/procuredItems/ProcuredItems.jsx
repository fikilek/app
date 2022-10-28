import React, { useRef, useMemo, useState, useEffect } from "react";
import "./procuredItems.css";

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const columns = [
	{ field: "id", headerName: "Id", width: 90 },
	{ field: "itemName", width: 90 },
	{ field: "itemCode", width: 90 },
	{ field: "quantity", width: 90 },
];

const TableProcuredItems = () => {
	const gridRef = useRef(); // Optional - for accessing Grid's API
	// import table frields from useTableConfig

	const initRowData = useMemo(() => [
		{
			id: 1,
			itemName: "Single Phase Meters",
			itemCode: "wBEC44(09)",
			quantity: 10,
		},
		{
			id: 2,
			itemName: "Three Phase Meters",
			itemCode: "wBEC62(09)",
			quantity: 5,
		},
		{
			id: 3,
			itemName: "User Interface Unit",
			itemCode: "wUIU(09)",
			quantity: 15,
		},
	]);

	const [noOfRows, setNoOfRows] = useState(0);
	const [total, settotal] = useState(0);

	useEffect(() => {
		setNoOfRows(() => initRowData.length * 60);

		const total = initRowData.reduce((accum, current) => {
			console.log(`accum before sumation`, accum)
			console.log(`current before sumation`, current.quantity)
			return accum + current.quantity
		}, 0);

		console.log(`total`, total);

		settotal(total);

	}, [initRowData]);

	return (
		<div style={{ height: parseInt(noOfRows) }}>
			<table className="poTable">
				<thead>
					<tr>
						{columns.map((row, index) => (
							<th key={index}>{row.field}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{initRowData.map((row, index) => (
						<tr key={row.id}>
							<td>{row.id}</td>
							<td>{row.itemName}</td>
							<td>{row.itemCode}</td>
							<td>{row.quantity}</td>
						</tr>
					))}

					<tr>
						<td>{initRowData.length + 1}</td>
						<td>
							<input
								type="text"
								name="updatedByUser"
								id="updatedByUser"
								value={""}
								placeholder="Enter Item"
							/>
						</td>
						<td>
							<input
								type="text"
								name="updatedByUser"
								id="updatedByUser"
								value={""}
								placeholder="Enter Item"
							/>
						</td>
						<td>
							<input
								type="text"
								name="updatedByUser"
								id="updatedByUser"
								value={""}
								placeholder="Enter Item"
							/>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<td colspan="3">Total</td>
					<td>{total}</td>
				</tfoot>
			</table>
		</div>
	);
};

export default TableProcuredItems;

// TODO: mouse over tips on the table skipHeader
