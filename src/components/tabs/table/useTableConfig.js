import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useFilterData from "../../../hooks/useFilterData";
import PoViewExistingPoBtn from "../../../pages/sch/PoViewExistingPoBtn";
import PoViewGrv from "../../../pages/sch/PoViewGrv";
import useOpenModal from "../../modals/useOpenModal";
import CreatedAtLocation from "../../tableBtns/CreatedAtLocation";
import TableBtnOpenTrns from "../../tableBtns/TableBtnOpenTrns";
import TableBtnTrnSelect from "../../tableBtns/TableBtnTrnSelect";
import TableCellArrayData from "../../tableBtns/TableCellArrayData";
import TableCellPoleData from "../../tableBtns/TableCellPoleData";
import PoiBtnViewPoi from "../../tables/poi/PoiBtnViewPoi";

const useTableConfig = ({ ml1, ml2, ml3, otherData }) => {
	// TODO: come back and do all combinations of ml1, ml2 and ml3

	const { modalToOpen } = useOpenModal();
	const { asts, trns, sch } = useFilterData({ ml1, ml2, ml3 });

	const openModal = e =>
		modalToOpen(e.target.id, e.target.getAttribute("data-trn-id"));

	// supply chain table fields
	const schTableFields = [
		{ field: "poSystemId", headerName: "Po Id", width: 90, hide: true },
		{
			field: "poStatus",
			headerName: "Status",
			width: 110,
			cellRenderer: p => {
				const poStatus =
					p.data.poStatus === "Created"
						? "btn-po-status-created"
						: "btn-po-status-aproved";
				return <button className={`btn-table-row ${poStatus}`}>{p.value}</button>;
			},
			// TODO: implement the PO aproval system
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
				},
				// 3
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
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
					width: 130,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
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
			headerName: "Supply Chain Data",
			children: [
				{
					// A click displays a modal that shows the Purchase Order
					field: "poData.poNo",
					headerName: "Po No",
					width: 120,
					cellRenderer: PoViewExistingPoBtn,
				},
				{
					// A click displays a modal of image(s) of the invoice(s) of the PO
					field: "poData.poInv[0]",
					headerName: "Invoice Data",
					width: 130,
					cellRenderer: p => {
						// console.log(`p`, p);
						return (
							<button className="btn-table-row btn-trn-count">
								{p.data.poData.poInv.length}
							</button>
						);
					},
				},
				{
					// A click displays a modal that shows Proof of Payment for the invoices
					field: "poData.poPop[0]",
					headerName: "Proof Of Payment",
					width: 160,
					cellRenderer: p => {
						// console.log(`p`, p);
						return (
							<button className="btn-table-row btn-trn-count">
								{p.data.poData.poPop.length}
							</button>
						);
					},
				},
				{
					// A click displays a modal with grv of the Goods on the PO
					field: "poData.poGrv.grvStatus",
					headerName: "GRV",
					width: 120,
					cellRenderer: PoViewGrv,
				},
				{
					field: "poData.poTotalItems",
					headerName: "Total Items",
					width: 120,
					cellRenderer: PoiBtnViewPoi,
				},
			],
		},
		{
			headerName: "Supplier Details",
			children: [
				{
					field: "poSplData.splName",
					columnGroupShow: "closed",
					headerName: "Supplier",
					width: 120,
				},
				{
					field: "poSplData.splContactSurname",
					columnGroupShow: "closed",
					headerName: "Surname",
					width: 110,
				},
				{
					field: "poSplData.splContactName",
					columnGroupShow: "closed",
					headerName: "Name",
					width: 110,
				},
				{
					field: "poSplData.splContactNo",
					columnGroupShow: "open",
					headerName: "Name",
					width: 140,
				},
				{
					field: "poSplData.splContactEmailAdr",
					columnGroupShow: "open",
					headerName: "Name",
					width: 210,
				},
			],
		},
	];

	// assets fields
	const astTableFields = [
		{ field: "astSystemId", headerName: "Ast Id", width: 90 },
		// {
		// 	headerName: "Updated",
		// 	children: [
		// 		{
		// 			field: "metaData.updatedByUser",
		// 			columnGroupShow: "closed",
		// 			headerName: "Updated By",
		// 			width: 130,
		// 		},
		// 		{
		// 			field: "metaData.updatedByUser",
		// 			columnGroupShow: "open",
		// 			headerName: "Updated By",
		// 			width: 130,
		// 		},
		// 		// 3
		// 		{
		// 			field: "metaData.updatedAtDatetime",
		// 			columnGroupShow: "open",
		// 			headerName: "Updated At Datetime",
		// 			width: 190,
		// 		},
		// 	],
		// },
		// {
		// 	headerName: "Created",
		// 	children: [
		// 		{
		// 			field: "metaData.createdByUser",
		// 			columnGroupShow: "closed",
		// 			headerName: "Created By",
		// 			width: 130,
		// 		},
		// 		{
		// 			field: "metaData.createdByUser",
		// 			columnGroupShow: "open",
		// 			headerName: "Created By",
		// 			width: 130,
		// 		},
		// 		{
		// 			field: "metaData.createdAtDatetime",
		// 			columnGroupShow: "open",
		// 			headerName: "Date Created",
		// 			width: 180,
		// 		},
		// 	],
		// },
		// {
		// 	field: "metaData.createdThrough",
		// 	headerName: "Created Through",
		// 	width: 160,
		// },
		// {
		// 	field: "metaData.trnCount",
		// 	headerName: "Ast Trn(s)",
		// 	width: 140,
		// 	cellRenderer: p => <TableBtnOpenTrns params={p} />,
		// },
		// {
		// 	field: "newTrn",
		// 	headerName: "New Trn",
		// 	width: 170,
		// 	cellRenderer: p => <TableBtnTrnSelect params={p} ml2={ml2} />,
		// },
		{
			headerName: "Asset Data",
			children: [
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
		{
			headerName: "Pole",
			children: [
				{ field: "astData.pole.type", headerName: "Type", initialWidth: 120 }, // [metal, wood]
				{
					field: "astData.pole.dimensions",
					headerName: "Height",
					initialWidth: 120,
					cellRenderer: p => <TableCellPoleData params={p} />,
				}, //
				{
					field: "astData.pole.hasStreetLamp",
					headerName: "Has Street Lamp",
					initialWidth: 120,
				}, //
			],
		},
	];

	const astBox = [
		{
			headerName: "Boxes",
			children: [
				{ field: "astData.box.type", headerName: "Type", initialWidth: 120 }, // [metal, fibreglass]
				{
					field: "astData.box.dimensions",
					headerName: "Domensions",
					width: 160,
					cellRenderer: p => <TableCellArrayData params={p} />,
				},
				{
					field: "astData.box.location",
					headerName: "Location",
					initialWidth: 120,
				}, // ['top of pole', 'bottpm of pole','stand alone', 'on the wall']
			],
		},
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

	const media = [
		{
			headerName: "Media",
			children: [
				{
					field: "photos",
					headerName: "Photos",
					width: 130,
					cellRenderer: p => (
						<button className="btn-table-row btn-media btn-media-photos">
							Photos
						</button>
					),
				},
				{
					field: "videos",
					headerName: "Videos",
					width: 130,
					cellRenderer: p => (
						<button className="btn-table-row btn-media btn-media-videos">
							Videos
						</button>
					),
				},
				{
					field: "voice",
					headerName: "Voice",
					width: 130,
					cellRenderer: p => (
						<button className="btn-table-row btn-media btn-media-voice">Voice</button>
					),
				},
			],
		},
	];

	// transactions

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

	const trnAsr = [
		{
			headerName: "Goods Receiving",
			children: [
				{
					field: "asr.purchaseOrderNo",
					columnGroupShow: "closed",
					headerName: "Purchase Order No",
					initialWidth: 170,
				},
				{
					field: "asr.invoiceNo",
					columnGroupShow: "open",
					headerName: "Invoice No",
					initialWidth: 150,
				},
				{
					field: "asr.supplierName",
					columnGroupShow: "open",
					headerName: "Supplier Name",
					initialWidth: 170,
				},
				{
					field: "asr.supplierContactNo",
					columnGroupShow: "open",
					headerName: "Supplier Contacts",
					initialWidth: 170,
				},
				{
					field: "asr.supportingDocs",
					columnGroupShow: "open",
					headerName: "Supporting Docs",
					initialWidth: 170,
				},
			],
		},
	];

	const poiTableFields = [
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
	];

	// Supply Chain TableBtnOpenTrns
	if (ml1 === "sch") {
		return {
			rowData: sch.poData,
			columnDefs: [...schTableFields],
		};
	}

	if (ml1 === "poi") {
		// get po system id
		// console.log(`otherData`, otherData)
		const { id } = otherData;
		// get po items
		const poPi = sch.poData.find(element => {
			return element.id === id;
		});
		return {
			rowData: poPi.poPi,
			columnDefs: [...poiTableFields],
		};
	}

	// Assets

	if (ml1 === "asts" && ml2 === undefined)
		return {
			rowData: asts.astsData,
			// columnDefs: [...astTableFields, ...media],
			columnDefs: [...astTableFields],
		};
	if (ml1 === "asts" && ml2 === "meter")
		return {
			rowData: asts.astsData,
			columnDefs: [...astTableFields, ...astMeter, ...media],
		};
	if (ml1 === "asts" && ml2 === "pole")
		return {
			rowData: asts.astsData,
			columnDefs: [...astTableFields, ...astPole, ...media],
		};
	if (ml1 === "asts" && ml2 === "box")
		return {
			rowData: asts.astsData,
			columnDefs: [...astTableFields, ...astBox, ...media],
		};
	if (ml1 === "asts" && ml2 === "cb")
		return {
			rowData: asts.astsData,
			columnDefs: [...astTableFields, ...astCB, ...media],
		};
	if (ml1 === "asts" && ml2 === "feeder")
		return {
			rowData: asts.astsData,
			columnDefs: [...astTableFields, ...astFeeder, ...media],
		};
	if (ml1 === "asts" && ml2 === "seal")
		return {
			rowData: asts.astsData,
			columnDefs: [...astTableFields, ...astSeal, ...media],
		};
	if (ml1 === "asts" && ml2 === "vtct")
		return {
			rowData: asts.astsData,
			columnDefs: [...astTableFields, ...astVtct, ...media],
		};

	// Transactions

	if (ml1 === "trns" && ml2 === undefined && ml3 === undefined)
		return {
			rowData: trns,
			columnDefs: trnTableFields,
		};

	// Transactions meter
	if (ml1 === "trns" && ml2 === "meter" && ml3 === undefined)
		return {
			rowData: trns,
			columnDefs: [...trnTableFields, ...astMeter, ...media],
		};
	if (ml1 === "trns" && ml2 === "meter" && ml3 === "asr")
		return {
			rowData: trns,
			columnDefs: [...trnTableFields, ...astMeter, ...trnAsr, ...media],
		};

	// Transactions box
	if (ml1 === "trns" && ml2 === "box")
		return {
			rowData: trns,
			columnDefs: [...trnTableFields, ...astBox, ...media],
		};

	// TODO: Add more ifs for all transaction

	return {
		rowData: [],
		columnDefs: [],
	};
};

export default useTableConfig;
