import { MdArrowDropDown, MdArrowRight } from "react-icons/md";

export const dataAsts = [
	{
		// This is an "li" element.
		to: "/asts",
		menu: "Asts",
		"menu-level": "1",
		icon: <MdArrowDropDown />,
		children: [
			// The children is always a "Ul" element followed by 'li'
			{
				to: "/asts/feeders",
				menu: "Feeders",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/asts/poles",
				menu: "Poles",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/asts/boxes",
				menu: "Boxes",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/asts/meters",
				menu: "Meters",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/asts/cbs",
				menu: "CBs",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/asts/seals",
				menu: "Seals",
				"menu-level": "2",
				icon: null,
				children: null,
			},
		],
	},
];
