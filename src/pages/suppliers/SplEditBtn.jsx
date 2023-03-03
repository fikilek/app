import React from "react";
import { MdEdit } from "react-icons/md";
import useModal from "../../hooks/useModal";

const SplEditBtn = params => {
	const iconStyles = { color: "green", fontSize: "1.8rem" };
	const { openModal } = useModal();

	const handleClick = e => {
		e.preventDefault();
		openModal({ modalName: "splForm", payload: params.data });
	};

	return (
		<button className="spl-edit-btn" onClick={handleClick}>
			<MdEdit style={iconStyles} />
		</button>
	);
};

export default SplEditBtn;
