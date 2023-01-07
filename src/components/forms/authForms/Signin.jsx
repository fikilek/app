import React, { useContext, useState } from "react";
import "../forms.css";
import {
	FaFacebookF,
	FaGoogle,
	FaLinkedinIn,
	FaTwitter,
	FaUser,
	FaVoicemail,
} from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import irepsImage2 from "../../../images/irepsImage1.jpg";
import { ModalContext } from "../../../contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../../contexts/MenuContext";
import { useSignin } from "../../../hooks/useSignin";

const initSigninData = {
	email: "",
	password: "",
};

const Signin = () => {
	// user credentials comprise of user email and password
	const [userCredentials, setUserCredentials] = useState(initSigninData);

	// this section sontrols the display of the modal
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	const { menuStatus, setMenuStatus } = useContext(MenuContext);

	const { signin, error, isPending } = useSignin();

	const navigate = useNavigate();

	const handleModalCloseBtn = e => {
		setComponentToOpen({
			...componentToOpen,
			name: "",
		});
		setModalOpened(false);
	};

	const handleSignup = e => {
		setComponentToOpen({
			...componentToOpen,
			name: "signup",
		});
		setModalOpened(true);
	};

	const handleFpw = e => {
		setComponentToOpen({
			...componentToOpen,
			name: "fpw",
		});
		setModalOpened(true);
	};

	const handleSigninSubmit = e => {
		e.preventDefault();
		signin(userCredentials);
		// console.log(`signin error`, error)
		if (!error) {
			setModalOpened(false);
			setMenuStatus(false);
			navigate("/unp", { replace: true });
		} 
	};

	return (
		<div className="signin-container">
			{/* signin header */}
			<div className="signin-header">
				<div className="signin-header-title-img">
					<h1 className="signin-header-title">Sign in</h1>
					<img src={irepsImage2} alt="ireps signin images" className="signin-img" />
				</div>
				<div className="signin-header-close-btn" onClick={handleModalCloseBtn}>
					<div className="btn-div" id="btn-div">
						<button>X</button>
					</div>
				</div>
			</div>

			{/* signin form */}
			<form className={`signin-form`} onSubmit={handleSigninSubmit}>
				<div className="form-field form-field-email">
					<span className="form-field-icon">
						<MdEmail />
					</span>
					<input
						autoFocus
						type="email"
						name="email"
						id="email"
						value={userCredentials.email}
						onChange={e => {
							setUserCredentials({
								...userCredentials,
								[e.target.name]: e.target.value,
							});
						}}
						placeholder="enter email used for signin"
					/>
				</div>
				<div className="form-field form-field-password">
					<span className="form-field-icon">
						<MdPassword />
					</span>
					<input
						type="password"
						name="password"
						id="pwd"
						placeholder="Password"
						value={userCredentials.password}
						onChange={e => {
							setUserCredentials({
								...userCredentials,
								[e.target.name]: e.target.value,
							});
						}}
					/>
				</div>
				<div className="auth-error-field">
					<p className="auth-error">{error && error}</p>
				</div>
				<div className="form-btns">
					<button
						className="form-btn Clear"
						onClick={e => setUserCredentials(initSigninData)}
					>
						Clear
					</button>
					<button className="form-btn submit">Submit</button>
				</div>
			</form>

			{/* signin footer */}
			<div className="signin-footer">
				<div className="signin-footer-signup">
					<a
						id="signup"
						href="#"
						onClick={handleSignup}
						className="signin-footer-signup-link"
					>
						Not Registered, Sign up
					</a>
				</div>
				<div className="signin-footer-fpw">
					<a
						id="fpw"
						href="#"
						onClick={handleFpw}
						className="signin-footer-forgotten-link"
					>
						Forgot password?
					</a>
				</div>
			</div>
		</div>
	);
};
export default Signin;
