import React from "react";
import "./TableAddRecordBtn.css";
import { newSplFormData } from "../../../data/adminData/adminData";
import useModal from "../../../hooks/useModal";
import { timestamp } from "../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../hooks/useAuthContext";


const TableAddRecordBtn = () => {
	const { openModal } = useModal();
const { user } = useAuthContext();
	const handleClick = e => {
		e.preventDefault();
		openModal({
			modalName: "splForm",
			payload: {
				...newSplFormData,
				metaData: {
					...newSplFormData.metaData,
					createdAtDatetime: timestamp.fromDate(new Date()),
					createdByUser: user.displayName,
				},
			},
		});
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			id="splForm"
			className="tableAddRecordBtn btn"
		>
			+
		</button>
	);
};

export default TableAddRecordBtn;
