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
			field: "trnSystemId",
			headerName: "System Id",
			width: 240,
			cellRenderer: p => {
				// console.log(`p.data`, p.data);
				return (
					<button
						id="trnForm"
						data-trn-id={JSON.stringify(p.data)}
						className="btn-table-row btn-system-id"
						onClick={openModal}
					>
						{p.data.trnSystemId}
					</button>
				);
			},
		},
		{ field: "metaData.trnType", headerName: "Trn Type", width: 140 },
		{
			// CLick on a btn on this opens an asset
			field: "assetData.serialNo",
			headerName: "Serial No",
			width: 180,
			cellRenderer: p => {
				// console.log(`p`, p);
				return (
					<button
						id="astForm"
						data-trn-id={JSON.stringify(p.data)}
						className="btn-table-row btn-linked-ast-serial-no"
						onClick={openModal}
					>
						{p.data.assetData.serialNo}
					</button>
				);
			},
		},
		{
			field: "assetData.astCartegory",
			headerName: "Ast Cartegory",
			width: 150,
			cellRenderer: p => p.data.assetData.astCartegory,
		},
		{
			// CLick on a btn on this opens a table with all updates on this trtansaction. THis comes from trnHistory table
			field: "metaData.trnHistory",
			headerName: "Trn History",
			width: 130,
			cellRenderer: p => (
				<button className="btn-table-row btn-trn-history">
					{p.data.metaData.trnHistory}
				</button>
			),
		},
		{
			field: "metaData.updatedAtDatetime",
			headerName: "Updated At Datetime",
			width: 180,
		},
		{
			// CLick on a btn on this opens a map tab showing where the asset is located on the map
			field: "metaData.updatedAtLocation",
			headerName: "Updated At Location",
			width: 160,
			cellRenderer: CreatedAtLocation,
		},
		{
			field: "metaData.updatedByUser",
			headerName: "Updated By User",
			width: 190,
		},
		{
			field: "metaData.createdAtDatetime",
			headerName: "Date Created",
			width: 180,
		},
		{
			// CLick on a btn on this opens a map tab showing where the asset is located on the map
			field: "metaData.createdAtLocation",
			headerName: "Created At Location",
			width: 160,
			cellRenderer: CreatedAtLocation,
		},
		{ field: "metaData.createdByUser", headerName: "Created By", width: 180 },
		// { field: "asset" },
	];

	return { astTableFields, trnTableFields };
};

export default useTableFields;
