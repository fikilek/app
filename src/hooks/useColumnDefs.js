import moment from "moment";
import TableBtnOpenTrns from "../components/tableBtns/TableBtnOpenTrns";
import TableBtnTrnSelect from "../components/tableBtns/TableBtnTrnSelect";
import TableCellArrayData from "../components/tableBtns/TableCellArrayData";
import TableCellPoleData from "../components/tableBtns/TableCellPoleData";
import PoiBtnViewPoi from "../components/tables/poi/PoiBtnViewPoi";
import PoAlterPoState from "../pages/sch/PoAlterStateBtn";
import PoViewExistingPoBtn from "../pages/sch/PoViewExistingPoBtn";

export const useColumnDefs = options => {
	const { ml1, ml2, ml3 } = options;

	// Purchase Order (po) table fields

	const poTableFields = [
		{ field: "id", headerName: "System Id", width: 90, hide: true },
		// { field: "id", headerName: "System Id", width: 90 },
		{
			// A click displays a modal that shows the Purchase Order
			field: "poNo",
			headerName: "Po No",
			width: 120,
			cellRenderer: PoViewExistingPoBtn,
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
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
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
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			field: "poStatus",
			headerName: "Status",
			width: 110,
			cellRenderer: PoAlterPoState,
			// TODO: implement the PO aproval system
		},
		{
			headerName: "Supply Chain Data",
			children: [
				{
					// A click displays a modal of image(s) of the invoice(s) of the PO
					field: "poData.poInv[0]",
					headerName: "Invoices",
					width: 110,
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
					headerName: "Pop",
					width: 90,
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

	if (ml1 === "pos") {
		return { poTableFields };
	}

	if (ml1 === "poi") {
		return { poiTableFields };
	}

	const astTableFields = [
		{ field: "id", headerName: "Ast Id", width: 90 },
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
			field: "metaData.createdThrough",
			headerName: "Created Through",
			width: 160,
		},
		{
			field: "metaData.trnCount",
			headerName: "Ast Trn(s)",
			width: 140,
			cellRenderer: p => <TableBtnOpenTrns params={p} />,
		},
		{
			field: "newTrn",
			headerName: "New Trn",
			width: 170,
			cellRenderer: p => <TableBtnTrnSelect params={p} ml2={ml2} />,
		},
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
				{ field: "astData.meter.code", headerName: "Code", initialWidth: 120 },
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

	// Asts

	if (ml2 === "meter") return [...astTableFields, ...astMeter, ...media];
	if (ml2 === "pole") return [...astTableFields, ...astPole, ...media];
	if (ml2 === "box") return [...astTableFields, ...astBox, ...media];
	if (ml2 === "cb") return [...astTableFields, ...astCB, ...media];
	if (ml2 === "feeder") return [...astTableFields, ...astFeeder, ...media];
	if (ml2 === "seals") return [...astTableFields, ...astSeal, ...media];
	if (ml2 === "vtct") return [...astTableFields, ...astVtct, ...media];
	return [...astTableFields, ...media];
};
