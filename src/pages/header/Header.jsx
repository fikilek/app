import React, { useContext, useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { FaRubleSign } from "react-icons/fa";
import "./header.css";
import { NavLink, Outlet } from "react-router-dom";
import SignedInMenu from "../../components/navbar/signedIn/SignedInMenu";
import SignedOutMenu from "../../components/navbar/signedOut/SignedOutMenu";
import Modal from "../../components/modals/Modal";
import { UserContext } from "../../contexts/UserContext";
import { MenuContext } from "../../contexts/MenuContext";
import useAuthContext from "../../hooks/useAuthContext";

const Header = () => {
	const { menuStatus, setMenuStatus } = useContext(MenuContext);
	const {user} = useAuthContext()
	// console.log(`user`, user);

	return (
		<div className="app-container">
			<header>
				{/* <div className="container"> */}
				<nav>
					<div className="logo">
						<NavLink to="/">
							<FaRubleSign />
						</NavLink>
					</div>
					{user ? <SignedInMenu /> : <SignedOutMenu />}
					<div className="menu-icons" onClick={() => setMenuStatus(!menuStatus)}>
						{menuStatus ? <MdMenu /> : <MdClose /> }
					</div>
				</nav>
			</header>
			<div className="pages">
				<Outlet />
			</div>
		</div>
	);
};

export default Header;

// TODO: Introduce React Router
