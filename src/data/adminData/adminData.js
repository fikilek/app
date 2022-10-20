
import { format } from "date-fns";
import { nanoid } from "nanoid";

const astStateNames = [
	{
		id: -1,
		name: "supplier",
		possibleTrns: ["grv"],
		abrv: "sup",
		definition: "supplier",
	},
	{
		id: 0,
		name: "stores",
		possibleTrns: ["installation", "missing", "return to supplier"],
		abrv: "str",
		definition: "stores",
	},
	{
		id: 1,
		name: "checked out",
		possibleTrns: ["missing", "check in"],
		abrv: "cho",
		definition: "",
	},
	{
		id: 2,
		name: "field",
		possibleTrns: ["comissioning"],
		abrv: "fld",
		definition: "field",
	},
	{
		id: 3,
		name: "service",
		possibleTrns: [
			"disconnection",
			"audit",
			"inspection",
			"vending",
			"decomissioning",
			"missing",
		],
		abrv: "",
		definition: "service",
	},
	{
		id: 4,
		name: "disconnected",
		possibleTrns: ["reconnection"],
		abrv: "",
		definition: "disconnected",
	},
	{
		id: 5,
		name: "missing",
		possibleTrns: ["found"],
		abrv: "",
		definition: "missing",
	},
];

const trnNames = [
	{ id: 1, name: "goods receiving", abrv: "grv", definition: "good receiving" },
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
		trnType: null, //['grv', 'ins', 'com', 'ven', 'mis', 'fnd', '', '', '', '', ]
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
	grv: {
		purchaseOrderNo: "",
		supplierName: "",
		supplierContactNo: "",
		supportingDocs: "",
  },
  actionTaken: {

  },
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

export { astStateNames, trnNames, unpData, unpRoles, unpStates, newTrnData };
