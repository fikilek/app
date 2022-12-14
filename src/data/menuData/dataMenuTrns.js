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
				to: "/trns/feeder",
				menu: "Feeders",
				"menu-level": "2",
				icon: null,
				children: [
					// The children is always a "Ul" element followed by 'li'
					{
						to: "/trns/feeder/asr",
						menu: "asr",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/feeder/installation",
						menu: "Installations",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/feeder/Comissioning",
						menu: "Comissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/feeder/decomissioning",
						menu: "Decomissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/feeder/audit",
						menu: "Audit/Inspection",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/feeder/missing",
						menu: "Missing",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/feeder/found",
						menu: "Found",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/feeder/back-to-supplier",
						menu: "Back to Suppler",
						"menu-level": "2",
						icon: null,
						children: null,
					},
				],
			},
			{
				to: "/trns/pole",
				menu: "Poles",
				"menu-level": "2",
				icon: null,
				children: [
					// The children is always a "Ul" element followed by 'li'
					{
						to: "/trns/pole/asr",
						menu: "asr",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/pole/installation",
						menu: "Installations",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/pole/Comissioning",
						menu: "Comissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/pole/decomissioning",
						menu: "Decomissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/pole/audit",
						menu: "Audit/Inspection",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/pole/missing",
						menu: "Missing",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/pole/found",
						menu: "Found",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/pole/back-to-supplier",
						menu: "Back to Suppler",
						"menu-level": "2",
						icon: null,
						children: null,
					},
				],
			},
			{
				to: "/trns/box",
				menu: "Boxes",
				"menu-level": "2",
				icon: null,
				children: [
					// The children is always a "Ul" element followed by 'li'
					{
						to: "/trns/box/asr",
						menu: "asr",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/box/installation",
						menu: "Installations",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/box/Comissioning",
						menu: "Comissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/box/decomissioning",
						menu: "Decomissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/box/audit",
						menu: "Audit/Inspection",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/box/missing",
						menu: "Missing",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/box/found",
						menu: "Found",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/box/back-to-supplier",
						menu: "Back to Suppler",
						"menu-level": "2",
						icon: null,
						children: null,
					},
				],
			},
			{
				to: "/trns/meter",
				menu: "Meters",
				"menu-level": "2",
				icon: null,
				children: [
					// The children is always a "Ul" element followed by 'li'
					{
						to: "/trns/meter/asr",
						menu: "asr",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/meter/installation",
						menu: "Installations",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/meter/Comissioning",
						menu: "Comissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/meter/decomissioning",
						menu: "Decomissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/meter/disconnection",
						menu: "Disconnection",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/meter/reconnection",
						menu: "Reconnection",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/meter/audit",
						menu: "Audit/Inspection",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/meter/vending",
						menu: "Vending",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/meter/missing",
						menu: "Missing",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/meter/found",
						menu: "Found",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/meter/back-to-supplier",
						menu: "Back to Suppler",
						"menu-level": "2",
						icon: null,
						children: null,
					},
				],
			},
			{
				to: "/trns/cb",
				menu: "cb",
				"menu-level": "2",
				icon: null,
				children: [
					// The children is always a "Ul" element followed by 'li'
					{
						to: "/trns/cb/asr",
						menu: "asr",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/cb/installation",
						menu: "Installations",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/cb/Comissioning",
						menu: "Comissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/cb/decomissioning",
						menu: "Decomissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/cb/audit",
						menu: "Audit/Inspection",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/cb/missing",
						menu: "Missing",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/cb/found",
						menu: "Found",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/cb/back-to-supplier",
						menu: "Back to Suppler",
						"menu-level": "2",
						icon: null,
						children: null,
					},
				],
			},
			{
				to: "/trns/seal",
				menu: "Seals",
				"menu-level": "2",
				icon: null,
				children: [
					// The children is always a "Ul" element followed by 'li'
					{
						to: "/trns/seal/asr",
						menu: "asr",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/seal/installation",
						menu: "Installations",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/seal/Comissioning",
						menu: "Comissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/seal/decomissioning",
						menu: "Decomissioning",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/seal/audit",
						menu: "Audit/Inspection",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/seal/missing",
						menu: "Missing",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/seal/found",
						menu: "Found",
						"menu-level": "2",
						icon: null,
						children: null,
					},
					{
						to: "/trns/seal/back-to-supplier",
						menu: "Back to Suppler",
						"menu-level": "2",
						icon: null,
						children: null,
					},
				],
			},
		],
	},
];
