import React, { useContext, useEffect, useState } from "react";
import "./auth.css";
import {
	FaFacebookF,
	FaGoogle,
	FaLinkedinIn,
	FaTwitter,
	FaUser,
	FaVoicemail,
} from "react-icons/fa";
import {
	MdEmail,
	MdManageAccounts,
	MdPassword,
	MdPattern,
	MdPerson,
	MdPersonAddAlt,
	MdPersonAddAlt1,
	MdWork,
} from "react-icons/md";
import irepsImage2 from "../../images/irepsImage1.jpg";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const userObj = {
	surname: "",
	name: "",
	email: "",
	role: "guest",
	password: "",
	confirmPassword: "",
	signedon: false,
};

const Signup = () => {

	const [userCredentials, setUserCredentials] = useState(userObj);
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	const { user, setUser } = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		setUserCredentials(userObj);
	}, []);

	const handleModalCloseBtn = e => {
		setModalOpened(false);
		setComponentToOpen({
			...componentToOpen,
			name: "",
		});
	};

	const handleSignupSubmit = e => {
		e.preventDefault();
		console.log(`Signup userCredentials data: `, userCredentials);
		setUser({ ...userCredentials, signedon: true });
		setModalOpened(false);
		navigate("/unp", { replace: true });
	};

	const handleSignin = e => {
		setComponentToOpen({
			...componentToOpen,
			name: "signin",
		});
		setModalOpened(true);
	};

	const handleReset = e => {
		e.preventDefault();
		setUserCredentials(userObj);
	};

	const handleFieldChange = e => {
		setUserCredentials({
			...userCredentials,
			[e.target.id]: e.target.value,
		});
	};

	return (
		<div className="signup-container">

			{/* signup header */}
			<div className="signup-header">
				<div className="signup-header-title-img">
					<h1 className="signup-header-title">Sign up</h1>
					<img src={irepsImage2} alt="ireps signup images" className="signup-img" />
				</div>
				<div className="signup-header-close-btn" onClick={handleModalCloseBtn}>
					<div className="btn-div" id="btn-div">
						<button>X</button>
					</div>
				</div>
			</div>

			{/* signup form */}
			<form className={`signup-form`} onSubmit={handleSignupSubmit}>
				{/* form field surname */}
				<div className="form-field form-field-surname">
					<span className="form-field-icon">
						<MdPersonAddAlt1 />
					</span>
					<input
						autoFocus
						type="text"
						name="surname"
						id="surname"
						value={userCredentials.surname}
						onChange={handleFieldChange}
						placeholder="surname"
					/>
				</div>
				{/* form field name */}
				<div className="form-field form-field-name">
					<span className="form-field-icon">
						<MdPersonAddAlt />
					</span>
					<input
						type="text"
						name="name"
						id="name"
						value={userCredentials.name}
						onChange={handleFieldChange}
						placeholder="name"
					/>
				</div>
				{/* form field email */}
				<div className="form-field form-field-email">
					<span className="form-field-icon">
						<MdEmail />
					</span>
					<input
						type="email"
						name="email"
						id="email"
						value={userCredentials.email}
						onChange={handleFieldChange}
						placeholder="enter email used for signup"
					/>
				</div>
				{/* form field role */}
				<div className="form-field form-field-role">
					<span className="form-field-icon">
						<MdManageAccounts />
					</span>
					<input
						readOnly
						type="text"
						name="role"
						id="role"
						value={userCredentials.role}
						onChange={handleFieldChange}
						placeholder="role"
					/>
				</div>
				{/* form field password */}
				<div className="form-field form-field-password">
					<span className="form-field-icon">
						<MdPassword />
					</span>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						value={userCredentials.password}
						onChange={handleFieldChange}
					/>
				</div>
				{/* form field confirm password */}
				<div className="form-field form-field-confirm-password">
					<span className="form-field-icon">
						<MdPattern />
					</span>
					<input
						type="password"
						name="confirm-password"
						id="confirmPassword"
						placeholder="Confirm Password"
						value={userCredentials.confirmPassword}
						onChange={handleFieldChange}
					/>
				</div>
				<div className="form-btns">
					<button className="form-btn Clear" onClick={handleReset}>
						Clear
					</button>
					<button className="form-btn reset" onClick={handleReset}>
						Reset
					</button>
					<button className="form-btn submit">Submit</button>
				</div>{" "}
			</form>

			{/* signup footer */}
			<div className="signup-footer">
				<a href="#" onClick={handleSignin} className="signup-footer-signin-link">
					Already Registered? Sign in
				</a>
			</div>

		</div>
	);
};
export default Signup;
