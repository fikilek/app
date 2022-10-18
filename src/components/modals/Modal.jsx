import React, { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";
// import AstForm from "../../pages/asts/astForm/AstForm";
// import AstMapView from "../../pages/asts/astMapView/AstsMapView";
import Signin from "../../pages/auth/Signin";
import Signout from "../../pages/auth/Signout";
import Signup from "../../pages/auth/Signup";
import ForgottenPassword from "../../pages/auth/ForgottenPassword";
import TrnForm from '../../pages/trns/trnForm/TrnForm'
// import ViewOnMap from "../tabs/tabsTable/viewOnMap/ViewOnMap";
import "./modal.css";

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
						{/* <>{name === "astForm" ? <AstForm /> : ""}</> */}
					</div>

					<div className="modal-footer"></div>
				</div>
			</div>
		</div>
	);
};

export default Modal;