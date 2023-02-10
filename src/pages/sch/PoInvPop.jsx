import { useState } from "react";
import useModal from "../../hooks/useModal";
import "./PoInvPop.css";
import PoInvPopForm from "./PoInvPopForm";
import PoInvPopTable from "./poInvPopTable/PoInvPopTable";

const PoInvPop = ({ po }) => {
	// console.log(`po`, po)
	const { closeModal } = useModal();
	const [showHideInvPopForm, setShowHideInvPopForm] = useState("poipf-hide");
	const [type, setType] = useState("invoice");
	const [showImage, setShowImage] = useState(false);
	const [url, setUrl] = useState("");
	const [alt, setAlt] = useState("");
	// poip: po Inv Pop

	const poInvArray = po.poData.poInv;
	const totInv = poInvArray.reduce((accumulator, currentValue) => {
		return (accumulator = accumulator + Number(currentValue.amount));
	}, 0);
	const poPopArray = po.poData.poPop;
	const totPop = poPopArray.reduce((accumulator, currentValue) => {
		return (accumulator = accumulator + Number(currentValue.amount));
	}, 0);

	return (
		<div className="poip-container">
			<div className="poip-header">
				<div className="po-no">{`Po-${po.poNo}`}</div>
				<p className="">Invoice Payment Report</p>
				<div className="totals">{`Balance: ${totInv - totPop}`}</div>
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
						<p>{totInv}</p>
					</div>
					<div className="invoices-body">
						<PoInvPopTable
							poData={po}
							data={po.poData.poInv}
							setUrl={setUrl}
							setAlt={setAlt}
							setShowImage={setShowImage}
							type="invoice"
						/>
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
						<p>{totPop}</p>
					</div>
					<div className="pop-body">
						<PoInvPopTable
							poData={po}
							data={po.poData.poPop}
							setUrl={setUrl}
							setAlt={setAlt}
							setShowImage={setShowImage}
							type="pop"
						/>
					</div>
				</div>

				<PoInvPopForm
					po={po}
					type={type}
					index={0}
					showHideInvPopForm={showHideInvPopForm}
					setShowHideInvPopForm={setShowHideInvPopForm}
				/>
				<div className={`inv-pop-image ${showImage ? "show" : "hide"}`}>
					<div className="inv-pop-image-header">
						<p>Invoice / Payment image</p>
						<button onClick={() => setShowImage(false)}>X</button>
					</div>
					<img src={url} alt={alt} />{" "}
					<div className="image-review">
						
					</div>
					<div className="inv-pop-image-footer">
						<button>Email</button>
						<button>SMS</button>
						<button>WhatsApp</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PoInvPop;
