import React, { useContext, useEffect, useState } from "react";
import "./SignedInMenu.css";
import MenuBlock from "../MenuBlock";
import { dataBok } from "../../../data/menuData/dataMenuBox";
import { dataErfs } from "../../../data/menuData/dataMenuErfs";
import { dataUnp } from "../../../data/menuData/dataMenuUnp";
import { dataTrns } from "../../../data/menuData/dataMenuTrns";
import { dataAsts } from "../../../data/menuData/dataMenuAsts";
import { dataAdmin } from "../../../data/menuData/dataMenuAdmin";
import { dataDbd } from "../../../data/menuData/dataMenuDbd";
import { NavLink } from "react-router-dom";
import { ModalContext } from "../../../contexts/ModalContext";
import { MenuContext } from "../../../contexts/MenuContext";
import { UserContext } from "../../../contexts/UserContext";

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { dataSch } from "../../../data/menuData/dataMenuSch";
import useAuthContext from "../../../hooks/useAuthContext";

const SignedInMenu = () => {
	// console.log(`SignedInMenu rendering`);

	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	const { menuStatus, setMenuStatus } = useContext(MenuContext);
	const { user } = useAuthContext();
	let words = user.displayName;
	// console.log(`words`, words);
	words = words.split(" ");
	const name = words[0];
	const surname = words[1];
	// }

	const handleClick = e => {
		setComponentToOpen({
			...componentToOpen,
			name: e.target.id,
		});
		setModalOpened(true);
	};
	return (
		<ul
			className={`nav-list ${menuStatus ? "hide-nav-list" : "show-nav-list"}`}
			onClick={() => setMenuStatus(false)}
		>
			<div className="nav-list-left">
				{/* Dashboard */}
				<MenuBlock menuData={dataDbd} />
				{/* Assets */}
				<MenuBlock menuData={dataAsts} />
				{/* Transactions */}
				<MenuBlock menuData={dataTrns} />
				{/* Supply Chain */}
				<MenuBlock menuData={dataSch} />
				{/* Erfs */}
				<MenuBlock menuData={dataErfs} />
				{/* Body of Knowledge (Bok) */}
				<MenuBlock menuData={dataBok} />
			</div>

			<div className="nav-list-right">
				{/* Admin */}
				<MenuBlock menuData={dataAdmin} />
				{/* User */}
				<li className="nav-list-btn-signedin-user">
					<Tooltip title={`${user.displayName}`} position="left">
						<NavLink to="/unp" className="user-initials">
							{user ? `${name[0]}${surname[0]}` : `??`}
						</NavLink>
					</Tooltip>
					<ul className="sub-menu">
						<li>
							<NavLink to="/unp/profile">Profile</NavLink>
						</li>

						<li>
							<a href="#" onClick={handleClick} id="signout">
								Sign out
							</a>
						</li>
					</ul>
				</li>
			</div>
		</ul>
	);
};

export default SignedInMenu;
