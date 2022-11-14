import React, { useContext } from "react";
import { PoContext } from "../../../contexts/PoContext";
import "./poi.css";

const PoiBtnAddItem = props => {
	// console.log(`props`, props);
	const { poItemsInContext } = useContext(PoContext);
	console.log(`poItemsInContext`, poItemsInContext);

	const handleAddItem = e => {
		e.preventDefault();
		const res = props.api.applyTransaction({
			add: [poItemsInContext],
		});
	};

	return (
		<button className="btnPoi btnPoiBtnAddItem" onClick={handleAddItem}>
			+
		</button>
	);
};;

export default PoiBtnAddItem;
