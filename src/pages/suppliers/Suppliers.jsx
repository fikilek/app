import React from "react";
import './Suppliers.css'
import useCollection from "../../hooks/useCollection";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import Table from '../../components/table/Table'
import TableAddRecordBtn from "../../components/table/tableBtns/TableAddRecordBtn";

// Suppliers is a page component
const Suppliers = () => {
	const { data: rowData, error, isPending } = useCollection("suppliers");
	// console.log(`rowData`, rowData)
	const { splTableFields: columnDefs } = useColumnDefs({
		ml1: "suppliers",
	});
	// console.log(`columnDefs`, columnDefs);

	return (
		<div className="suppliers">
			<Table rowData={rowData} columnDefs={columnDefs} />
			<TableAddRecordBtn />
		</div>
	);
};
export default Suppliers;
