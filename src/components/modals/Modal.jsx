import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
// import AstForm from "../../pages/asts/astForm/AstForm";
// import AstMapView from "../../pages/asts/astMapView/AstsMapView";
import Signin from "../../components/forms/authForms/Signin";
import Signout from "../../components/forms/authForms/Signout";
import Signup from "../../components/forms/authForms/Signup";
import ForgottenPassword from "../../components/forms/authForms/ForgottenPassword";
import TrnForm from "../../components/forms/trnForms/TrnForm";
// import ViewOnMap from "../tabs/table/viewOnMap/ViewOnMap";
import "./modal.css";
import WarningPoStatusModifier from "../forms/poForms/WarningPoStatusModifier";
import PoForm2 from "../forms/poForms/PoForm2";
import PoiTable2 from "../../pages/sch/PoiTable2";
import PoAlterState from "../../pages/sch/PoAlterState";
import UserSignature from "../userSignature/UserSignature";

const Modal = () => {
	const { componentToOpen, setComponentToOpen, modalOpened, setModalOpened } =
		useContext(ModalContext);
	// console.log(`modalOpened`, modalOpened);

	const { name, payload } = componentToOpen;
	// console.log(`name`, name)
	// console.log(`payload`, payload);

	const handleClick = e => {
		// console.log(`modal background clicked`, e.target);
		if (e.target.id === "modal-background") {
			// console.log(`closing modal`)
			setModalOpened(null);
			setComponentToOpen({
				name: false,
				payload: {},
			});
			// console.log(`modal closed`);
		} else {
			// console.log(`modal NOT closed`);
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
						<>{name === "signin" ? <Signin /> : ""}</>
						<>{name === "signout" ? <Signout /> : ""}</>
						<>{name === "signup" ? <Signup /> : ""}</>
						<>{name === "fpw" ? <ForgottenPassword /> : ""}</>
						<>{name === "trnForm" ? <TrnForm /> : ""}</>
						{/* <>{name === "poForm" ? <PoForm formData={payload} /> : ""}</> */}
						<>{name === "poForm" ? <PoForm2 formData={payload} /> : ""}</>
						<>
							{name === "userSignature" ? <UserSignature formData={payload} /> : ""}
						</>
						{/* <>{name === "grvForm" ? <GrvForm2 formData={payload} /> : ""}</> */}
						{/* <>{name === "existingPoForm" ? <PoForm formData={payload} /> : ""}</> */}

						<>
							{name === "poiTable" ? (
								// <Table ml1={"poi"} otherData={{ id: payload }} />
								<PoiTable2 rowData={payload.rowData} columnDefs={payload.columnDefs} />
							) : (
								""
							)}
						</>
						<>
							{name === "btnPoStatusModifier" ? (
								<WarningPoStatusModifier payload={payload} />
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
