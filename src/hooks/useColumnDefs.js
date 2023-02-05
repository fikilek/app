import moment from "moment";
import TableBtnOpenTrns from "../components/tableBtns/TableBtnOpenTrns";
import TableBtnTrnSelect from "../components/tableBtns/TableBtnTrnSelect";
import TableCellArrayData from "../components/tableBtns/TableCellArrayData";
import TableCellPoleData from "../components/tableBtns/TableCellPoleData";
import PoiBtn from "../components/tables/poi/PoiBtn";
import PoBtn from "../pages/sch/PoBtn";
import UserSignatureBtn from "../components/userSignature/UserSignatureBtn";
import { getPoStatus } from "../utils/utils";
import PoInvPopBtn from "../pages/sch/PoInvPopBtn";

export const useColumnDefs = ({ ml1, ml2, ml3 }) => {
	// Purchase Order (po) table fields
	const poTableFields = [
		{
			field: "id",
			headerName: "System Id",
			width: 90,
			hide: true
		},
		{
			// A click displays a modal that shows the Purchase Order
			field: "poNo",
			headerName: "Po No",
			width: 120,
			cellRenderer: PoBtn,
		},
		{
			// A click displays a modal that shows the Purchase Order
			field: "poStatus",
			headerName: "Status",
			width: 120,
			cellRenderer: params => {
				// console.log(`params`, params)
				return getPoStatus(params.data) || "Error";
			},
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
			field: "poApprove",
			headerName: "Approval",
			width: 120,
			cellRenderer: UserSignatureBtn,
			cellRendererParams: { signatureName: "poApprove" },
			// tooltipField: "poApprove",
			// TODO: implement the PO aproval system
		},
		{
			headerName: "Supply Chain",
			children: [
				{
					// A click displays a modal of image(s) of the invoice(s) of the PO
					field: "",
					headerName: "Inv & Pop",
					width: 120,
					cellRenderer: PoInvPopBtn,
				},
				{
					field: "poData.poTotalItems",
					headerName: "Total Items",
					width: 120,
					cellRenderer: PoiBtn,
				},
			],
		},

		{
			field: "poGrvReceiver",
			headerName: "Receiver",
			width: 120,
			cellRenderer: UserSignatureBtn,
			cellRendererParams: { signatureName: "receiver" },
			// TODO: implement the PO aproval system
		},
		{
			field: "poGrvWitness",
			headerName: "Witness",
			width: 120,
			cellRenderer: UserSignatureBtn,
			cellRendererParams: { signatureName: "witness" },
			// TODO: implement the PO aproval system
		},
		{
			headerName: "Supplier",
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
	// Assets (asts) table fields
	const astTableFields = [
		{
			field: "id",
			headerName: "Ast Id",
			width: 90
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
		{ field: "size", headerName: "Size", initialWidth: 120 },
	];

	const astFeeder = [
		{ field: "length", headerName: "Size", initialWidth: 120 },
	];

	const astSeal = [
		{ field: "manufacture", headerName: "Manufacture", initialWidth: 120 },
	];

	const astVtct = [
		{ field: "manufacture", headerName: "Manufacture", initialWidth: 120 },
	];

	const astTrf = [
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
	if (ml2 === "seal") return [...astTableFields, ...astSeal, ...media];
	if (ml2 === "vtct") return [...astTableFields, ...astVtct, ...media];
	if (ml2 === "trf") return [...astTableFields, ...astTrf, ...media];
	return [...astTableFields, ...media];
};
