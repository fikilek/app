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
import { getGrvStatus } from "../../../utils/utils";

const newPoFormData = {
	poSystemId: getPoSystmeId(),
	poStatus: "Created",
	metaData: {
		updatedAtDatetime: "",
		updatedByUser: "",
		createdAtDatetime: moment().format("YYYY-MM-DD HH:mm"),
		createdByUser: "",
	},
	poData: {
		poNo: "Po-4",
		poInv: [],
		poPop: [], // Proof of Payment
		poGrv: {
			grvSystemId: "",
			grvFormId: "",
			grvStatus: "Created", // ['Created', 'Confirmed', 'Witnessed']
			grvConfirmReceipt: {
				grvcrStatus: false, // This must be changed through a password
				grvcrSurname: "",
				grvcrName: "",
				grvcrContactNo: "",
				grvcrContactEmailAdr: "",
			},
			grvWitnessReceipt: {
				grvwrStatus: false, // This must be changed through a password
				grvwrSurname: "",
				grvwrName: "",
				grvwrContactNo: "",
				grvwrContactEmailAdr: "",
			},
			grvComments: [], // [{date: date, msg: msg, user: user}]
			rgvMedia: {
				grvPhotos: [],
				grvVideos: [],
				grvVoice: [],
			},
		}, // Goods receive,
	},
	poPi: [],
	poSplData: {
		// Supplier data
		splNo: "",
		splName: "",
		splContactSurname: "",
		splContactName: "",
		splContactNo: "",
		splContactEmailAdr: "",
	},
};
// console.log(`newPoFormData`, newPoFormData);

const PoForm = ({ formData }) => {
	console.log(`formData`, formData);

	const dispatch = useDispatch();
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	const { user } = useContext(UserContext);
	// console.log(`user`, user);
	// const [po, setPo] = useState(formData ? formData : newPoFormData);
	const [po, setPo] = useState(formData);
	console.log(`po`, po);
	const [poItemsTotals, setPoItemsTotals] = useState(0);
	// console.log(`poItemsTotals`, poItemsTotals);
	const poStatus =
		po.poStatus === "Created" ? "btn-po-status-created" : "btn-po-status-aproved";

	useEffect(() => {
		setPo(prev => {
			const poInvStatus = prev.poData.poInv.length > 0 ? true : false;
			const poPopStatus = prev.poData.poInv.length > 0 ? true : false;
			const grvcrStatus = prev.poData.poGrv.grvConfirmReceipt.grvcrStatus;
			const grvwrStatus = prev.poData.poGrv.grvWitnessReceipt.grvwrStatus;

			const grvStatus = getGrvStatus(
				poInvStatus,
				poPopStatus,
				grvcrStatus,
				grvwrStatus
			);

			return {
				...prev,
				poData: {
					...prev.poData,
					poGrv: {
						...prev.poData.poGrv,
						grvStatus: grvStatus,
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
			po.poPi &&
				po.poPi.reduce(
					(accum, current) => (accum = accum + current.itemQuantity),
					0
				)
		);
	}, [po.poPi]);

	useEffect(() => {
		const getMetaDataUpdate = prev => {
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
			// console.log(`prev`, prev);
			const metaDataUpdate = getMetaDataUpdate(prev);
			return {
				...prev,
				metaData: metaDataUpdate,
			};
		});
		return () => setPo([]);
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		if (formData === null) {
			console.log(`dispatching poCreate`, po);
			dispatch(poCreated(po));
		} else {
			console.log(`dispatching poUpdate`, po);
			dispatch(poUpdated(po));
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

	return (
		<div className="po-container">
			{/* po header */}
			<div className="po-header">
				<div className="po-header-title-img">
					<button
						onClick={handleClick}
						id="btnPoStatusModifier"
						className={`btn-table-row ${poStatus}`}
					>
						{po.poStatus}
					</button>
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
					className="fs-show-hide-btn"
					onClick={handleClick}
				></button> */}
				<div className={`fs fs-updated`}>
					<p className="fs-title">Updated</p>
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

				<div className={`fs fs-created`}>
					<p className="fs-title">Created</p>
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

				<div className="fs fs-inv-pop-grv">
					<p className="fs-title inv-pop-grv-title ">PO Supplimentary Data</p>
					<div className="form-field po-form-inv">
						<span className="form-field-icon">
							<FaFileInvoiceDollar />
						</span>
						<button
							onClick={handleClickInvPopGrv}
							id="po-inv"
							className="btn-po-form-supplimentary-data btn-po-form-inv"
						>
							{po.poData.poInv.length === 0 ? "No Invoice" : po.poData.poInv.length}
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
							{po.poData.poPop.length === 0
								? "No Poof of Payment"
								: po.poData.poPop.length}
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
							{po.poData.poGrv.grvStatus}
						</button>
					</div>
				</div>

				<div className="fs fs-supplier">
					<p className="fs-title supplier-title">Supplier</p>
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

				<div className="fs fs-po-items">
					<div className="fs-po-items-title">
						<p className="fs-title">Po Items</p>

						<p className="fs-title-totals">Total Po Quantites {poItemsTotals}</p>
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
