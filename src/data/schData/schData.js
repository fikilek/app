import moment from "moment";
import { nanoid } from "@reduxjs/toolkit";

export const poData = [
	// purchase order (po) data
	{
		poSystemId: nanoid(),
		poStatus: "Aproved", // ['created', 'approved', 'deleted']
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
			poNo: "Po-1", // Purchase Order No. THis is the begining of the procurment process
			poInv: "0", // Invoice sent by the supplier
			poPop: "0", // Proof of Payment for the invoice paid
			poGrv: "0", // Goods received. THis should correspond to the items in the PO.
		},
		poPi: [
			{
				itemId: 1,
				itemName: "singe phase meter",
				itemCode: "BEC44",
				itemQuantity: 20,
			},
			{
				itemId: 2,
				itemName: "three phase meter",
				itemCode: "BEC66",
				itemQuantity: 5,
			},
		],
		poSplData: {
			splName: "Conlog",
			splContactSurname: "Gina",
			splContactName: "Mondli",
			splContactNo: "081 726 2352",
			splContactEmailAdr: "mondli@conlog.co.za",
		},
	},
	{
		poSystemId: nanoid(),
		poStatus: "Aproved", // ['created', 'approved', 'deleted']
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
			poNo: "Po-2", // Purchase Order No. THis is the begining of the procurment process
			poInv: "0", // Invoice sent by the supplier
			poPop: "0", // Proof of Payment for the invoice paid
			poGrv: "0", // Goods received. THis should correspond to the items in the PO.
		},
		poPi: [
			{
				itemId: 1,
				itemName: "singe phase meter",
				itemCode: "BEC44",
				itemQuantity: 20,
			},
			{
				itemId: 2,
				itemName: "three phase meter",
				itemCode: "BEC66",
				itemQuantity: 5,
			},
			{ itemId: 3, itemName: "mov", itemCode: "mov", itemQuantity: 25 },
		],
		poSplData: {
			splName: "Conlog",
			splContactSurname: "Gina",
			splContactName: "Mondli",
			splContactNo: "081 726 2352",
			splContactEmailAdr: "mondli@conlog.co.za",
		},
	},
	{
		poSystemId: nanoid(),
		poStatus: "Aproved", // ['created', 'approved', 'deleted']
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
			poNo: "Po-3", // Purchase Order No. THis is the begining of the procurment process
			poInv: "0", // Invoice sent by the supplier
			poPop: "0", // Proof of Payment for the invoice paid
			poGrv: "0", // Goods received. THis should correspond to the items in the PO.
		},
		poPi: [
			{
				itemId: 1,
				itemName: "singe phase meter",
				itemCode: "BEC44",
				itemQuantity: 20,
			},
			{
				itemId: 2,
				itemName: "three phase meter",
				itemCode: "BEC66",
				itemQuantity: 5,
			},
			{ itemId: 3, itemName: "mov", itemCode: "mov", itemQuantity: 25 },
			{ itemId: 4, itemName: "mov1", itemCode: "mov1", itemQuantity: 5 },
			{ itemId: 5, itemName: "mov3", itemCode: "mov3", itemQuantity: 10 },
		],
		poSplData: {
			// Supplier data
			splId: 2,
			splName: "Conlog",
			splContactSurname: "Gina",
			splContactName: "Mondli",
			splContactNo: "081 726 2352",
			splContactEmailAdr: "mondli@conlog.co.za",
		},
	},
];

export const splData = [
	// Supplier (spl) data
	{
		splId: 1,
		splName: "Conlog",
		splContactSurname: "Gina",
		splContactName: "Mondli",
		splContactNo: "081 726 2352",
		splContactEmailAdr: "mondli@conlog.co.za",
	},
	{
		splId: 2,
		splName: "Landis",
		splContactSurname: "Fikeni",
		splContactName: "Ali",
		splContactNo: "081 726 2352",
		splContactEmailAdr: "ali@landis.co.za",
	},
];
