import React, { useContext, useState, useRef, useEffect } from "react";
import "../forms.css";
import { MdBusiness, MdEmail, MdLockClock, MdOutlineEmail, MdPerson } from "react-icons/md";
import { FcBusinessman, FcCellPhone, FcPhone } from "react-icons/fc";
import irepsImage2 from "../../../images/irepsImage1.jpg";
import { ModalContext } from "../../../contexts/ModalContext";
import { useSelector } from "react-redux";
import TableProcuredItems from "../../tables/procuredItems/TableProcuredItems";
import ProcuredItems from "../../tables/procuredItems/ProcuredItems";

const PoForm = () => {
	const inputRef = useRef();
	const { newPoFormData } = useSelector(state => state.admin);
	// console.log(`newPoFormData`, newPoFormData);

	// Fpw is the Forgotten Password section
	const [poData, setPoData] = useState(newPoFormData);
	// console.log(`poData`, poData);

	// this section sontrols the display of the modal
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);

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
		console.log(`user email adr: `, poData);
		handleModalCloseBtn(e.target);
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
				<div className="form-section from-section-updated">
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
				<div className="form-section from-section-created">
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

				<div className="form-section from-section-inv-pop-grv">
					<p className="form-section-title inv-pop-grv-title ">Inv Pop Grv</p>
					<div className="po-form-inv">
						<button className="btn-po-form-inv">Invoice(s)</button>
					</div>
					<div className="po-form-pop">
						<button className="btn-po-form-pop">Proof of Payment</button>
					</div>
					<div className="po-form-grv">
						<button className="btn-po-form-grv">Grv</button>
					</div>
				</div>

				<div className="form-section from-section-supplier">
					<p className="form-section-title supplier-title">Supplier</p>
					<div className="form-field po-form-supplier-name">
						<span className="form-field-icon">
							<MdBusiness />
						</span>
						<input
							type="text"
							name="supplierName"
							value={poData.supplierName}
							placeholder="Supplier Name"
						/>
					</div>
					<div className="form-field po-form-supplier-contact-surname-name">
						<span className="form-field-icon">
							<FcBusinessman />
						</span>
						<input
							type="text"
							name="updatedAtDatetime"
							id="updatedAtDatetime"
							value={poData.metaData.updatedAtDatetime}
							onChange={handleChange}
							placeholder="Contact - Surname & Name"
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
							value={poData.contactNo}
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
							value={poData.email}
							placeholder="Email Adr"
						/>
					</div>
				</div>

				<div className="form-section form-section-po-items">
					<p className="form-section-title">Procured Items</p>
					<ProcuredItems />
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
