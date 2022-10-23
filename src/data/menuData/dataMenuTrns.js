import { MdArrowDropDown, MdArrowRight } from "react-icons/md";

export const dataTrns = [
	{
		// This is an "li" element.
		to: "/trns",
		menu: "Trns",
		"menu-level": "1",
		icon: <MdArrowDropDown />,
		children: [
			// The children is always a "Ul" element followed by 'li'
			{
				to: "/trns/goods-receiving",
				menu: "grv",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/trns/installation",
				menu: "Installations",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/trns/Comissioning",
				menu: "Comissioning",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/trns/decomissioning",
				menu: "Decomissioning",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/trns/disconnection",
				menu: "Disconnection",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/trns/reconnection",
				menu: "Reconnection",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/trns/audit",
				menu: "Audit/Inspection",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/trns/vending",
				menu: "Vending",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/trns/missing",
				menu: "Missing",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/trns/found",
				menu: "Found",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/trns/back-to-supplier",
				menu: "Back to Suppler",
				"menu-level": "2",
				icon: null,
				children: null,
			},
		],
	},
];
