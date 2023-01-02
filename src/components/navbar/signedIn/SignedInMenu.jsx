import React, { useContext } from "react";
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

const SignedInMenu = () => {
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	const { menuStatus, setMenuStatus } = useContext(MenuContext);
	const { user } = useContext(UserContext);

	// console.log(`menuStatus`, menuStatus)

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
			<div className="nav-list-left" >
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

			<div className="nav-list-right" >
				{/* Admin */}
				<MenuBlock menuData={dataAdmin} />
				{/* User */}
				<li className="nav-list-btn-signedin-user">
					<Tooltip title={`${user.name} ${user.surname}`} position="left">
						<NavLink to="/unp" className="user-initials">
							{user ? `${user.name[0]}${user.surname[0]}` : `XX`}
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
