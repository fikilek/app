import React, { useContext, useState } from "react";
import "../forms.css";
import { MdCheck, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { ModalContext } from "../../../contexts/ModalContext";

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const Signout = () => {
	const { setModalOpened } = useContext(ModalContext);
	const { user, setUser } = useContext(UserContext);

	const navigate = useNavigate();

	const handleSignoutKeepBtn = e => {
		// dont close the window but remove or close modal
		setModalOpened(false); //Close modal
	};

	const handleSignoutCloseBtn = e => {
		// sign user out, close modal and navigate to Home
		setUser({ ...user, signedon: false }); //logout user
		setModalOpened(false); //Close modal
		navigate("/", { replace: true });
	};

	return (
		<div className="signin-container">
			<div className="signout">
				<h1>Thanks for using iREPS</h1>
				<div className="signout-confirm-btns">
					<Tooltip
						// options
						title="Cancel Signout and continue working"
						position="bottom"
						// trigger="click"
					>
						<button
							className="close-btn"
							id="signout-keep"
							onClick={handleSignoutKeepBtn}
						>
							<MdClose />
						</button>
					</Tooltip>

					<Tooltip
						// options
						title="Signout and exit the application"
						position="bottom"
						// trigger="click"
					>
						<button
							className="close-btn"
							id="signout-close"
							onClick={handleSignoutCloseBtn}
						>
							<MdCheck />
						</button>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default Signout;
