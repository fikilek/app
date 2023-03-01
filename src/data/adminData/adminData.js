import { format } from "date-fns";
import moment from "moment";
import { nanoid } from "@reduxjs/toolkit";
import { getPoSystmeId } from "../../components/tables/poi/poiUtils";
import { timestamp } from "../../firebaseConfig/fbConfig";
import { Timestamp } from "firebase/firestore";

const astStateNames = [
	{
		id: -1,
		name: "supplier",
		possibleTrns: {
			vtct: ["asr"],
			transfomer: ["asr"],
			feeder: ["asr"],
			pole: ["asr"],
			box: ["asr"],
			meter: ["asr"],
			cb: ["asr"],
			seal: ["asr"],
		},
		abrv: "sup",
		definition: "supplier",
	},
	{
		id: 0,
		name: "stores",
		possibleTrns: {
			vtct: ["installation", "missing", "return to supplier"],
			transfomer: ["installation", "missing", "return to supplier"],
			feeder: ["installation", "missing", "return to supplier"],
			pole: ["installation", "missing", "return to supplier"],
			box: ["installation", "missing", "return to supplier"],
			meter: ["installation", "missing", "return to supplier"],
			cb: ["installation", "missing", "return to supplier"],
			seal: ["installation", "missing", "return to supplier"],
		},
		abrv: "str",
		definition: "stores",
	},
	{
		id: 1,
		name: "checked out",
		possibleTrns: {
			vtct: ["missing", "check in"],
			transfomer: ["missing", "check in"],
			feeder: ["missing", "check in"],
			pole: ["missing", "check in"],
			box: ["missing", "check in"],
			meter: ["missing", "check in"],
			cb: ["missing", "check in"],
			seal: ["missing", "check in"],
		},
		abrv: "cho",
		definition:
			"Remove from store. This could be for installation or transfere to another store",
	},
	{
		id: 2,
		name: "field",
		possibleTrns: {
			vtct: ["comissioning", "missing", "check in"],
			transfomer: ["comissioning", "missing", "check in"],
			feeder: ["comissioning", "missing", "check in"],
			pole: ["comissioning", "missing", "check in"],
			box: ["comissioning", "missing", "check in"],
			meter: ["comissioning", "missing", "check in"],
			cb: ["comissioning", "missing", "check in"],
			seal: ["comissioning", "missing", "check in"],
		},
		abrv: "fld",
		definition: "field",
	},
	{
		id: 3,
		name: "service",
		possibleTrns: {
			vtct: ["asr"],
			transfomer: ["audit", "inspection", "decomissioning", "missing"],
			feeder: ["audit", "inspection", "decomissioning", "missing"],
			pole: ["audit", "inspection", "decomissioning", "missing"],
			box: ["audit", "inspection", "decomissioning", "missing"],
			meter: [
				"disconnection",
				"audit",
				"inspection",
				"vending",
				"decomissioning",
				"missing",
			],
			cb: ["audit", "inspection", "decomissioning", "missing"],
			seal: ["audit", "inspection", "decomissioning", "missing"],
		},
		abrv: "srv",
		definition: "service",
	},
	{
		id: 4,
		name: "disconnected",
		possibleTrns: {
			vtct: [""],
			transfomer: [""],
			feeder: [""],
			pole: [""],
			box: [""],
			meter: ["reconnection"],
			cb: [""],
			seal: [""],
		},
		abrv: "dcn",
		definition: "disconnected",
	},
	{
		id: 5,
		name: "missing",
		possibleTrns: {
			vtct: ["found"],
			transfomer: ["found"],
			feeder: ["found"],
			pole: ["found"],
			box: ["found"],
			meter: ["found"],
			cb: ["found"],
			seal: ["found"],
		},
		abrv: "mis",
		definition: "missing",
	},
];

const trnNames = [
	{ id: 1, name: "asr", abrv: "asr", definition: "good receiving" },
	{
		id: 2,
		name: "instalation",
		abrv: "ins",
		definition: "installation of equipment onto the field",
	},
	{ id: 3, name: "comissioning", abrv: "com", definition: "comissioning" },
	{ id: 4, name: "vending", abrv: "ven", definition: "vending" },
	{ id: 5, name: "missing", abrv: "mis", definition: "missing" },
	{ id: 6, name: "found", abrv: "fnd", definition: "found" },
	{ id: 7, name: "disconnected", abrv: "dcn", definition: "" },
	{ id: 8, name: "reconnected", abrv: "rec", definition: "" },
	{ id: 9, name: "audit", abrv: "aud", definition: "" },
	{ id: 10, name: "inspection", abrv: "inp", definition: "" },
	{ id: 11, name: "return", abrv: "ret", definition: "" }, // return to supplier
	{ id: 12, name: "sell", abrv: "sel", definition: "" },
];

