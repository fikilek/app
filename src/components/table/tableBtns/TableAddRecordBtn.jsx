import React from "react";
import "./TableAddRecordBtn.css";
import * as adminData from "../../../data/adminData/adminData";
import useModal from "../../../hooks/useModal";
import { timestamp } from "../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../hooks/useAuthContext";

const TableAddRecordBtn = props => {
	// console.log(`props`, props)
	// nfd means 'newFormData'
	// fn means 'formName'
	const { nfd, fn } = props;
	// console.log(`nfd`, nfd)
	// console.log(`fn`, fn)
	// console.log(`adminData`, adminData)
	const { openModal } = useModal();
	const { user } = useAuthContext();
	const newFormData = adminData[nfd];
	// console.log(`newFormData`, newFormData);

	const handleClick = e => {
		e.preventDefault();
		openModal({
			modalName: fn,
			payload: {
				...newFormData,
				metaData: {
					...newFormData.metaData,
					createdAtDatetime: timestamp.fromDate(new Date()),
					createdByUser: user.displayName,
					updatedAtDatetime: timestamp.fromDate(new Date()),
					updatedByUser: user.displayName,
				},
			},
		});
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			id={fn}
			className="tableAddRecordBtn btn"
		>
			+
		</button>
	);
};

export default TableAddRecordBtn;
