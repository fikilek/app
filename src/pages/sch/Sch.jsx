import React from "react";
import MenuAddPoBtn from "../../components/navbar/menuBtns/MenuAddPoBtn.";
import useCollection from "../../hooks/useCollection";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import PoTable from "./PoTable";

// Sch is a page component
const Sch = () => {
	const { data: rowData, error, isPending } = useCollection("pos");
	// console.log(`rowData`, rowData)
	const { poTableFields: columnDefs } = useColumnDefs({
		ml1: "pos"
	});
	// console.log(`columnDefs`, columnDefs);

	return (
		<div className="sch">
			<PoTable rowData={rowData} columnDefs={columnDefs} />
			<MenuAddPoBtn />
		</div>
	);
};
export default Sch;
