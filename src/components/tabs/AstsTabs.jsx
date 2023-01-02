import React, { useState } from "react";
import "./tabs.css";
import Table from "./table/Table";
import TabsMap from "./tabsMap/TabsMap";
import TabsTree from "./tabsTree/TabsTree";
import AstsTable from "../../pages/asts/AstsTable";

const AstsTabs = ({ rowData, columnDefs }) => {
	const [active, setActive] = useState("tabs-table");
	// console.log(`tableData`, tableData)

	// console.log(`Tabs ml1`, ml1);
	// console.log(`Tabs ml2`, ml2);
	// console.log(`Tabs ml3`, ml3);

	const handleTabClick = e => {
		// console.log(`e.target.id`, e.target.id)
		setActive(e.target.id);
	};

	return (
		<div className="tabs">
			<div className="tabs-header">
				<div
					className={`tabs-header-table ${
						active === "tabs-table" ? "tab-active" : ""
					} tabs-tab`}
					id="tabs-table"
					onClick={handleTabClick}
				>
					Table
				</div>
				<div
					className={`tabs-header-map ${
						active === "tabs-map" ? "tab-active" : ""
					} tabs-tab`}
					id="tabs-map"
					onClick={handleTabClick}
				>
					Map
				</div>
				<div
					className={`tabs-header-tree ${
						active === "tabs-tree" ? "tab-active" : ""
					} tabs-tab`}
					id="tabs-tree"
					onClick={handleTabClick}
				>
					Tree
				</div>
				<div className="tab-name"></div>
			</div>
			<div className="tabs-body">
				<div
					className={`tabs-body-content tabs-table ${
						active === "tabs-table" ? "tabs-show" : "tabs-hide"
					}  `}
					id="tabs-table"
				>
					<AstsTable rowData={rowData} columnDefs={columnDefs} />
				</div>
				<div
					className={`tabs-body-content tabs-map ${
						active === "tabs-map" ? "tabs-show" : "tabs-hide"
					} `}
					id="tabs-map"
				>
          {/* <AstsTabsMap rowData={rowData} colData={colData} /> */}
				</div>
				<div
					className={`tabs-body-content tabs-tree ${
						active === "tabs-tree" ? "tabs-show" : "tabs-hide"
					} `}
					id="tabs-tree"
				>
          {/* <AstsTabsTree rowData={rowData} colData={colData} /> */}
				</div>
			</div>
		</div>
	);
};

export default AstsTabs;