const unpData = [
	{
		id: 1,
		surname: "kentane",
		name: "fikile",
		email: "fikilekentane@gmail.com",
		password: "pwd",
		role: "superuser", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "advance", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		dateUpdate: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		signedon: false,
	},
	{
		id: 2,
		surname: "kentane",
		name: "sitha",
		email: "sitha@gmail.com",
		password: "pwd",
		role: "manager", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "basic", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		dateUpdate: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		signedon: false,
	},
	{
		id: 4,
		surname: "kentane",
		name: "siya",
		email: "siya@gmail.com",
		password: "pwd",
		role: "supervisor", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "advance", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		dateUpdate: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		signedon: false,
	},
	{
		id: 5,
		surname: "kentane",
		name: "libo",
		email: "libo@gmail.com",
		password: "pwd",
		role: "fieldWorker", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "guest", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		dateUpdate: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		signedon: false,
	},
	{
		id: 6,
		surname: "Fubu",
		name: "Maljume",
		email: "malume@gmail.com",
		password: "pwd",
		role: "manager", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "guest", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		dateUpdate: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		signedon: false,
	},
	{
		id: 7,
		surname: "Tshikilange",
		name: "Rhu",
		email: "rhu@gmail.com",
		password: "pwd",
		role: "supervisor", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "advance", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: format(new Date("01-05-22"), "yyyy-MMMM-dd HH:MM"),
		dateUpdate: format(new Date(), "yyyy-MMMM-dd HH:MM"),
		signedon: false,
	},
];

const unpRoles = [
	{ id: 1, name: "superuser", definition: "" },
	{ id: 2, name: "admin", definition: "" },
	{ id: 3, name: "manager", definition: "" },
	{ id: 4, name: "supervisor", definition: "" },
	{ id: 5, name: "fieldWorker", definition: "" },
];

const unpStates = [
	{ id: 1, name: "trial", definition: "" },
	{ id: 2, name: "basic", definition: "" },
	{ id: 3, name: "advance", definition: "" },
	{ id: 4, name: "guest", definition: "" },
];

const newTrnData = {
	systemId: nanoid(),
	metaData: {
		updatedAtDatetime: null,
		updatedAtLocation: null,
		updatedByUser: null,
		createdAtDatetime: null,
		createdAtLocation: null,
		createdByUser: null,
		trnHistory: 0,
		trnType: null, //['asr', 'ins', 'com', 'ven', 'mis', 'fnd', '', '', '', '', ]
	},
	assetData: {
		serialNo: "", // for meters-meter no
		astCartegory: "", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
		vtCt: {
			vtCtNo: "",
		},
		meter: {
			meterNo: "",
			phase: "", // ['single', 'three', '', '']
			type: "", // ['conventional', 'pre-paid']
		},
		feeder: {
			feederNo: "",
		},
		box: {
			boxNo: "",
			casingType: "", // ['metal', 'fibre glass', '', '']
			meterHoldingCapacity: "", // how many meters can the box hold
			placement: "", // ['top of pole', 'botttom of pole', 'stand alone', 'wall boundary', 'inside property']
		},
		pole: {
			poleNo: "",
			type: "", // ['metal', 'cement', '']
			length: "",
		},
		transfomer: {
			transformerNo: "",
		},
		seal: {
			sealNo: "",
		},
	},
	customerAdr: {
		erfNo: "",
		complexName: "",
		complexNo: "",
		streetName: "",
		streetNo: "",
		subSuburnOrSubTshipName: "",
		suburbTshipName: "",
		townName: "",
		localMunicipalityName: "",
		provinceName: "",
		contryName: "",
		systemAdr: "",
	},
	billing: {
		accountNo: "",
		indigent: "no", // ['yes', 'no']
		tariff: "",
	},
	customer: {
		cartegory: "", // [owner'', 'occupant']
		type: "", // ['normal (warm body) person', 'jusristic (legal) person']
		warmBody: {
			surmame: "",
			name: "",
			idNo: "",
		},
		jusristicPerson: {
			name: "",
			tradingOrOtherName: "",
			registrationNo: "",
		},
		contactPerson: {
			surname: "",
			name: "",
			landLine: "",
			cellPhoneWhatsapp: "",
			cellPhoneVoice: "",
			email: "",
		},
	},
	asr: {
		purchaseOrderNo: "",
		supplierName: "",
		supplierContactNo: "",
		supportingDocs: "",
	},
	actionTaken: {},
	vending: {
		meter: {
			datetime: "",
			amount: "",
		},
	},
	comissioning: {},
	decomissioning: {},
	disconnection: {
		meter: {
			level: "",
			comments: "",
		},
	},
	reconnection: {
		meter: {
			comments: "",
		},
	},
};

