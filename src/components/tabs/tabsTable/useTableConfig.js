import React, { useContext } from "react";
import { useSelector } from "react-redux";
import useOpenModal from "../../modals/useOpenModal";
import CreatedAtLocation from "../../tableBtns/CreatedAtLocation";
import TableBtnTrnSelect from "../../tableBtns/TableBtnTrnSelect";

const useTableConfig = ({ ml1, ml2, ml3 }) => {
	const { modalToOpen } = useOpenModal();
	const { asts, trns, admin } = useSelector(state => state);

	const openModal = e =>
		modalToOpen(e.target.id, e.target.getAttribute("data-trn-id"));

	const astTableFields = [
		{ field: "astSystemId", headerName: "Ast System Id", initialWidth: 120 },
		{
			headerName: "Updated",
			children: [
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
				},
				// 3
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
				},
			],
		},
		{
			headerName: "Created",
			children: [
				{
					field: "metaData.createdByUser",
					columnGroupShow: "closed",
					headerName: "Created By",
					width: 180,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 180,
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
				},
			],
		},
		{
			field: "metaData.createdThrough",
			headerName: "Trn That Created Ast",
			width: 180,
		},
		{
			field: "metaData.trnCount",
			headerName: "Trn Count",
			width: 120,
			cellRenderer: p => (
				<button className="btn-table-row btn-trn-count">{p.value}</button>
			),
		},
		{
			field: "newTrn",
			headerName: "New Trn",
			width: 140,
			cellRenderer: p => <TableBtnTrnSelect params={p} />,
		},
		{
			headerName: "Asset Data",
			children: [
				{
					field: "astData.astNo",
					columnGroupShow: "closed",
					headerName: `Asset No`,
					width: 160,
					cellRenderer: p =>
						p.value ? (
							<button className="btn-table-row btn-serial-no">{p.value}</button>
						) : (
							""
						),
				},
				{
					field: "astData.astNo",
					columnGroupShow: "open",
					headerName: `Asset No`,
					width: 160,
					cellRenderer: p =>
						p.value ? (
							<button className="btn-table-row btn-serial-no">{p.value}</button>
						) : (
							""
						),
				},
				{
					field: "astData.astSerialNo",
					columnGroupShow: "open",
					headerName: "Ast Serial No",
					width: 140,
				},
				{
					field: "astData.astCartegory",
					columnGroupShow: "closed",
					headerName: "Ast Cartegory",
					width: 140,
				},
				{
					field: "astData.astCartegory",
					columnGroupShow: "open",
					headerName: "Ast Cartegory",
					width: 140,
				},
				{
					field: "astData.astState",
					columnGroupShow: "open",
					headerName: "Ast State",
					width: 140,
				},
				{
					field: "astData.astState",
					columnGroupShow: "closed",
					headerName: "Ast State",
					width: 140,
				},
			],
		},
	];

	const astMeter = [
		{
			headerName: "Meters",
			children: [
				{ field: "astData.meter.phase", headerName: "Phase", initialWidth: 120 },
				{ field: "astData.meter.type", headerName: "Type", initialWidth: 120 },
			],
		},
	];

	const astPole = [
		// 1
		{ field: "type", headerName: "Type", initialWidth: 120 }, // [metal, wood]
		{ field: "height", headerName: "Height", initialWidth: 120 }, //
	];

	const astBox = [
		// 1
		{ field: "type", headerName: "Type", initialWidth: 120 }, // [metal, fibreglass]
		{ field: "dimensions", headerName: "Domensions", initialWidth: 120 }, //
	];

	const astCB = [
		// 1
		{ field: "size", headerName: "Size", initialWidth: 120 },
	];

	const astFeeder = [
		// 1
		{ field: "length", headerName: "Size", initialWidth: 120 },
	];

	const astSeal = [
		// 1
		{ field: "manufacture", headerName: "Manufacture", initialWidth: 120 },
	];

	const astVtct = [
		// 1
		{ field: "manufacture", headerName: "Manufacture", initialWidth: 120 },
	];

	const trnTableFields = [
		{
			// CLick on a btn on this opens a trnasaction form
			field: "trnSystemId",
			headerName: "Trn System Id",
			width: 140,
			cellRenderer: p => {
				// console.log(`p.data`, p.data);
				return (
					<button
						id="trnForm"
						data-trn-id={JSON.stringify(p.data)}
						className="btn-table-row btn-system-id"
						onClick={openModal}
					>
						{p.data.trnSystemId}
					</button>
				);
			},
		},
		{
			headerName: "Updated",
			children: [
				{
					columnGroupShow: "open",
					field: "metaData.updatedAtDatetime",
					headerName: "At Datetime",
					width: 180,
				},
				{
					columnGroupShow: "closed",
					field: "metaData.updatedByUser",
					headerName: "By User",
					width: 120,
				},
				{
					// CLick on a btn on this opens a map tab showing where the asset is located on the map
					columnGroupShow: "open",
					field: "metaData.updatedAtLocation",
					headerName: "At Location",
					width: 160,
					cellRenderer: CreatedAtLocation,
				},
			],
		},
		{
			headerName: "Created",
			hide: true,
			children: [
				{
					columnGroupShow: "open",
					field: "metaData.createdAtDatetime",
					headerName: "At Datetime",
					width: 180,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "closed",
					headerName: "By User",
					width: 120,
				},
				{
					// CLick on a btn on this opens a map tab showing where the asset is located on the map
					columnGroupShow: "open",
					field: "metaData.createdAtLocation",
					headerName: "At Location",
					width: 160,
					cellRenderer: CreatedAtLocation,
				},
			],
		},
		{
			// CLick on a btn on this opens a table with all updates on this trtansaction. THis comes from trnHistory table
			field: "metaData.trnHistory",
			headerName: "Trn History",
			width: 130,
			cellRenderer: p => (
				<button className="btn-table-row btn-trn-history">
					{p.data.metaData.trnHistory}
				</button>
			),
		},
		{ field: "metaData.trnType", headerName: "Trn Type", width: 110 },
		{
			headerName: "Asset Data",
			children: [
				{
					field: "astData.astNo",
					columnGroupShow: "open",
					headerName: "Ast Number",
					width: 160,

					cellRenderer: p => {
						// console.log(`p`, p);
						return (
							<button
								id="astForm"
								data-trn-id={JSON.stringify(p.data)}
								className="btn-table-row btn-linked-ast-serial-no"
								onClick={openModal}
							>
								{p.data.astData.astNo}
							</button>
						);
					},
				},
				{
					// CLick on a btn on this opens an asset
					field: "astData.astSerialNo",
					columnGroupShow: "open",
					headerName: "Serial No",
					width: 180,
				},
				{
					field: "astData.astCartegory",
					columnGroupShow: "open",
					headerName: "Ast Cartegory",
					width: 150,
					cellRenderer: p => p.data.astData.astCartegory,
				},
				{
					field: "astData.astNo",
					columnGroupShow: "closed",
					headerName: "Ast Number",
					width: 160,

					cellRenderer: p => {
						// console.log(`p`, p);
						return (
							<button
								id="astForm"
								data-trn-id={JSON.stringify(p.data)}
								className="btn-table-row btn-linked-ast-serial-no"
								onClick={openModal}
							>
								{p.data.astData.astNo}
							</button>
						);
					},
				},
				{
					field: "astData.astSystemId",
					columnGroupShow: "open",
					headerName: "Ast System Id",
					width: 150,
					hide: true,
					cellRenderer: p => p.data.astData.astSystemId,
				},
			],
		},
		// { field: "asset" },
	];

	const trnGrv = [
		{
			headerName: "Goods Receiving",
			children: [
				{
					field: "grv.purchaseOrderNo",
					columnGroupShow: "closed",
					headerName: "Purchase Order No",
					initialWidth: 170,
				},
				{
					field: "grv.invoiceNo",
					columnGroupShow: "open",
					headerName: "Invoice No",
					initialWidth: 150,
				},
				{
					field: "grv.supplierName",
					columnGroupShow: "open",
					headerName: "Supplier Name",
					initialWidth: 170,
				},
				{
					field: "grv.supplierContactNo",
					columnGroupShow: "open",
					headerName: "Supplier Contacts",
					initialWidth: 170,
				},
				{
					field: "grv.supportingDocs",
					columnGroupShow: "open",
					headerName: "Supporting Docs",
					initialWidth: 170,
				},
			],
		},
	];

	if (ml1 === "asts" && ml2 === undefined)
		return { rowData: asts, columnDefs: astTableFields };
	if (ml1 === "asts" && ml2 === "meters")
		return { rowData: asts, columnDefs: [...astTableFields, ...astMeter] };
	if (ml1 === "asts" && ml2 === "poles")
		return { rowData: asts, columnDefs: [...astTableFields, ...astPole] };
	if (ml1 === "asts" && ml2 === "boxes")
		return { rowData: asts, columnDefs: [...astTableFields, ...astBox] };
	if (ml1 === "asts" && ml2 === "cbs")
		return { rowData: asts, columnDefs: [...astTableFields, ...astCB] };
	if (ml1 === "asts" && ml2 === "feeders")
		return { rowData: asts, columnDefs: [...astTableFields, ...astFeeder] };
	if (ml1 === "asts" && ml2 === "seals")
		return { rowData: asts, columnDefs: [...astTableFields, ...astSeal] };
	if (ml1 === "asts" && ml2 === "vtct")
		return { rowData: asts, columnDefs: [...astTableFields, ...astVtct] };

	if (ml1 === "trns" && ml2 === undefined && ml3 === undefined)
		return { rowData: trns, columnDefs: trnTableFields };
	if (ml1 === "trns" && ml2 === "meters" && ml3 === undefined)
		return {
			rowData: trns,
			columnDefs: [...trnTableFields, ...astMeter],
		};
	if (ml1 === "trns" && ml2 === "meters" && ml3 === "grv")
		return {
			rowData: trns,
			columnDefs: [...trnTableFields, ...astMeter, ...trnGrv],
		};

	// return { rowData: asts, columnDefs: astTableFields };
};

export default useTableConfig;
