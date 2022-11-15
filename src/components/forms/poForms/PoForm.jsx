import React, { useContext, useState, useRef, useEffect } from "react";
import "../forms.css";
import {
	MdBusiness,
	MdEmail,
	MdLockClock,
	MdOutlineEmail,
	MdPerson,
} from "react-icons/md";
import { FcBusinessman, FcCellPhone, FcPhone } from "react-icons/fc";
import { FaFileInvoiceDollar, FaShoppingBasket } from "react-icons/fa";
import { RiMoneyCnyBoxLine } from "react-icons/ri";
import { ModalContext } from "../../../contexts/ModalContext";
import { PoContext } from "../../../contexts/PoContext";
import PoiTable from "../../tables/poi/PoiTable";

const PoForm = () => {
	const { poData, setPoData, poItemsInContext, setPoItemsInContext, poTotals } =
		useContext(PoContext);
	console.log(`poForm poData`, poData);
	// console.log(`poForm initPi`, initPi);
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	
	const [invPopGrv, setInvPopGrv] = useState({
		invoices: 0,
		proofOfPayments: 0,
		grv: 0,
	});

	const handleModalCloseBtn = e => {
		setModalOpened(false);
		setComponentToOpen("");
	};

	const handleSignupSignin = e => {
		setComponentToOpen({
			...componentToOpen,
			name: e.target.id,
		});
		setModalOpened(true);
	};

	const handleClear = e => {
		e.preventDefault();
	};

	const handleSubmit = e => {
		e.preventDefault();
		setPoData(prev => {
			// console.log(`prev.poPi`, prev.poPi);
			// console.log(`items`, items);
			return {
				...prev,
				poPi: [...prev.poPi, poItemsInContext],
			};
		});
		setPoItemsInContext([]);
		handleModalCloseBtn();

		console.log(`poData`, poData);
		console.log(`poItemsInContext`, poItemsInContext);
	};

	const handleChange = e => {
		e.preventDefault();
		setPoData(prev => {
			return {
				...prev.poData,
				[e.target.id]: e.target.value,
			};
		});
	};

	// const handleClick = e => {
	// 	e.preventDefault();
	//   // console.log(`btn clicked`);
	//   setShowHide(prev => {
	//     if(prev === 'hide') return "show"
	//     if(prev === 'show') return "hide"
	//   })
	// };

	const handleClickInvPopGrv = e => {
		e.preventDefault();
		console.log(`inv pop grv clicked`);
	};

	// console.log(`poData`, poData);

	return (
		<div className="po-container">
			{/* po header */}
			<div className="po-header">
				<div className="po-header-title-img">
					<h1 className="po-header-title">Purchase Order Form</h1>
					{/* <img src={irepsImage2} alt="ireps po images" className="po-img" /> */}
				</div>
				<div className="po-header-close-btn" onClick={handleModalCloseBtn}>
					<div className="btn-div" id="btn-div">
						<button>X</button>
					</div>
				</div>
			</div>

			{/* po form */}
			<form className="po-form" onSubmit={handleSubmit}>
				{/* <button
					className="form-section-show-hide-btn"
					onClick={handleClick}
				></button> */}
				<div className={`form-section form-section-updated`}>
					<p className="form-section-title">Last Updated</p>
					<div className="form-field po-form-updated-by-user">
						<span className="form-field-icon">
							<MdPerson />
						</span>
						<input
							type="text"
							name="updatedByUser"
							id="updatedByUser"
							value={poData.metaData.updatedByUser}
							onChange={handleChange}
							placeholder="Updated By User"
						/>
					</div>
					<div className="form-field po-form-updated-at-datetime">
						<span className="form-field-icon">
							<MdLockClock />
						</span>
						<input
							type="datetime-local"
							name="updatedAtDatetime"
							id="updatedAtDatetime"
							value={poData.metaData.updatedAtDatetime}
							onChange={handleChange}
							placeholder="Updated At Datetime"
						/>
					</div>
				</div>
				<div className={`form-section form-section-created`}>
					<p className="form-section-title">Created</p>
					<div className="form-field po-form-updated-by-user">
						<span className="form-field-icon">
							<MdPerson />
						</span>
						<input
							type="text"
							name="updatedByUser"
							id="updatedByUser"
							value={poData.metaData.updatedByUser}
							onChange={handleChange}
							placeholder="Updated By User"
						/>
					</div>
					<div className="form-field po-form-updated-at-datetime">
						<span className="form-field-icon">
							<MdLockClock />
						</span>
						<input
							type="datetime-local"
							name="updatedAtDatetime"
							id="updatedAtDatetime"
							value={poData.metaData.updatedAtDatetime}
							onChange={handleChange}
							placeholder="Updated At Datetime"
						/>
					</div>
				</div>

				<div className="form-section form-section-inv-pop-grv">
					<p className="form-section-title inv-pop-grv-title ">Inv Pop Grv</p>
					<div className="form-field po-form-inv">
						<span className="form-field-icon">
							<FaFileInvoiceDollar />
						</span>
						<button onClick={handleClickInvPopGrv} className="btn-po-form-inv">
							{invPopGrv.invoices ? (
								<p>{invPopGrv.invoices}</p>
							) : (
								<p>No Invoice(s) as yet</p>
							)}
						</button>
					</div>
					<div className="form-field po-form-pop">
						<span className="form-field-icon">
							<RiMoneyCnyBoxLine />
						</span>
						<button onClick={handleClickInvPopGrv} className="btn-po-form-pop">
							{invPopGrv.proofOfPayments ? (
								<p>{invPopGrv.proofOfPayments}</p>
							) : (
								<p>No Pops as yet</p>
							)}
						</button>
					</div>
					<div className="form-field po-form-grv">
						<span className="form-field-icon">
							<FaShoppingBasket />
						</span>
						<button onClick={handleClickInvPopGrv} className="btn-po-form-grv">
							{invPopGrv.grv ? <p>{invPopGrv.grv}</p> : <p>No Grv as yet</p>}
						</button>
					</div>
				</div>

				<div className="form-section form-section-supplier">
					<p className="form-section-title supplier-title">Supplier</p>
					<div className="form-field po-form-supplier-name">
						<span className="form-field-icon">
							<MdBusiness />
						</span>
						<input
							type="text"
							name="supplierName"
							value={poData.poSplData.supplierName}
							onChange={() => ""}
							placeholder="Supplier Name"
						/>
					</div>
					<div className="form-field po-form-supplier-contact-surname">
						<span className="form-field-icon">
							<FcBusinessman />
						</span>
						<input
							type="text"
							name="contactSurname"
							id="contactSurname"
							value={poData.poSplData.contactSurname}
							onChange={handleChange}
							placeholder="Contact Surname"
						/>
					</div>
					<div className="form-field po-form-supplier-contact-name">
						<span className="form-field-icon">
							<FcBusinessman />
						</span>
						<input
							type="text"
							name="contactName"
							id="contactName"
							value={poData.poSplData.contactName}
							onChange={handleChange}
							placeholder="Contact Name"
						/>
					</div>
					<div className="form-field po-form-supplier-contact-no">
						<span className="form-field-icon">
							<FcCellPhone />
						</span>
						<input
							type="text"
							name="contactNo"
							id="updatedAtDatetime"
							value={poData.poSplData.poContactNo}
							onChange={() => ""}
							placeholder="Contact No"
						/>
					</div>
					<div className="form-field po-form-supplier-contact-email-adr">
						<span className="form-field-icon">
							<MdOutlineEmail />
						</span>
						<input
							type="email"
							name="emailAdr"
							value={poData.poSplData.poEmailAdr}
							onChange={() => ""}
							placeholder="Contact Email Adr"
						/>
					</div>
				</div>

				<div className="form-section form-section-po-items">
					<div className="form-section-po-items-title">
						<p className="form-section-title">Procured Items</p>
						<p className="form-section-title-totals">Total Quantites {poTotals}</p>
					</div>
					<PoiTable />
				</div>

				<div className="form-btns">
					<button
						className="form-btn Clear"
						// onClick={e => setUserCredentials(initSigninData)}
					>
						Clear
					</button>
					<button
						className="form-btn reset"
						// onClick={e => setUserCredentials(initSigninData)}
					>
						Reset
					</button>
					<button className="form-btn submit">Submit</button>
				</div>
			</form>
		</div>
	);
};
export default PoForm;
