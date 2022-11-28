import React from "react";
import "./asts.css";
import { useParams } from "react-router-dom";
import Tabs from "../../components/tabs/Tabs";
// import { astsData } from "../../data/astsData/astsData";
import AstsTable from "./AstsTable";
import useGetAstsData from "./hooks/useGetAstsData";
import TestAstsTable from "./hooks/TestAstsTable";

const Asts = () => {
	const { ml2, ml3 } = useParams();
	// console.log(`ml2`, ml2);
	// console.log(`ml3`, ml3);
	const { getAstsData } = useGetAstsData(ml2, ml3);
	const { rowData, columnDefs } = getAstsData();

	// const storeState = store.getState();
	// console.log(`storeState`, storeState);

	return (
		<div className="asts">
			{/* <AstsTable rowData={rowData} columnDefs={columnDefs} /> */}
			{/* <Tabs ml1={"asts"} ml2={ml2} ml3={ml3} /> */}
			<TestAstsTable />
		</div>
	);
};

export default Asts;
