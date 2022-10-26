import moment from "moment";

export const schData = [
	{
		//this asr transaction creaed a meter into the store
		schSystemId: 1,
		metaData: {
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedByUser: "fikile kentane",
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			createdByUser: "fikile kentane",
			schHistory: 1,
		},
		schData: {
			schPoNo: "po-1", // Purchase Order No
			schInv: "Inv-121212", // Invoice
			schPop: "Pop scan", // Proof of Payment scan
			schGrv: "grv-1", 
			schTotalItems: 15,
			schItems: ["Single phase meters", "Three phase meters"],
		},
	},
];
