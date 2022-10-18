import React, { useContext } from "react";
import { useSelector } from "react-redux";
import useOpenModal from "../../modals/useOpenModal";
import CreatedAtLocation from "../../tableBtns/CreatedAtLocation";
import TableBtnTrnSelect from "../../tableBtns/TableBtnTrnSelect";

const useTableFields = () => {
	const { modalToOpen } = useOpenModal();
	const { admin } = useSelector(state => state);
	// console.log(`admin`, admin);
	const { trnNames } = admin;
	// console.log(`trnNames`, trnNames);

	const openModal = e =>
		modalToOpen(e.target.id, e.target.getAttribute("data-trn-id"));

	const astTableFields = [
		{ field: "astSystemId", headerName: "System Id", initialWidth: 120 },
		{ field: "assetData.astCartegory", headerName: "Ast Cartegory", width: 140 },
		{
			field: "assetData.assetNo",
			headerName: `Asset No`,
			width: 160,
			cellRenderer: p =>
				p.value ? (
					<button className="btn-table-row btn-serial-no">{p.value}</button>
				) : (
					""
				),
		},
		{
			field: "assetData.astState",
			headerName: "Ast State",
			width: 140,
			cellRenderer: p => (
				<button className="btn-table-row btn-ast-state">{p.value}</button>
			),
		},
		{
			field: "metaData.trnCount",
			headerName: "Trn Count",
			width: 120,
			cellRenderer: p => (
				<button className="btn-table-row btn-trn-count">{p.value}</button>
			),
		},
		{
			field: "newTrn",
			width: 140,
			cellRenderer: p => <TableBtnTrnSelect params={p} />,
		},
		{
			field: "metaData.createdAtDatetime",
			headerName: "Date Created",
			width: 180,
		},
		{ field: "metaData.createdByUser", headerName: "Created By", width: 180 },
		{
			field: "metaData.createdThrough",
			headerName: "Trn That Created Ast",
			width: 160,
		},
		{ field: "metaData.updatedAtDatetime", headerName: "Updated At Datetime" },
		{ field: "metaData.updatedByUser", headerName: "Updated By" },
	];

	const trnTableFields = [
		{
			// CLick on a btn on this opens a trnasaction form
			field: "systemId",
			width: 120,
			cellRenderer: p => {
				// console.log(`p.data`, p.data);
				return (
					<button
						id="trnForm"
						data-trn-id={JSON.stringify(p.data)}
						className="btn-table-row btn-system-id"
						onClick={openModal}
					>
						{p.value}
					</button>
				);
			},
		},
		{ field: "trnType", width: 120 },
		{
			// CLick on a btn on this opens an asset
			field: "astSerialNo",
			width: 180,
			cellRenderer: p => {
				// console.log(`p`, p)
				return (
					<button
						id="astForm"
						data-trn-id={JSON.stringify(p.data)}
						className="btn-table-row btn-linked-ast-serial-no"
						onClick={openModal}
					>
						{p.data.asset.serialNo}
					</button>
				);
			},
		},
		{
			field: "astCartegory",
			width: 150,
			cellRenderer: p => p.data.asset.astCartegory,
		},
		{
			// CLick on a btn on this opens a table with all updates on this trtansaction. THis comes from trnHistory table
			field: "trnHistory",
			width: 130,
			cellRenderer: p => (
				<button className="btn-table-row btn-trn-history">{p.value}</button>
			),
		},
		{ field: "updatedAtDatetime" },
		{
			// CLick on a btn on this opens a map tab showing where the asset is located on the map
			field: "updatedAtLocation",
			width: 160,
			cellRenderer: CreatedAtLocation,
		},
		{ field: "updatedByUser", width: 190 },
		{ field: "createdAtDatetime" },
		{
			// CLick on a btn on this opens a map tab showing where the asset is located on the map
			field: "createdAtLocation",
			width: 160,
			cellRenderer: CreatedAtLocation,
		},
		{ field: "createdByUser", minWidth: 150 },
		// { field: "asset" },
	];

	return { astTableFields, trnTableFields };
};

export default useTableFields;
