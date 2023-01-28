import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import "./PoInvPop.css";
import PoInvForm from "./PoInvForm";
import PoPopForm from "./PoPopForm";
import PoInvPopTable from "./PoInvPopTable";

const PoInvPop = ({ po }) => {
	const { closeModal} = useModal();
	const [showHideInvForm, setShowHideInvForm] = useState('poipf-hide');
	const [showHidePopForm, setShowHidePopForm] = useState('poipf-hide');
	// poip: po Inv Pop
	return (
		<div className="poip-container">
			<div className="poip-header">
				<div className="po-no">{`Po-${po.poNo}`}</div>
				<p className="">Invoice Payment Report</p>
				<div className="totals">`Balance: 1000`</div>
				<button onClick={() => closeModal()}>x</button>
			</div>
			<div className="poip-body">
				<div className="invoices">
					<div className="header">
						<button
							onClick={() => {
								setShowHideInvForm("poipf-show");
							}}
						>
							{" "}
							+{" "}
						</button>
						<p>Invoices</p>
						<p>3000</p>
					</div>
					<div className="invoices-body">
						<PoInvPopTable data={po.poData.poInv} />
					</div>
					<PoInvForm
						po={po}
						type="invoice"
						showHideInvForm={showHideInvForm}
						setShowHideInvForm={setShowHideInvForm}
					/>
				</div>
				<div className="pop">
					<div className="header">
						<button
							onClick={() => {
								setShowHidePopForm("poipf-show");
							}}
						>
							{" "}
							+{" "}
						</button>
						<p>Payments</p>
						<p>2000</p>
					</div>
					<div className="pop-body">
						<PoInvPopTable data={po.poData.poPop} />
					</div>
					<PoPopForm
						po={po}
						type="pop"
						showHidePopForm={showHidePopForm}
						setShowHidePopForm={setShowHidePopForm}
					/>
				</div>
			</div>
		</div>
	);
};

export default PoInvPop;
