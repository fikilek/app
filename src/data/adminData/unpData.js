import { format } from "date-fns";
import { useEffect, useState } from "react";

export const unpTableData = [
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
	},
];

export const unpRoles = [
	{ id: 1, name: "superuser", definition: "" },
	{ id: 2, name: "admin", definition: "" },
	{ id: 3, name: "manager", definition: "" },
	{ id: 4, name: "supervisor", definition: "" },
	{ id: 5, name: "fieldWorker", definition: "" },
];

export const unpStates = [
	{ id: 1, name: "trial", definition: "" },
	{ id: 2, name: "basic", definition: "" },
	{ id: 3, name: "advance", definition: "" },
	{ id: 4, name: "guest", definition: "" },
];


