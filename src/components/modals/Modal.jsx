import React, { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/PoContext";
// import AstForm from "../../pages/asts/astForm/AstForm";
// import AstMapView from "../../pages/asts/astMapView/AstsMapView";
import Signin from "../../components/forms/authForms/Signin";
import Signout from "../../components/forms/authForms/Signout";
import Signup from "../../components/forms/authForms/Signup";
import ForgottenPassword from "../../components/forms/authForms/ForgottenPassword";
import TrnForm from "../../components/forms/trnForms/TrnForm";
// import ViewOnMap from "../tabs/table/viewOnMap/ViewOnMap";
import "./modal.css";
import PoForm from "../forms/poForms/PoForm";
import Table from "../tabs/table/Table";
import WarningPoStatusModifier from "../forms/poForms/WarningPoStatusModifier";
import GrvForm from "../forms/grvForm/GrvForm";
import GrvAddToStoreWarning from "../forms/grvForm/GrvAddToStoreWarning";
import GrvTestForm from "../forms/grvForm/grvTest/GrvTestForm";

const Modal = () => {
	const { componentToOpen, setComponentToOpen, modalOpened, setModalOpened } =
		useContext(ModalContext);

	const { name, payload } = componentToOpen;

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
						<>{name === "poForm" ? <PoForm /> : ""}</>
						<>{name === "grvForm" ? <GrvForm formData={payload} /> : ""}</>
						<>{name === "existingPoForm" ? <PoForm formData={payload} /> : ""}</>
						<>
							{name === "addGoodsToStore" ? (
								<GrvAddToStoreWarning data={payload} />
							) : (
								""
							)}
						</>
						<>
							{name === "grvTestForm" ? <GrvTestForm /> : ""}
						</>
						<>
							{name === "poItemsTable" ? (
								<Table ml1={"poi"} otherData={{ poSystemId: payload }} />
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
