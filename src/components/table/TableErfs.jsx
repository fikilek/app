import React, { memo, useEffect, useMemo, useState } from "react";
import { timestamp } from "../../firebaseConfig/fbConfig";
import { useAstCategories } from "../../hooks/useAstCategories";
import useAuthContext from "../../hooks/useAuthContext";
import useCollection from "../../hooks/useCollection";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import useModal from "../../hooks/useModal";
import Table from "./Table";
import "./Table.css";
import TableAddRecordBtn from "./tableBtns/TableAddRecordBtn";

const showTableAddRecordBtn = (ml1, ml2, ml3, nfd, fn) => {
	if (ml1 === "asts" || ml1 === "trns") return null;
	return <TableAddRecordBtn nfd={nfd} fn={fn} />;
};

const trnOptions = [
	{ key: "choose", value: "choose" },
	{ key: "audit", value: "audit" },
	{ key: "inspection", value: "inspection" },
	{ key: "installation", value: "installation" },
];

// create a trn for each row {metaData, erfData, tranData}
const getNewTrnsArray = (selectedRows, trnType, user, astCategoriesArray) => {
	// console.log(`selectedRows`, selectedRows)
	const trns = [];

	const astData = {}
	// leave astData empty so that on creation of installation trn, there is no ast present on trn. asts must only be added on checkout

	// astCategoriesArray && astCategoriesArray.forEach(astCat => {
	// 	astData[astCat] = []
	// })
	// console.log(`astData`, astData)

	if (selectedRows.lenght === 0) return trns;

	if (selectedRows) {
		selectedRows.map(row => {
			const trn = {
				metaData: {
					createdAtDatetime: timestamp.fromDate(new Date()),
					createdByUser: user.displayName,
					updatedAtDatetime: timestamp.fromDate(new Date()),
					updatedByUser: user.displayName,
					trnHistory: 0, // how many times transaction has been updated
					trnType: trnType, //['installation', 'inspection', 'audit']
					trnNo: "",
					trnState: 'draft'
				},
				erfData: row,
				astData: astData,
			};
			return trns.push(trn);
		});
		// console.log(`trns`, trns)
		return trns;
	}
};

const TableErfs = props => {
	// console.log(`props`, props);
	
	const [trnType, setTrnType] = useState("");
	// console.log(`trnType`, trnType);

	const [selectedRows, setSelectedRows] = useState([]);
	// console.log(`selectedRows`, selectedRows);

	const { openModal } = useModal();
	const { user } = useAuthContext();
	const {astCategoriesArray} = useAstCategories()

	// tn means tableName
	// nfd means newFormData
	// fn means formName
	const { ml1, tn, ml3, nfd, fn } = props;
	// const tableName = useMemo(() => {
	// 	return getTableName(ml1, tn, ml3);
	// }, [ml1, tn, ml3]);
	// console.log(`tableName`, tableName);

	const {
		data: rowData,
		error,
		isPending,
		success,
	} = useCollection(ml1, tn, ml3);
	// const rowData = useMemo(()=>{return data},[data])
	// console.log(`rowData`, rowData);

	const { tableFields: columnDefs } = useColumnDefs({
		ml1,
		ml2: tn,
		ml3,
	});

	const createNewTrns = () => {
		// console.log(`trnType`, trnType);
		if (trnType) {
			// open a modal to preview the new trns only of there is trnType. The new trn btn is diabled if no trn type is selected

			// step 1: prepare trn data from the slected rows
			const newTrnsArray = getNewTrnsArray(
				selectedRows,
				trnType,
				user,
				astCategoriesArray
			);
			// console.log(`newTrnsArray`, newTrnsArray);
			// step 2: open the modal. It wil be from the modal that the new trns will be sent to firebase
			openModal({
				modalName: "tableTrnsFromErfs",
				payload: { newTrnsArray, trnType },
			});
		}
	};

	// console.log(`columnDefs`, columnDefs);
	// console.log(`isPending`, isPending);
	// console.log(`success`, success);
	// console.log(`error`, error);

	useEffect(() => {
		setTrnType("choose");
	}, []);

	return (
		<div className={`table ${tn}`}>
			<div className="table-header">
				<div className="th-menu-levels">
					<p>Erfs</p>
				</div>
				<div className="trn-selection">
					<button
						disabled={trnType === "choose" ? true : false}
						onClick={createNewTrns}
					>
						New Transaction
					</button>
					<select
						value={trnType}
						onChange={e => setTrnType(e.target.value)}
						placeholder="Store Name"
					>
						{trnOptions &&
							trnOptions.map(trn => {
								return (
									<option key={trn.key} value={trn.value}>
										{trn.value}
									</option>
								);
							})}
					</select>
				</div>
				<div className="views">
					<button className="views-btn table-views">Table Views</button>
					<button className="views-btn views map-view">Map Views</button>
					<button className="views-btn views tree-view">Tree Views</button>
				</div>
			</div>
			<Table
				rowData={rowData}
				columnDefs={columnDefs}
				setSelectedRows={setSelectedRows}
			/>
			{showTableAddRecordBtn(ml1, tn, ml3, nfd, fn)}
		</div>
	);
};
export default TableErfs;
