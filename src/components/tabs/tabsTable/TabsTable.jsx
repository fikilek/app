import React from "react";
import "./tabsTable.css";

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const TabsTable = ({ tableData, ml1, ml2, ml3 }) => {
	return (
		<>
			<Tooltip
				// options
				title="Welcome to React"
				position="left"
				// trigger="click"
			>
				<span>TabsTable </span>
			</Tooltip>

			<div> {` ml1: ${ml1} `}</div>
			<div className="tabs-table-ml2" data-tooltip="menu level two tooltip" > {` ml2: ${ml2} `}</div>

			<div> {` ml3: ${ml3} `}</div>
		</>
	);
};

export default TabsTable;
