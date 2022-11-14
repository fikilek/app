import moment from "moment";

export const poData = [
	// purchase order (po) data
	{
		poSystemId: 1,
		metaData: {
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedByUser: "fikile kentane",
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			createdByUser: "fikile kentane",
			poHistory: 1,
		},
		poData: {
			poNo: "po-1", // Purchase Order No. THis is the begining of the procurment process
			poInv: "Inv-121212", // Invoice sent by the supplier
			poPop: "Pop scan", // Proof of Payment for the invoice paid
			poGrv: "g-1", // Goods received. THis should correspond to the items in the PO.
		},
	},
]

export const splData = [
	// Supplier (spl) data
];

export const piData = [
	// Procured items (pi) data. These are the items that appear on the PO procured items list.
	{
		piSystemId: 22,
		poSystemId: 1,
		metaData: {
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedByUser: "fikile kentane",
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			createdByUser: "fikile kentane",
			piHistory: 1,
		},
		itemName: "singe phase meter",
		itemCode: "BEC44",
		quantity: 3,
	},
	{
		piSystemId: 23,
		poSystemId: 1,
		metaData: {
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedByUser: "fikile kentane",
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			createdByUser: "fikile kentane",
			piHistory: 1,
		},
		itemName: "thre phase meter",
		itemCode: "BEC66",
		quantity: 2,
	},
];
