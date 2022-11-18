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

const PoForm = ({ formData }) => {
	// console.log(`formData`, formData)
	const { newPoFormData } = useSelector(state => state.admin);
	const dispatch = useDispatch();
	const { setComponentToOpen, setModalOpened } = useContext(ModalContext);
	const { user } = useContext(UserContext);
	// console.log(`user`, user);
	const [po, setPo] = useState(formData ? formData : newPoFormData);
	console.log(`po`, po);
	const [poItemsTotals, setPoItemsTotals] = useState(0);
	// console.log(`poItemsTotals`, poItemsTotals);

	useEffect(() => {
		// console.log(`po.poPi`, po.poPi);
		setPoItemsTotals(
			po.poPi &&
				po.poPi.reduce(
					(accum, current) => (accum = accum + current.itemQuantity),
					0
				)
		);
	}, [po.poPi]);

	useEffect(() => {
		const getMetaDataUpdate = prev => {
			// console.log(`getMetaDataUpdate running`);
			if (formData) {
				// this will update an exisintg PO form
				return {
					...prev.metaData,
					updatedByUser: user.signedon
						? `${user.surname} ${user.name}`
						: "Not Available",
					updatedAtDatetime: moment().format("YYYY-MM-DD HH:mm"),
				};
			} else {
				// this will create a new PO form
				return {
					...prev.metaData,
					updatedByUser: user.signedon
						? `${user.surname} ${user.name}`
						: "Not Available",
					updatedAtDatetime: moment().format("YYYY-MM-DD HH:mm"),
					createdByUser: user.signedon
						? `${user.surname} ${user.name}`
						: "Not Available",
					createdAtDatetime: moment().format("YYYY-MM-DD HH:mm"),
				};
			}
		};

		setPo(prev => {
			const metaDataUpdate = getMetaDataUpdate(prev);
			return {
				...prev,
				metaData: metaDataUpdate,
			};
		});
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		if (formData) {
			dispatch(poUpdated(po));
		} else {
			dispatch(poCreated(po));
		}
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

	const handleSplDataChange = e => {
		e.preventDefault();
		// console.log(`e.target.id`, e.target.id)
		// console.log(`e.target.value`, e.target.value)
		setPo(prev => {
			// console.log(`prev`, prev);
			return {
				...prev,
				poSplData: {
					...prev.poSplData,
					[e.target.id]: e.target.value,
				},
			};
		});
	};

	// console.log(`po`, po);

	return (
		<div className="po-container">
			{/* po header */}
			<div className="po-header">
				<div className="po-header-title-img">
					<h1 className="po-header-title">Purchase Order Form</h1>
					<h1 className="po-header-po-no">{po.poData.poNo}</h1>
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
				{/* <button
					className="form-section-show-hide-btn"
					onClick={handleClick}
				></button> */}
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

				<div className="form-section form-section-inv-pop-grv">
					<p className="form-section-title inv-pop-grv-title ">
						PO Supplimentary Data
					</p>
					<div className="form-field po-form-inv">
						<span className="form-field-icon">
							<FaFileInvoiceDollar />
						</span>
						<button
							onClick={handleClickInvPopGrv}
							id="po-inv"
							className="btn-po-form-supplimentary-data btn-po-form-inv"
						>
							{po.poDatapoInv ? po.poData.poInv : "No Invoice(s) as yet"}
						</button>
					</div>
					<div className="form-field po-form-pop">
						<span className="form-field-icon">
							<RiMoneyCnyBoxLine />
						</span>
						<button
							onClick={handleClickInvPopGrv}
							id="po-pop"
							className="btn-po-form-pop"
						>
							{po.poData.poPop ? po.poData.poPop : "No Pops as yet"}
						</button>
					</div>
					<div className="form-field po-form-grv">
						<span className="form-field-icon">
							<FaShoppingBasket />
						</span>
						<button
							onClick={handleClickInvPopGrv}
							id="po-grv"
							className="btn-po-form-grv"
						>
							{po.poData.poGrv ? po.poData.poGrv : "No Grv as yet"}
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
							name="splName"
							id="splName"
							value={po.poSplData.splName}
							onChange={handleSplDataChange}
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
							onChange={handleSplDataChange}
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
							onChange={handleSplDataChange}
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
							onChange={handleSplDataChange}
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
							onChange={handleSplDataChange}
							placeholder="Contact Email Adr"
						/>
					</div>
				</div>

				<div className="form-section form-section-po-items">
					<div className="form-section-po-items-title">
						<p className="form-section-title">Po Items</p>

						<p className="form-section-title-totals">
							Total Po Quantites {poItemsTotals}
						</p>
					</div>
					<PoiTable po={po} setPo={setPo} />
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
