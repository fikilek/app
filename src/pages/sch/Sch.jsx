import React from "react";
import GrvTestAddAstBtn from "../../components/forms/grvForm/grvTest/GrvTestAddAstBtn";
import GrvTestTable from "../../components/forms/grvForm/grvTest/GrvTestTable";
import MenuAddPoBtn from "../../components/navbar/menuBtns/MenuAddPoBtn.";
import Table from "../../components/tabs/table/Table";

// Sch is a page component
const Sch = () => {
	return (
		<div className="sch">
			<Table ml1={"sch"} ml2={''} ml3={''} />
			<MenuAddPoBtn />
			{/* <GrvTestTable /> */}
			{/* <GrvTestAddAstBtn />  */}
		</div>
	);
};
export default Sch;
