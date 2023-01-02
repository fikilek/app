import { MdArrowDropDown, MdArrowRight } from "react-icons/md";

export const dataAdmin = [
	{
		// This is an "li" element.
		to: "/admin",
		menu: "Admin",
		"menu-level": "1",
		icon: <MdArrowDropDown />,
		"menuSide": "right",
		children: [
			// The children is always a "Ul" element followed by 'li'
			{
				to: "/admin/unps",
				menu: "Users",
				"menu-level": "2",
				icon: "",
				children: null,
			},
			{
				// System tables
				to: "/admin/syst",
				menu: "System Tables",
				"menu-level": "2",
				icon: <MdArrowRight />,
				children: [
					{
						to: "/admin/syst/urs",
						menu: "User Roles",
						"menu-level": "3",
						icon: "",
						children: null,
					},
					{
						to: "/admin/syst/ast-stt",
						menu: "Asset states",
						"menu-level": "3",
						icon: null,
						children: null,
					},
					{
						to: "/admin/syst/trn-stt",
						menu: "Transaction States",
						"menu-level": "3",
						icon: null,
						children: null,
					},
				],
			},
			{
				// Mobile devices
				to: "/admin/mds",
				menu: "Mobile Devices",
				"menu-level": "2",
				icon: "",
				children: null,
			},
			{
				// Simcards
				to: "/admin/smcs",
				menu: "Simcards",
				"menu-level": "2",
				icon: "",
				children: null,
			},
		],
	},
];