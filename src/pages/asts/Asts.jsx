import React from "react";
import "./asts.css";
import { useParams } from "react-router-dom";
import Tabs from "../../components/tabs/Tabs";
import { astsData } from "../../data/astsData/astsData";

const Asts = () => {
	const { ml2 } = useParams();
	// console.log(`ml2: ${ml2}`);
	return (
		<div className="asts">
			<Tabs
				tableData={astsData}
				tabName="Assets"
				ml1={"asts"}
				ml2={ml2}
				ml3={""}
			/>
		</div>
	);
};

export default Asts;
