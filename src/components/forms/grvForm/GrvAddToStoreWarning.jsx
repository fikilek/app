import React, { useContext } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { Tooltip } from "react-tippy";
import { ModalContext } from "../../../contexts/ModalContext";
import "./grv.css";
import useAddToStore from "./hooks/useAddToStore";

const GrvAddToStoreWarning = ({ data }) => {
	// console.log(`data`, data)
	// GrvAddToStoreWarning = gatsw

	const { setModalOpened, setComponentToOpen } = useContext(ModalContext);

	const { po, setPo, msg } = data;
	// console.log(`setPo`, setPo)
	// console.log(`po`, po)
	// console.log(`msg`, msg)
	const { addToStore, addToAsts } = useAddToStore();

	// extract Grv No from po
	// extract poPi from

	// handleCancel
	const handleCancel = e => {
		e.preventDefault();
		setPo([]);
		setModalOpened(false);
		setComponentToOpen("");
	};

	// handleProceed
	const handleProceed = e => {
		e.preventDefault();
		// proceed and add good to asts store
		const itemsToAdd = addToStore(po);
		// console.log(`itemsToAdd`, itemsToAdd);
		addToAsts(itemsToAdd);
		setPo([]);
		setModalOpened(false);
		setComponentToOpen("");
	};

	return (
		<div className="gatsw-container">
			<div className="gatsw-section gatsw-header">
				<p>Grv Add to Store Warning</p>
				<p>{`Grv-${po.poData.poNo}`}</p>
			</div>
			<div className="gatsw-section gatsw-body">
				<p className="gatsw-msg">{msg}</p>
				<table className="gatswTable">
					<tbody>
						{po.poPi &&
							po.poPi.map(item => {
								return (
									<tr className="gatsw-row gatsw-item" key={item.itemId}>
										<td className="gatsw-item item-name">
											<p>{item.itemName}</p>
										</td>
										<td className="gatsw-item item-quantity">
											<p>{item.itemQuantity}</p>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			<div className="gatsw-section gatsw-footer">
				<div className="gatsw-btns">
					<Tooltip
						// options
						title="Cancel adding goods to asts and continue working"
						position="bottom"
						// trigger="click"
					>
						<button className="cancel-btn" id="cancel" onClick={handleCancel}>
							<div className="gatsw-cancel-btn-components">
								<MdClose />
								<p>Cancel</p>
							</div>
						</button>
					</Tooltip>

					<Tooltip
						// options
						title="Proceed and add goos to asts"
						position="bottom"
						// trigger="click"
					>
						<button className="prceed-btn" id="prceed" onClick={handleProceed}>
							<div className="gatsw-cancel-btn-components">
								<MdCheck />
								<p>Proceed</p>
							</div>
						</button>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default GrvAddToStoreWarning;
