import { format, parseISO } from "date-fns";
import moment from "moment";

export const astsData = [
	{
		astSystemId: 1,
		metaData: {
			serialNo: "123 4567",

			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			createdByUser: "fikile kentane ",
			createdThrough: "goods receiving",
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			updatedByUser: "fikile kentane",
			trnCount: 1, //grv,
		},

		assetData: {
			serialNo: "123 4567", // for meters-meter no
			assetNo: "04 123 4567",
			astCartegory: "meter", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
			astState: "stores",
			meter: {
				phase: "single", // ['single', 'three', '', '']
				type: "pre-paid", // ['conventional', 'pre-paid']
			},
		},
	},
];
