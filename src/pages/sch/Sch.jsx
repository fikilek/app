import React from "react";
import MenuAddPoBtn from "../../components/navbar/menuBtns/MenuAddPoBtn.";
import Table from "../../components/tabs/table/Table";

// Sch is a page component
const Sch = () => {
	return (
		<div className="sch">
			<Table ml1={"sch"} ml2={''} ml3={''} />
			<MenuAddPoBtn />
		</div>
	);
};

export default Sch;
