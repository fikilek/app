import React, { useContext } from "react";
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

const SignedInMenu = () => {
	const { setWindowToOpen, setOpen } = useContext(ModalContext);
	const { menuStatus, setMenuStatus } = useContext(MenuContext);

	const handleClick = e => {
		setWindowToOpen(e.target.id);
		setOpen(true);
	};
	return (
		<ul
			className={`nav-list ${menuStatus ? "show" : "hide"}`}
			onClick={() => setMenuStatus(false)}
		>
			{/* Dashboard */}
			<MenuBlock menuData={dataDbd} />
			{/* Assets */}
			<MenuBlock menuData={dataAsts} />
			{/* Transactions */}
			<MenuBlock menuData={dataTrns} />
			{/* Erfs */}
			<MenuBlock menuData={dataErfs} />
			{/* Body of Knowledge (Bok) */}
			<MenuBlock menuData={dataBok} />
			{/* Admin */}
			<MenuBlock menuData={dataAdmin} />
			{/* Unp */}
			<li className="btn  move-right">
				<NavLink to="/unp">FK</NavLink>
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
		</ul>
	);
};

export default SignedInMenu;
