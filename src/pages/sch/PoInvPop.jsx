import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import "./PoInvPop.css";
import PoInvPopForm from "./PoInvPopForm";
import PoInvPopTable from "./poInvPopTable/PoInvPopTable";

const PoInvPop = ({ po }) => {
	// console.log(`po`, po)
	const { closeModal} = useModal();
	const [showHideInvPopForm, setShowHideInvPopForm] = useState('poipf-hide');
	const [type, setType] = useState('invoice')
	// poip: po Inv Pop

	const [poState] = useState(po)
	// console.log(`poState`, poState);

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
								setShowHideInvPopForm("poipf-show");
								setType("invoice");
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
				</div>
				<div className="pop">
					<div className="header">
						<button
							onClick={() => {
								setShowHideInvPopForm("poipf-show");
								setType("pop");
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
				</div>

				<PoInvPopForm
					po={po}
					type={type}
					index={0}
					showHideInvPopForm={showHideInvPopForm}
					setShowHideInvPopForm={setShowHideInvPopForm}
				/>
			</div>
		</div>
	);
};

export default PoInvPop;
