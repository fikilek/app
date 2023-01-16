import React, { useContext } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import "../navbar.css";
import {newPoFormData } from '../../../data/adminData/adminData'

const MenuAddPoBtn = () => {
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);

	const handleClick = e => {
		setComponentToOpen({
			...componentToOpen,
			name: "poForm",
			payload: newPoFormData,
		});
		setModalOpened(true);
	};

	return (
		<button type="button" onClick={handleClick} id="poForm" className="menuAddPoBtn btn">
			+
		</button>
	);
};

export default MenuAddPoBtn;
