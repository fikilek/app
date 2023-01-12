import React, { useContext } from "react";
import { ModalContext } from "../../../../contexts/ModalContext";
import useModal from "../../../../hooks/useModal";

const FormHeader = ({ formData }) => {
	// console.log(`formData`, formData)
	const {clodeModal} = useModal()
	return (
		<div className="form-header">
			<div className="form-header-title">
				<button
					type="button"
					className={`form-header-title-status-btn ${
						formData.poStatus === "Created"
							? "btn-po-table-created"
							: "btn-po-table-approved"
					}`}
				>
					{formData.poStatus}
				</button>

				<h3 className="form-header-title-name">Purchase Order Form</h3>
				{/* <h1 className="form-header-title-form-no">{formData.metaData.formNo}</h1> */}
			</div>
			<div
				className="form-header-close-btn-wrapper"
				onClick={() => clodeModal() }
			>
				<h3 className="form-header-title-form-no">{`Po-${formData.poNo}`}</h3>
				<button type="button">X</button>
			</div>
		</div>
	);
};

export default FormHeader;
