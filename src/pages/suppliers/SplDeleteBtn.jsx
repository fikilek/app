import React from "react";
import { MdDeleteForever } from "react-icons/md";
import useModal from "../../hooks/useModal";

const SplDeleteBtn = params => {
	const iconStyles = { color: "green", fontSize: "1.8rem" };
	const { openModal } = useModal();

	const handleClick = e => {
		e.preventDefault();
		openModal({ modalName: "splForm", payload: params.data });
	};

	return (
		<button className="spl-delete-btn" onClick={handleClick}>
			<MdDeleteForever style={iconStyles} />
		</button>
	);
};

export default SplDeleteBtn;
