import moment from "moment";
import { nanoid } from "nanoid";

export const trnsData = [
	{
		//this grv transaction creaed a meter into the store
		trnSystemId: nanoid(),
		metaData: {
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedAtLocation: null,
			updatedByUser: "fikile kentane",
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			createdAtLocation: null,
			createdByUser: "fikile kentane",
			trnHistory: 1,
			trnType: "goods receiving", //['grv', 'ins', 'com', 'ven', 'mis', 'fnd', '', '', '', '', ]
		},
		assetData: {
			astSystemId: 1,
			serialNo: "123 4567", // for meters-meter no
			astCartegory: "meter", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
			meter: {
				meterNo: "04 123 4567",
				phase: "single", // ['single', 'three', '', '']
				type: "pre-paid", // ['conventional', 'pre-paid']
			},
		},
		grv: {
			purchaseOrderNo: "XRT 1234",
			supplierName: "Conlog",
			supplierContactNo: "081 726 1234",
			supportingDocs: "", // these will be images/scans of POs etc
		},
	},
];
