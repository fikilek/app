import React from "react";
import "./asts.css";
import { useParams } from "react-router-dom";
import Tabs from "../../components/tabs/Tabs";
import { astsData } from "../../data/astsData/astsData";

const Asts = () => {
	const { ml2, ml3 } = useParams();
	// console.log(`Asts ml2: ${ml2}`);
	// console.log(`Asts ml3: ${ml3}`);
	return (
		<div className="asts">
			<Tabs
				ml1={"asts"}
				ml2={ml2}
				ml3={ml3}
			/>
		</div>
	);
};

export default Asts;
