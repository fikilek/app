import React, { memo, useEffect, useMemo, useState } from "react";
import { timestamp } from "../../firebaseConfig/fbConfig";
import { useAstCategories } from "../../hooks/useAstCategories";
import useAuthContext from "../../hooks/useAuthContext";
import useCollection from "../../hooks/useCollection";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import useModal from "../../hooks/useModal";
import { useTrnForm } from "../../hooks/useTrnForm";
import Table from "./Table";
import "./Table.css";
import TableAddRecordBtn from "./tableBtns/TableAddRecordBtn";
import { fsTrnData } from "../forms/formComponents/formSections/fsTrnData";
import { formSects } from "../forms/formComponents/formSections/formSects";

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

// prepare asts for trn by going to th erf and get each ast in the erf and prepare an array of all of them
const getTrnObjectsArray = erf => {
	console.log(`erf`, erf);

	// an erf already has an array of all asts in it. They are in asts property. Go inside asts property and extract needed astData as well as catInstallation ( and catCommissining data if it there).

	// step 1: destructire asts array
	const { asts } = erf;
	console.log(`asts`, asts);

	if(!asts) return null

	// create astData object. THis will go into trn inspection object
	const astData = {};

	// step 2: iterate through asts to get each ast
	asts &&
		asts.forEach(ast => {
			// console.log(`ast---------------------------------`, ast);

			// destructure astId
			const { astId } = ast;
			console.log(`astId`, astId);

			// get astCat from ast
			const astCat = ast.astData.astCartegory;
			// console.log(`astCat`, astCat);

			// get trnData from formSects and insert into ast
			const { trnData } = formSects[astCat].inspection;
			// console.log(`trnData`, trnData);

			// insrt into ast
			ast = {
				...ast,
				trnData
			}

			if (astCat) {
				if (!astData[astCat]) {
					// we dont have astData[astCat], create it
					astData[astCat] = [];
					// console.log(`astData[astCat]`, astData[astCat]);

					// remove trnMetaData rom ast
					delete ast.trnMetaData;
					// console.log(`ast`, ast);

					// push trnObject into astData[astCat]
					astData[astCat].push(ast);
				} else {
					// console.log(`astCat [${astCat}] alrerady EXIST in the mix`);

					// we already have astData[astCat]. Check is astId is already present in astData[astCat].
					const astIdExist = astData[astCat].some(ast => ast.astId === astId);
					if (astIdExist) {
						// There already is astId in the mix
						// console.log(`There is astId`, astId);

						// removeastData and trnMetaData rom ast
						delete ast.trnMetaData;
						delete ast.astData;
						delete ast.astId;
						console.log(`ast`, ast);

						// extract data
						const astTrnName = Object.entries(ast)[0][0];
						// console.log(`astTrnName`, astTrnName);

						// fint the index of the existing astId
						const astIdIndex = astData[astCat].findIndex(ast => ast.astId === astId);
						// console.log(`astIdIndex`, astIdIndex);

						// insert ast into astData.[astCat][index]
						astData[astCat][astIdIndex] = {
							...astData[astCat][astIdIndex],
							[astTrnName]: ast[astTrnName],
							// trnData
						};
						// astData[astCat].with(Number(astIdIndex), ast[`${astCat}Commissioning`] );
						// console.log(`astData[astCat][astIdIndex]`, astData[astCat][astIdIndex]);
						// console.log(`astData[${astCat}]`, astData[astCat]);
					} else {
						// there is no astId yet
						// console.log(`There is NO astId`, astId);
						// push trnObject into astData[astCat]
						astData[astCat].push(ast);
						// console.log(`astData[astCat]`, astData[astCat]);
					}
				}
			}
		});

	// console.log(`astData`, astData);

	return astData;
};

// create a trn for each row {metaData, erfData, tranData}
const getNewTrnsArray = (selectedRows, trnType, user) => {
	// console.log(`selectedRows`, selectedRows);
	const trns = [];

	// console.log(`astData`, astData)

	if (selectedRows.lenght === 0) return trns;

	if (selectedRows) {
		selectedRows.map(row => {
			// if trnType is inspection, get all asts in the erf and create astData for each

			let astData = {};
			if (trnType === "inspection") {
				astData = getTrnObjectsArray(row);
				console.log(`astData`, astData);
				if(!astData) return null 
			}

			// const { astsInErf, astsCount } = trnObjectsArray;
			// console.log(`astsInErf`, astsInErf);
			// console.log(`trnType`, trnType);

			if (
				trnType === "installation" ||
				trnType === "audit" ||
				trnType === "inspection"
			) {
				// console.log(`push trn`);
				const trn = {
					metaData: {
						createdAtDatetime: timestamp.fromDate(new Date()),
						createdByUser: user.displayName,
						updatedAtDatetime: timestamp.fromDate(new Date()),
						updatedByUser: user.displayName,
						trnHistory: 0, // how many times transaction has been updated
						trnType: trnType, //['installation', 'inspection', 'audit']
						trnNo: "",
						trnState: "draft",
					},
					erfData: row,
					astData,
				};
				// console.log(`trn`, trn);
				return trns.push(trn);
			}
		});
		// console.log(`trns`, trns);
		return trns;
	}
};

const TableErfs = props => {
	// console.log(`props`, props);
	const { ml1, tn, ml3, nfd, fn } = props;

	const [trnType, setTrnType] = useState("");
	// console.log(`trnType`, trnType);

	const [selectedRows, setSelectedRows] = useState([]);
	// console.log(`selectedRows`, selectedRows);

	const { openModal } = useModal();
	const { user } = useAuthContext();
	// const { astCategoriesArray } = useAstCategories();

	// tn means tableName
	// nfd means newFormData
	// fn means formName
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

			const newTrnsArray = getNewTrnsArray(selectedRows, trnType, user);
			console.log(`newTrnsArray`, newTrnsArray);

			// console.log(`newTrnsArray`, newTrnsArray);
			// step 2: open the modal. It wil be from the modal that the new trns will be sent to firebase
			if (newTrnsArray.length > 0) {
				openModal({
					modalName: "tableTrnsFromErfs",
					payload: { newTrnsArray, trnType },
				});
			}
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