const newPoFormData = {
	poApprove: {
		approveUid: null,
		approveDate: null,
	},
	poNo: 0,
	metaData: {
		updatedAtDatetime: Timestamp.now(),
		updatedByUser: "",
		createdAtDatetime: Timestamp.now(),
		createdByUser: "",
	},
	poData: {
		poInv: [],
		poPop: [], // Proof of Payment
		poGrv: {
			grvReceiver: {
				// This is the person confirms that the goods have been received
				grvReceiverUid: "",
				grvReceiverDate: null,
			},
			grvWitness: {
				// This is the person who has witnessed that the goods have indedd been received
				grvWitnessUid: "",
				grvWitnessDate: null,
			},
			poStoreData: {
				// This is the store where goods reveived are stored
				storeNo: "",
				storeName: "",
				storeContactSurname: "",
				storeContactName: "",
				storeContactNo: "",
				storeContactEmailAdr: "",
			},
		}, // Goods receive,
	},
	poComments: [], // [{date: date, msg: msg, user: user}]
	poMedia: {
		photos: [],
		videos: [],
		voice: [],
	},
	poPi: [],
	poSplData: {
		// Supplier data
		splNo: "",
		splName: "",
		splContactSurname: "",
		splContactName: "",
		splContactNo: "",
		splContactEmailAdr: "",
	},
};

const newPoiFormData = [
	{ poiName: "itemName", poiValue: "", poiPlaceHolder: "item name" },
	{ poiName: "itemCode", poiValue: "", poiPlaceHolder: "item code" },
	{ poiName: "quantity", poiValue: "", poiPlaceHolder: "quantity" },
];

const newPoItem = {
	itemId: nanoid(),
	itemName: "",
	itemCode: "",
	itemQuantity: 0,
};

const stores = [
	{
		storeId: 1,
		storeName: "Smars Jozi Store",
		storeAdr: "15 Petunia Street",
		storeContactSurname: "Kentane",
		storeContactName: "Sitha",
		storeContactNo: "081 726 2352",
		storeContactEmailAdr: "sitha@smars.co.za",
	},
	{
		storeId: 2,
		storeName: "Smars Molteno Store",
		storeAdr: "21 Vessels Street",
		storeContactSurname: "Mqo",
		storeContactName: "Khuthala",
		storeContactNo: "081 726 2352",
		storeContactEmailAdr: "khuthala@smars.co.za",
	},
	{
		storeId: 3,
		storeName: "Smars Sterkstroom Store",
		storeAdr: "EC Street",
		storeContactSurname: "Yedwa",
		storeContactName: "Onani",
		storeContactNo: "081 123 5555",
		storeContactEmailAdr: "onani@smars.co.za",
	},
	{
		storeId: 4,
		storeName: "Smars Hofmyr Store",
		storeAdr: "15 Petunia Street",
		storeContactSurname: "Kentane",
		storeContactName: "Sitha",
		storeContactNo: "081 726 2352",
		storeContactEmailAdr: "sitha@smars.co.za",
	},
	{
		storeId: 5,
		storeName: "Smars Tarkastd Store",
		storeAdr: "15 Petunia Street",
		storeContactSurname: "Kentane",
		storeContactName: "Sitha",
		storeContactNo: "081 726 2352",
		storeContactEmailAdr: "sitha@smars.co.za",
	},
];

const astCartegories = {
	meter: {
		phase: "", // ['single', 'three', '', '']
		type: "", // ['conventional', 'pre-paid']
		code: "", // ['BEC44', 'BEC66', '']
	},
	pole: {},
	box: {},
};

const newSplFormData = {
	splNo: "",
	splName: "",
	splStatus: "",
	metaData: {
		updatedAtDatetime: '',
		updatedByUser: "",
		createdAtDatetime: '',
		createdByUser: "",
	},
	splContactEmailAdr: "",
	splContactSurname: "",
	splContactName: "",
	splContactNo: "",
};

export {
	astStateNames,
	trnNames,
	unpData,
	unpRoles,
	unpStates,
	newTrnData,
	newPoFormData,
	newPoiFormData,
	newPoItem,
	stores,
	astCartegories,
	newSplFormData,
};
