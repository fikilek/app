import React from "react";
import "./asts.css";
import { useParams } from "react-router-dom";
import Tabs from "../../components/tabs/Tabs";
// import { astsData } from "../../data/astsData/astsData";
import AstsTable from "./AstsTable";
import useGetAstsData from "./hooks/useGetAstsData";
import TestAstsTable from "./hooks/TestAstsTable";
import { useSelector } from "react-redux";
import AstsTabs from "../../components/tabs/AstsTabs";

const Asts = () => {
	const { ml2, ml3 } = useParams();
	const ml1 = "asts";
	// console.log(`ml2`, ml2);
	// console.log(`ml3`, ml3);
	const { getAstsData } = useGetAstsData(ml1, ml2, ml3);
	const { rowData, columnDefs } = getAstsData();
	// const { astsTestData } = useSelector(state => state.asts);
	// console.log(`astsTestData`, astsTestData);

	// const storeState = store.getState();
	// console.log(`rowData`, rowData);
	// console.log(`columnDefs`, columnDefs);

	return (
		<div className="asts">
			<AstsTable rowData={rowData} columnDefs={columnDefs} />
			{/* <Tabs ml1={"asts"} ml2={ml2} ml3={ml3} /> */}
			{/* <AstsTabs rowData={rowData} columnDefs={columnDefs} /> */}
			{/* <TestAstsTable /> */}
		</div>
	);
};

export default Asts;
