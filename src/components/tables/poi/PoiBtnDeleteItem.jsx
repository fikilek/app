import { useContext } from "react";
import { PoContext } from "../../../contexts/PoContext";
import "./poi.css";

const PoiBtnDeleteItem = props => {
	const { poItemsInContext, setPoItemsInContext } = useContext(PoContext);

	const handleDeleteItem = e => {
		e.preventDefault();
		const selectedNode = props.api.getSelectedNodes();
		const selectedData = props.api.getSelectedRows();
		const res = props.api.applyTransaction({ remove: selectedData });
		const newPoItemsInContext =
			poItemsInContext &&
			poItemsInContext.filter((item, index) => Number(index) !== Number(selectedNode[0].id))
		setPoItemsInContext(newPoItemsInContext);
	};

	return (
		<button className="btnPoi btnPoiDeleteItem" onClick={handleDeleteItem}>
			x
		</button>
	);
};

export default PoiBtnDeleteItem;
