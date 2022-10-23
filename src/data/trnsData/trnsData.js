import moment from "moment";
import { nanoid } from "nanoid";

export const trnsData = [
	{
		//this grv transaction creaed a meter into the store
		trnSystemId: 1,
		metaData: {
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedByUser: "fikile kentane",
			updatedAtLocation: null,
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			createdByUser: "fikile kentane",
			createdAtLocation: null,
			trnHistory: 1,
			trnType: "grv", //['grv', 'ins', 'com', 'ven', 'mis', 'fnd', '', '', '', '', ]
		},
		astData: {
			astSerialNo: "123 4567",
			astNo: "04 123 4567",
			astCartegory: "meter", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
			astSystemId: '121',
			meter: {
				phase: "single", // ['single', 'three', '', '']
				type: "pre-paid", // ['conventional', 'pre-paid']
			},
		},
		grv: {
			purchaseOrderNo: "Po No - 1234",
			invoiceNo: "Inv 2345",
			supplierName: "Conlog",
			supplierContactNo: "081 726 1234",
			supportingDocs: "", // these will be images/scans of POs etc
		},
	},
];
