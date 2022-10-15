import React, { useContext, useState } from "react";
import "./auth.css";
import {
	FaFacebookF,
	FaGoogle,
	FaLinkedinIn,
	FaTwitter,
	FaUser,
	FaVoicemail,
} from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import irepsImage2 from "../../images/irepsImage1.jpg";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../contexts/MenuContext";
import { unpTableData as unpData } from "../../data/adminData/unpData";

const initSigninData = {
	email: "",
	password: "",
};

const ForgottenPassword = () => {
	// user credentials comprise of user email and password
	const [userCredentials, setUserCredentials] = useState(initSigninData);

	// Fpw is the Forgotten Password section
	const [emailFpw, setEmailFpw] = useState("");

	// show controlls which of the signin or forgotten password form is displayed
	const [show, setShow] = useState(true);

	// this section sontrols the display of the modal
	const { setWindowToOpen, setOpen } = useContext(ModalContext);
	const { menuStatus, setMenuStatus } = useContext(MenuContext);
	const { user, setUser } = useContext(UserContext);

	const navigate = useNavigate();

	const handleModalCloseBtn = e => {
		setOpen(false);
		setWindowToOpen("");
	};

	const handleSignup = e => {
		setWindowToOpen("signup");
		setOpen(true);
	};

	const handleSignin = e => {
		setWindowToOpen("signin");
		setOpen(true);
	};

	const handleSigninSubmit = e => {
		e.preventDefault();
			console.log(`user cfpw-footersigninredentials: `, emailFpw);
	};

	return (
		<div className="fpw-container">
			{/* fpw header */}
			<div className="fpw-header">
				<div className="fpw-header-title-img">
					<h1 className="fpw-header-title">Forgotten Password</h1>
					<img src={irepsImage2} alt="ireps fpw images" className="fpw-img" />
				</div>
				<div className="fpw-header-close-btn" onClick={handleModalCloseBtn}>
					<div className="btn-div" id="btn-div">
						<button>X</button>
					</div>
				</div>
			</div>

			{/* fpw form */}
			<form className="fpw-form" onSubmit={handleSigninSubmit}>
				<div className="form-field form-field-email">
					{/* email fiels */}
					<span className="form-field-icon">
						<FaUser />
					</span>
					<input
						type="email"
						name="emailFpw"
						id="emailFpw"
						value={emailFpw}
						onChange={e => setEmailFpw(e.target.value)}
						placeholder="enter email used for signin"
					/>
				</div>
				<div className="form-btns">
					<button className="form-btn Clear" onClick={e => setEmailFpw("")}>
						Clear
					</button>
					<button className="form-btn reset" onClick={e => setEmailFpw("")}>
						Reset
					</button>
					<button className="form-btn submit">Submit</button>
				</div>{" "}
			</form>

			{/* fpw footer */}
			<div className="fpw-footer">
				<div className="fpw-footer-signup">
					<a href="#" onClick={handleSignup} className="fpw-footer-signup-link">
						Sign up
					</a>
				</div>
				<div className="fpw-footer-remembered-pwd">
					<a
						href="#"
						onClick={handleSignin}
						className="fpw-footer-remembered-pwd-link"
					>
						Remembered password?
					</a>
				</div>
			</div>
		</div>
	);
};
export default ForgottenPassword;
