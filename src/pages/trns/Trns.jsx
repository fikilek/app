import React from "react";
import './trns.css'
import { useParams } from "react-router-dom";
import Tabs from "../../components/tabs/Tabs";
import { trnsData } from "../../data/trnsData/trnsData";

const Trns = () => {
	const { ml2 } = useParams();
	// console.log(`ml2: ${ml2}`);
	return (
		<div className="asts">
			<Tabs
				tableData={trnsData}
				tabName="Transactions"
				ml1={"trns"}
				ml2={ml2}
				ml3={""}
			/>
		</div>
	);
};

export default Trns;
