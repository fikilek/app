import React, { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";
import ForgottenPassword from "../../pages/auth/ForgottenPassword";
import Signin from "../../pages/auth/Signin";
import Signout from "../../pages/auth/Signout";
import Signup from "../../pages/auth/Signup";
import "./modal.css";

const Modal = () => {
	const { windowToOpen, setWindowToOpen, open, setOpen } =
		useContext(ModalContext);
	// const user = useContext(UserContext);
	// console.log(`user`, user);

	// useEffect(() => {
	// 	if (windowToOpen === "signup" || windowToOpen === "signin") {
	// 		setOpen(true);
	// 	} else {
	// 		setOpen(false);
	// 	}
	// }, [windowToOpen, setOpen]);

	const handleClick = e => {
		// console.log(`modal backgr?ound clicked`, e.target.id);
		if (e.target.id === "modal-background") {
			setOpen(false);
			setWindowToOpen("");
		}
	};

	return (
		<div
			className={
				open ? "modal-container modal-showModal" : "modal-container modal-hideModal"
			}
		>
			<div
				className="modal-background"
				id="modal-background"
				onClick={handleClick}
			>
				<div className="modal-payload">
					{/* <div className="modal-header"> */}
					{/* <div className="modal-name">{windowToOpen} Modal</div>
						<button className="modal-name-btn" onClick={handleClick}>
							<MdClose />
						</button> */}
					{/* </div> */}

					<div className="modal-body">
						<>{windowToOpen === "signin" ? <Signin /> : ""}</>
						<>{windowToOpen === "signout" ? <Signout /> : ""}</>
						<>{windowToOpen === "signup" ? <Signup /> : ""}</>
						<>{windowToOpen === "fpw" ? <ForgottenPassword /> : ""}</>
						{/* <>{windowToOpen === "trnForm" ? <TrnForm /> : ""}</> */}
					</div>

					{/* <div className="modal-footer"></div> */}
				</div>
			</div>
		</div>
	);
};

export default Modal;
