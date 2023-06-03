import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import useAuthContext from "../../hooks/useAuthContext";
import useModal from "../../hooks/useModal";
import { astStateNames, newTrnData } from "../../data/adminData/adminData.js";
import FormikControl from "../forms/formComponents/formik/FormikControl";
import { Form, Formik } from "formik";
import { timestamp } from "../../firebaseConfig/fbConfig";

const TableBtnTrnSelect = params => {
	// console.log(`params.data`, params.data);
	const { user } = useAuthContext();
	const { astState, astCartegory, astNo } = params.data.astData;
	// const { astData } = params.data;
	const { openModal } = useModal();
	// console.log(`newTrnData`, newTrnData);
	// console.log(`astStateNames`, astStateNames);
	// console.log(`astState`, astState);
	// console.log(`astCartegory`, astCartegory);
	// console.log(`astNo`, astNo);

	const [newTrn, setNewTrn] = useState(newTrnData);

	useEffect(() => {
		// console.log(`uesEffect to set newTRn`);
		// console.log(`params.data`, params.data);
		setNewTrn({
			...newTrnData,
			metaData: {
				...newTrnData.metaData,
				createdAtDatetime: timestamp.fromDate(new Date()),
				createdByUser: user.displayName,
				updatedAtDatetime: timestamp.fromDate(new Date()),
				updatedByUser: user.displayName,
			},
			astData: { ...params.data.astData, id: params.data.id },
		});

		return () => {
			// console.log(`unmounting component`);
			setNewTrn({});
		};
	}, [params, user]);

	// find the all possible transactions from existing asset state
	const possibleTrns =
		astStateNames && astStateNames.find(item => item.name === astState);
	// console.log(`possibleTrns`, possibleTrns);
	const pTrns = possibleTrns.possibleTrns;
	// console.log(`pTrns`, pTrns);

	// get the array of possbie

	const handleChange = e => {
		// console.log(`e.target.value`, e.target.value);
		// console.log(`newTrn`, newTrn);
		setNewTrn(prev => {
			return {
				...prev,
				metaData: {
					...prev.metaData,
					trnType: e.target.value,
				},
			};
		});
	};

	const openNewTrn = () => {
		// console.log(`newTrn`, newTrn);
		if (newTrn.metaData.trnType) {
			openModal({
				modalName: "trnForm",
				payload: newTrn,
			});
		}
	};

	// console.log(`possibleTrns.possibleTrns`, possibleTrns.possibleTrns);
	// console.log(`newTrn`, newTrn);

	return (
		<>
			<button className="table-row-btn" onClick={openNewTrn}>NT</button>
			<select
				value={newTrn.metaData.trnType}
				onChange={handleChange}
				placeholder="Store Name"
			>
				{pTrns[astCartegory] &&
					pTrns[astCartegory].map(trn => {
						return (
							<option key={trn.key} value={trn.value}>
								{trn.value}
							</option>
						);
					})}
			</select>
		</>
	);
};

export default TableBtnTrnSelect;
