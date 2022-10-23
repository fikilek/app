import React, { useState, useEffect, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import useOpenModal from "../modals/useOpenModal";
import { UserContext } from "../../contexts/UserContext";
import moment from "moment";

const TableBtnTrnSelect = ({ params }) => {
	const { modalToOpen } = useOpenModal();
	// console.log(`params`, params);
	// console.log(`ast state`, params.data.astState);
	const { astStateNames, newTrnData } = useSelector(state => state.admin);
	// console.log(`newTrnData`, newTrnData);
	// console.log(`astStateNames`, astStateNames);
	const [status, setStatus] = useState("");
	const [newTrn, setNewTrn] = useState({});
	const { user } = useContext(UserContext);
	// console.log(`user`, user)

	const memoizedNewTrnData = useMemo(() => newTrnData, [newTrnData]);
	// console.log(`memoizedNewTrnData`, memoizedNewTrnData);

	useEffect(() => {
		setNewTrn(() => memoizedNewTrnData);
	}, [memoizedNewTrnData]);
	// console.log(`newTrn`, newTrn);

	// find the all possible transactions from existing asset state
	const possibleTrns =
		astStateNames &&
		astStateNames.find(item => item.name === params.data.astData.astState);
	// console.log(`possibleTrns`, possibleTrns)

	// get the array of possbie

	const changeStatus = e => {
		setStatus(e.target.value);

		// console.log(`newTrn`, newTrn);
		const newTransactionData = JSON.stringify({
			...newTrn,
			metaData: {
				...newTrn.metaData,
				trnType: e.target.value,
				createdByUser: `${user.name} ${user.surname}`,
				updatedByUser: `${user.name} ${user.surname}`,
				createdAtDatetime: moment(new Date()).format("YYYY-MM-DD HH:mm"),
			},
		});

		if (e.target.value === "choose") {
			return;
		} else {
			// prepare new trn form data. New Trn form data must be sent to the TrnForm ready for dispaly
			// console.log(`e`, e.target.value);
			// console.log(`status`, status);
			// console.log(`new trn param data`, e.target.getAttribute("data-new-trn"));
			modalToOpen("trnForm", newTransactionData);
		}
	};

	// console.log(`status`, status);

	return (
		<>
			<select
				data-new-trn={JSON.stringify({
					...newTrnData,
					trnType: status,
					createdByUser: `${user.name} ${user.surname}`,
					updatedByUser: `${user.name} ${user.surname}`,
				})}
				value={status}
				onChange={changeStatus}
				className="btn-table-row btn-trn-select"
			>
				{/* <option value="choose">choose trn</option> */}
				{possibleTrns.possibleTrns &&
					possibleTrns.possibleTrns.map(trn => {
						return (
							<option key={trn} value={trn}>
								{trn}
							</option>
						);
					})}
			</select>
		</>
	);
};

export default TableBtnTrnSelect;
