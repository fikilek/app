import React, { useContext, useEffect } from "react";
import MenuBlock from "../MenuBlock";
import { dataBok } from "../../../data/menuData/dataMenuBox";
import { dataErfs } from "../../../data/menuData/dataMenuErfs";
import { ModalContext } from "../../../contexts/ModalContext";
import { MenuContext } from "../../../contexts/MenuContext";

const SignedOutMenu = () => {
	const { setWindowToOpen, setOpen } = useContext(ModalContext);
	const { menuStatus, setMenuStatus } = useContext(MenuContext);

	const handleClick = e => {
		// Open a modal window
		setWindowToOpen(e.target.id);
		setOpen(true)
	};

	const handleClickOnNavList = e => {
		// console.log(`nav-list clicked : menuStatus : ${menuStatus}` )
		if (menuStatus) {
			// console.log(`about to change menyStatus`)
			setMenuStatus(false)
			// console.log(`menuStatus changed to : ${menuStatus}`)
		} 
	} 

	return (
		<ul
			className={`nav-list ${menuStatus ? "show" : ""}`}
			onClick={handleClickOnNavList}
		>
			{/* Erfs */}
			<MenuBlock menuData={dataErfs} />
			{/* Body of Knowledge (Bok) */}
			<MenuBlock menuData={dataBok} classes={"expand"} />
			{/* Sign up */}
			{/* <MenuBlock menuData={dataSignUp} classes={"btn  move-right"} /> */}
			<li className="btn  move-right">
				<a href="#" onClick={handleClick} id="signup">
					Sign up
				</a>
			</li>
			{/* Sign in */}
			{/* <MenuBlock menuData={dataSignIn} classes={"btn  move-right"} /> */}
			<li className="btn  move-right">
				<a href="#" onClick={handleClick} id="signin">
					Sign in
				</a>
			</li>
		</ul>
	);
};

export default SignedOutMenu;
