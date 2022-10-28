import React, { useContext } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import "../navbar.css";

const MenuAddPoBtn = () => {
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);

	const handleClick = e => {
		setComponentToOpen({
			...componentToOpen,
			name: e.target.id,
		});
		setModalOpened(true);
	};

	return (
		<button onClick={handleClick} id="poForm" className="menuAddPoBtn btn">
			+
		</button>
	);
};

export default MenuAddPoBtn;
