import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Signin from "../../components/forms/authForms/Signin";
import Signout from "../../components/forms/authForms/Signout";
import Signup from "../../components/forms/authForms/Signup";
import ForgottenPassword from "../../components/forms/authForms/ForgottenPassword";
import TrnForm from "../../components/forms/trnForms/TrnForm";
import "./modal.css";
import PoForm from "../forms/poForms/PoForm";
import PoiTable2 from "../../pages/sch/PoiTable2";
import UserSignature from "../userSignature/UserSignature";
import PoInvPop from "../../pages/sch/PoInvPop";

const Modal = () => {
	const { componentToOpen, setComponentToOpen, modalOpened, setModalOpened } =
		useContext(ModalContext);
	// console.log(`modalOpened`, modalOpened);

	const { modalName, payload } = componentToOpen;
	// console.log(`modalName`, modalName)
	// console.log(`payload`, payload);

	const handleClick = e => {
		// console.log(`modal background clicked`, e.target);
		if (e.target.id === "modal-background") {
			// console.log(`closing modal`)
			setModalOpened(null);
			setComponentToOpen({
				modalName: '',
				payload: {},
			});
		}
	};

	return (
		<div
			className={
				modalOpened
					? "modal-container modal-showModal"
					: "modal-container modal-hideModal"
			}
		>
			<div
				className="modal-background"
				id="modal-background"
				onClick={handleClick}
			>
				<div className="modal-payload">
					<div className="modal-body">
						<>{modalName === "signin" ? <Signin /> : ""}</>
						<>{modalName === "signout" ? <Signout /> : ""}</>
						<>{modalName === "signup" ? <Signup /> : ""}</>
						<>{modalName === "fpw" ? <ForgottenPassword /> : ""}</>
						<>{modalName === "trnForm" ? <TrnForm /> : ""}</>
						{/* <>{modalName === "poForm" ? <PoForm formData={payload} /> : ""}</> */}
						<>{modalName === "poForm" ? <PoForm formData={payload} /> : ""}</>
						<>
							{modalName === "userSignature" ? <UserSignature formData={payload} /> : ""}
						</>
						<>{modalName === "poInvPop" ? <PoInvPop po={payload.po} /> : ""}</>
						{/* <>{modalName === "existingPoForm" ? <PoForm formData={payload} /> : ""}</> */}

						<>
							{modalName === "poiTable" ? (
								// <Table ml1={"poi"} otherData={{ id: payload }} />
								<PoiTable2 rowData={payload.rowData} columnDefs={payload.columnDefs} />
							) : (
								""
							)}
						</>

					</div>

					<div className="modal-footer"></div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
