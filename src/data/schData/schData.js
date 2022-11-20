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
			poInv: [
				{
					inv: "inv-1",
				},
			], // Invoice sent by the supplier
			poPop: [
				{
					pop: "pop-1",
				},
				{
					pop: "pop-2",
				},
			], // Proof of Payment for the invoice paid
			poGrv: {
				grvSystemId: "",
				grvFormId: "",
				grvStatus: "No Grv", // ['Created', 'Confirmed', 'Witnessed']
				grvConfirmReceipt: {
					grvcrStatus: true, // This must be changed through a password
					grvcrSurname: "",
					grvcrName: "",
					grvcrContactNo: "",
					grvcrContactEmailAdr: "",
				},
				grvWitnessReceipt: {
					grvwrStatus: true, // This must be changed through a password
					grvwrSurname: "",
					grvwrName: "",
					grvwrContactNo: "",
					grvwrContactEmailAdr: "",
				},
				grvComments: [], // [{date: date, msg: msg, user: user}]
				rgvMedia: {
					grvPhotos: [],
					grvVideos: [],
					grvVoice: [],
				},
			}, // Goods received. THis should correspond to the items in the PO.
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
			poInv: [], // Invoice sent by the supplier
			poPop: [], // Proof of Payment for the invoice paid
			// poGrv: 'x',
			poGrv: {
				grvSystemId: "",
				grvFormId: "",
				grvStatus: "Created", // ['Created', 'Confirmed', 'Witnessed']
				grvConfirmReceipt: {
					grvcrStatus: false, // This must be changed through a password
					grvcrSurname: "",
					grvcrName: "",
					grvcrContactNo: "",
					grvcrContactEmailAdr: "",
				},
				grvWitnessReceipt: {
					grvwrStatus: false, // This must be changed through a password
					grvwrSurname: "",
					grvwrName: "",
					grvwrContactNo: "",
					grvwrContactEmailAdr: "",
				},
				grvComments: [], // [{date: date, msg: msg, user: user}]
				rgvMedia: {
					grvPhotos: [],
					grvVideos: [],
					grvVoice: [],
				},
			}, // Goods received. THis should correspond to the items in the PO.
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
			poInv: [
				{
					inv: "inv-1",
				},
			], // Invoice sent by the supplier
			poPop: [
				{
					pop: "pop-1",
				},
				{
					pop: "pop-2",
				},
				{
					pop: "pop-3",
				},
			], // Proof of Payment for the invoice paid
			poGrv: {
				grvSystemId: "",
				grvFormId: "",
				grvStatus: "Created", // ['Created', 'Confirmed', 'Witnessed']
				grvConfirmReceipt: {
					grvcrStatus: true, // This must be changed through a password
					grvcrSurname: "",
					grvcrName: "",
					grvcrContactNo: "",
					grvcrContactEmailAdr: "",
				},
				grvWitnessReceipt: {
					grvwrStatus: false, // This must be changed through a password
					grvwrSurname: "",
					grvwrName: "",
					grvwrContactNo: "",
					grvwrContactEmailAdr: "",
				},
				grvComments: [], // [{date: date, msg: msg, user: user}]
				rgvMedia: {
					grvPhotos: [],
					grvVideos: [],
					grvVoice: [],
				},
			}, // Goods received. THis should correspond to the items in the PO.
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
