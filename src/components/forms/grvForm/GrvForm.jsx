import React, { useContext, useEffect, useMemo, useState } from "react";
import "../forms.css";
import {
	MdBusiness,
	MdLockClock,
	MdOutlineEmail,
	MdPerson,
} from "react-icons/md";
import { FcBusinessman, FcCellPhone } from "react-icons/fc";
import { FaFileInvoiceDollar, FaShoppingBasket } from "react-icons/fa";
import { RiMoneyCnyBoxLine } from "react-icons/ri";
import { ModalContext } from "../../../contexts/ModalContext";
import { PoContext } from "../../../contexts/PoContext";
import PoiTable from "../../tables/poi/PoiTable";
import { useDispatch, useSelector } from "react-redux";
import { poCreated, poUpdated } from "../../../store/schSlice";
import { UserContext } from "../../../contexts/UserContext";
import moment from "moment";
import { nanoid } from "@reduxjs/toolkit";
import { getPoSystmeId } from "../../tables/poi/poiUtils";
import { getGrvStatus, getSystemId } from "../../../utils/utils";

const GrvForm = ({ formData }) => {
	console.log(`formData`, formData);
	// console.log(`newPoFormData`, newPoFormData);
	const dispatch = useDispatch();
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	const { user } = useContext(UserContext);
	// console.log(`user`, user);

	// Create a local grv state and atach to the po on submission
	const [po, setPo] = useState(formData);
	console.log(`po`, po);
	const [poItemsTotals, setPoItemsTotals] = useState(0);
	// console.log(`poItemsTotals`, poItemsTotals);

	useEffect(() => {
		setPo(prev => {
			const poInvStatus = prev.poData.poInv.length > 0 ? true : false;
			const poPopStatus = prev.poData.poInv.length > 0 ? true : false;
			const grvcrStatus = prev.poData.poGrv.grvConfirmReceipt.grvcrStatus;
			const grvwrStatus = prev.poData.poGrv.grvWitnessReceipt.grvwrStatus;

			const status = getGrvStatus(
				poInvStatus,
				poPopStatus,
				grvcrStatus,
				grvwrStatus
      );
      
      console.log(`status`, status)
      console.log(`prev`, prev)

			return {
				...prev,
				poData: {
					...prev.poData,
					poGrv: {
						...prev.poData.poGrv,
						grvStatus: status,
					},
				},
			};
		});
	}, [
		po.poData.poInv,
		po.poData.poPop,
		po.poData.poGrv.grvcrStatus,
		po.poData.poGrv.grvwrStatus,
	]);

	useEffect(() => {
		// console.log(`po.poPi`, po.poPi);
		setPoItemsTotals(
			formData.poPi &&
				formData.poPi.reduce(
					(accum, current) => (accum = accum + current.itemQuantity),
					0
				)
		);
	}, [formData.poPi]);

	useEffect(() => {
		setPo(prev => {
			// console.log(`prev`, prev); prev is po
			return {
				...prev,
				metaData: {
					...prev.metaData,
					updatedByUser: user.signedon
						? `${user.surname} ${user.name}`
						: "Not Available",
					updatedAtDatetime: moment().format("YYYY-MM-DD HH:mm"),
				},
			};
		});
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(poUpdated(po));
		setPo([]);
		setModalOpened(false);
		setComponentToOpen("");
	};

	const handleChange = e => {
		e.preventDefault();
	};

	const handleClickInvPopGrv = e => {
		e.preventDefault();
		const btnClicked = e.target.id;
		// console.log(`${btnClicked} clicked`);
	};

	const handleClick = e => {
		// Click handler opens a modal with a 'warning coponent' for decision making
		e.preventDefault();
		// console.log(`approve click`);
		setComponentToOpen({
			...componentToOpen,
			name: e.target.id, // name of the 'warning component' to open in the modal
			payload: { po, msg: "You are about to approve a PO" },
		});
		setModalOpened(true); // setting 'setModalOpened' to 'true' will open a modal
  };
  
  console.log(`po.poData.poGrv.grvStatus`, po.poData.poGrv.grvStatus);

	return (
		<div className="po-container">
			{/* po header */}
			<div className="po-header">
				<div className="po-header-title-img">
					<button
						onClick={handleClick}
						id="btnPoStatusModifier"
						className={`btn-table-row`}
					>
						{po.poData.poGrv.grvStatus}
					</button>
					<h1 className="po-header-title">Grv Form</h1>
					<h1 className="po-header-po-no">Grv-{po.poData.poNo}</h1>
					{/* <img src={irepsImage2} alt="ireps po images" className="po-img" /> */}
				</div>
				<div
					className="po-header-close-btn"
					onClick={() => {
						setPo([]);
						setModalOpened(false);
						setComponentToOpen("");
					}}
				>
					<div className="btn-div" id="btn-div">
						<button>X</button>
					</div>
				</div>
			</div>

			{/* po form */}
			<form className="po-form" onSubmit={handleSubmit}>
				{/* Updated section */}
				<div className={`form-section form-section-updated`}>
					<p className="form-section-title">Updated</p>
					<div className="form-field po-form-updated-by-user">
						<span className="form-field-icon">
							<MdPerson />
						</span>
						<input
							type="text"
							name="updatedByUser"
							id="updatedByUser"
							value={po.metaData.updatedByUser}
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
							value={po.metaData.updatedAtDatetime}
							onChange={handleChange}
							placeholder="Updated At Datetime"
						/>
					</div>
				</div>

				{/* Created section */}
				<div className={`form-section form-section-created`}>
					<p className="form-section-title">Created</p>
					<div className="form-field po-form-created-by-user">
						<span className="form-field-icon">
							<MdPerson />
						</span>
						<input
							type="text"
							name="createdByUser"
							id="createdByUser"
							value={po.metaData.createdByUser}
							onChange={handleChange}
							placeholder="Created By User"
						/>
					</div>
					<div className="form-field po-form-created-at-datetime">
						<span className="form-field-icon">
							<MdLockClock />
						</span>
						<input
							type="datetime-local"
							name="createdAtDatetime"
							id="createdAtDatetime"
							value={po.metaData.createdAtDatetime}
							onChange={handleChange}
							placeholder="Created At Datetime"
						/>
					</div>
				</div>

				{/* Confirm receipt */}
				{/* <div className="form-section form-section-confirm-receipt">
					<p className="form-section-title confirm-receipt-title">Confirm Receipt</p>
					<div className="form-field po-form-confirm-receipt-name">
						<span className="form-field-icon">
							<MdBusiness />
						</span>
						<input
							type="text"
							name="grvcrStatus"
							id="grvcrStatus"
							value={po.poData.poGrv.grvConfirmReceipt.grvcrStatus}
							placeholder="Confirm Receipt Name"
						/>
					</div>
					<div className="form-field po-form-confirm-receipt-surname">
						<span className="form-field-icon">
							<MdBusiness />
						</span>
						<input
							type="text"
							name="grvcrSurname"
							id="grvcrSurname"
							value={po.poData.poGrv.grvConfirmReceipt.grvcrSurname}
							placeholder="Confirm Receipt Surname"
						/>
					</div>
					<div className="form-field po-form-confirm-receipt-contact-name">
						<span className="form-field-icon">
							<FcBusinessman />
						</span>
						<input
							type="text"
							name="grvcrName"
							id="grvcrName"
							value={po.poData.poGrv.grvConfirmReceipt.grvcrName}
							placeholder="Confirm Receipt Name"
						/>
					</div>
					<div className="form-field po-form-confirm-receipt-contact-no">
						<span className="form-field-icon">
							<FcCellPhone />
						</span>
						<input
							type="text"
							name="grvcrContactNo"
							id="grvcrContactNo"
							value={po.poData.poGrv.grvConfirmReceipt.grvcrContactNo}
							placeholder="Contact No"
						/>
					</div>
					<div className="form-field po-form-confirm-receipt-contact-email-adr">
						<span className="form-field-icon">
							<MdOutlineEmail />
						</span>
						<input
							type="email"
							name="grvcrContactEmailAdr"
							id="grvcrContactEmailAdr"
							value={po.poData.poGrv.grvConfirmReceipt.grvcrContactEmailAdr}
							placeholder="Contact Email Adr"
						/>
					</div>
				</div> */}

				{/* Witness Receipt */}
				{/* <div className="form-section form-section-witness-receipt">
					<p className="form-section-title witness-receipt-title">Witness Receipt</p>
					<div className="form-field po-form-witness-receipt-name">
						<span className="form-field-icon">
							<MdBusiness />
						</span>
						<input
							type="text"
							name="grvwrStatus"
							id="grvwrStatus"
							value={po.poData.poGrv.grvWitnessReceipt.grvwrStatus}
							placeholder="Witness Receipt Name"
						/>
					</div>
					<div className="form-field po-form-witness-receipt-surname">
						<span className="form-field-icon">
							<MdBusiness />
						</span>
						<input
							type="text"
							name="grvwrSurname"
							id="grvwrSurname"
							value={po.poData.poGrv.grvWitnessReceipt.grvwrSurname}
							placeholder="Witness Receipt Surname"
						/>
					</div>
					<div className="form-field po-form-witness-receipt-contact-name">
						<span className="form-field-icon">
							<FcBusinessman />
						</span>
						<input
							type="text"
							name="grvwrName"
							id="grvwrName"
							value={po.poData.poGrv.grvWitnessReceipt.grvwrName}
							placeholder="Witness Receipt Name"
						/>
					</div>
					<div className="form-field po-form-witness-receipt-contact-no">
						<span className="form-field-icon">
							<FcCellPhone />
						</span>
						<input
							type="text"
							name="grvwrContactNo"
							id="grvwrContactNo"
							value={po.poData.poGrv.grvWitnessReceipt.grvwrContactNo}
							placeholder="Contact No"
						/>
					</div>
					<div className="form-field po-form-witness-receipt-contact-email-adr">
						<span className="form-field-icon">
							<MdOutlineEmail />
						</span>
						<input
							type="email"
							name="grvwrContactEmailAdr"
							id="grvwrContactEmailAdr"
							value={po.poData.poGrv.grvWitnessReceipt.grvwrContactEmailAdr}
							placeholder="Contact Email Adr"
						/>
					</div>
				</div> */}

				{/* Supplier section */}
				<div className="form-section form-section-supplier">
					<p className="form-section-title supplier-title">Supplier</p>
					<div className="form-field po-form-supplier-name">
						<span className="form-field-icon">
							<MdBusiness />
						</span>
						<input
							type="text"
							name="splName"
							id="splName"
							value={po.poSplData.splName}
							placeholder="Supplier Name"
						/>
					</div>
					<div className="form-field po-form-supplier-contact-surname">
						<span className="form-field-icon">
							<FcBusinessman />
						</span>
						<input
							type="text"
							name="splContactSurname"
							id="splContactSurname"
							value={po.poSplData.splContactSurname}
							placeholder="Contact Surname"
						/>
					</div>
					<div className="form-field po-form-supplier-contact-name">
						<span className="form-field-icon">
							<FcBusinessman />
						</span>
						<input
							type="text"
							name="splContactName"
							id="splContactName"
							value={po.poSplData.splContactName}
							placeholder="Contact Name"
						/>
					</div>
					<div className="form-field po-form-supplier-contact-no">
						<span className="form-field-icon">
							<FcCellPhone />
						</span>
						<input
							type="text"
							name="splContactNo"
							id="splContactNo"
							value={po.poSplData.splContactNo}
							placeholder="Contact No"
						/>
					</div>
					<div className="form-field po-form-supplier-contact-email-adr">
						<span className="form-field-icon">
							<MdOutlineEmail />
						</span>
						<input
							type="email"
							name="splContactEmailAdr"
							id="splContactEmailAdr"
							value={po.poSplData.splContactEmailAdr}
							placeholder="Contact Email Adr"
						/>
					</div>
				</div>

				{/* PO items */}
				<div className="form-section form-section-po-items">
					<div className="form-section-po-items-title">
						<p className="form-section-title">Po Items</p>

						<p className="form-section-title-totals">
							Total Po Quantites {poItemsTotals}
						</p>
					</div>
					<PoiTable po={po} setPo={setPo} />
				</div>

				{/* Comments section */}

				{/* media section */}

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
export default GrvForm;
