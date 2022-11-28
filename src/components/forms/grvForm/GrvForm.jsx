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
import GrvFormMedia from "./GrvFormMedia";
import GrvCommentsTable from "../../tables/grvComments/GrvCommentsTable";

const GrvForm = ({ formData }) => {
	// console.log(`formData`, formData);
	// console.log(`newPoFormData`, newPoFormData);
	const dispatch = useDispatch();
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	const { user } = useContext(UserContext);
	// console.log(`user`, user);
	const stores = useSelector(state => state.admin.stores);
	// console.log(`stores`, stores);

	// Create a local grv state and atach to the po on submission
	const [po, setPo] = useState(formData);
	// console.log(`po`, po);
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

			// console.log(`status`, status);
			// console.log(`prev`, prev);

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

	const handleChangeStore = e => {
		e.preventDefault();
		// console.log(`e.target.id`, e.target.id);
		// console.log(`e.target.value`, e.target.value);
		const selectedStore = stores.find(
			store => store.storeId === Number(e.target.value)
		);
		// console.log(`selectedStore`, selectedStore);
		setPo(prev => {
			return {
				...prev,
				poData: {
					...prev.poData,
					poGrv: {
						...prev.poData.poGrv,
						grvStoreData: {
							...prev.poData.poGrv.grvStoreData,
							storeId: selectedStore.storeId,
							storeName: selectedStore.storeName,
							storeAdr: selectedStore.storeAdr,
							storeContactSurname: selectedStore.storeContactSurname,
							storeContactName: selectedStore.storeContactName,
							storeContactNo: selectedStore.storeContactNo,
							storeContactEmailAdr: selectedStore.storeContactEmailAdr,

							[e.target.id]: e.target.value,
						},
					},
				},
			};
		});
		// Create the assets in asts store
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
			payload: { po, setPo: setPo, msg: "You are about to approve a PO" },
		});
		setModalOpened(true); // setting 'setModalOpened' to 'true' will open a modal
	};

	// console.log(`po.poData.poGrv.grvStatus`, po.poData.poGrv.grvStatus);

	const handleAddGoodsToStore = e => {
		e.preventDefault();
		const { poPi } = po;
		// console.log(`add good to store`, poPi);
		setComponentToOpen({
			...componentToOpen,
			name: e.target.id, // name of the 'warning component' to open in the modal
			payload: {
				po,
				setPo,
				msg: "You are about to add the following assets into the store",
			},
		});
		setModalOpened(true); // setting 'setModalOpened' to 'true' will open a modal
	};

	return (
		<div className="grv-container">
			{/* po header */}
			<div className="grv-header">
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
			<form className="grv-form" onSubmit={handleSubmit}>
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
							onChange={() => ""}
							placeholder="Updated By User"
							readOnly="readOnly"
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
							onChange={() => ""}
							placeholder="Updated At Datetime"
							readOnly="readOnly"
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
							onChange={() => ""}
							placeholder="Created By User"
							readOnly="readOnly"
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
							onChange={() => ""}
							placeholder="Created At Datetime"
							readOnly="readOnly"
						/>
					</div>
				</div>

				{/* Store Details */}
				<div className="form-section form-section-store">
					<div className="form-section-store-title">
						<p className="form-section-title store-title">Store Receiving Goods</p>
						<button id="addGoodsToStore" onClick={handleAddGoodsToStore}>+</button>
					</div>
					<div className="form-field po-form-store-name">
						<span className="form-field-icon">
							<MdBusiness />
						</span>
						<select
							name="storeName"
							id="storeName"
							value={po.poData.poGrv.grvStoreData.storeName}
							onChange={handleChangeStore}
							placeholder="Store Name"
						>
							{stores &&
								stores.map(store => {
									return (
										<option key={store.storeId} value={store.storeId}>
											{store.storeName}
										</option>
									);
								})}
						</select>
					</div>
					<div className="form-field po-form-store-adr">
						<span className="form-field-icon">
							<MdBusiness />
						</span>
						<input
							type="text"
							name="storeAdr"
							id="storeAdr"
							value={po.poData.poGrv.grvStoreData.storeAdr}
							onChange={handleChangeStore}
							placeholder="Store Physical Address"
						/>
					</div>
					<div className="form-field po-form-store-contact-surname">
						<span className="form-field-icon">
							<FcBusinessman />
						</span>
						<input
							type="text"
							name="storeContactSurname"
							id="storeContactSurname"
							value={po.poData.poGrv.grvStoreData.storeContactSurname}
							onChange={handleChangeStore}
							placeholder="Contact Surname"
						/>
					</div>
					<div className="form-field po-form-store-contact-name">
						<span className="form-field-icon">
							<FcBusinessman />
						</span>
						<input
							type="text"
							name="storeContactName"
							id="storeContactName"
							value={po.poData.poGrv.grvStoreData.storeContactName}
							onChange={handleChangeStore}
							placeholder="Contact Name"
						/>
					</div>
					<div className="form-field po-form-store-contact-no">
						<span className="form-field-icon">
							<FcCellPhone />
						</span>
						<input
							type="text"
							name="storeContactNo"
							id="storeContactNo"
							value={po.poData.poGrv.grvStoreData.storeContactNo}
							onChange={handleChangeStore}
							placeholder="Contact Number"
						/>
					</div>
					<div className="form-field po-form-store-contact-email-adr">
						<span className="form-field-icon">
							<MdOutlineEmail />
						</span>
						<input
							type="text"
							name="storeContactEmailAdr"
							id="storeContacEmailAdr"
							value={po.poData.poGrv.grvStoreData.storeContactEmailAdr}
							onChange={handleChangeStore}
							placeholder="Contact Email Adr"
						/>
					</div>
				</div>

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
							onChange={() => ""}
							readOnly="readOnly"
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
							onChange={() => ""}
							readOnly="readOnly"
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
							onChange={() => ""}
							readOnly="readOnly"
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
							onChange={() => ""}
							readOnly="readOnly"
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
							onChange={() => ""}
							readOnly="readOnly"
						/>
					</div>
				</div>

				{/* Receiver of goods - completeted by the user who received the goods */}
				<div className="form-section form-section-confirm-receipt">
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
							onChange={() => ""}
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
							onChange={() => ""}
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
							onChange={() => ""}
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
							onChange={() => ""}
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
							onChange={() => ""}
							placeholder="Contact Email Adr"
						/>
					</div>
				</div>

				{/* Witness Receipt */}
				<div className="form-section form-section-witness-receipt">
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
							onChange={() => ""}
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
							onChange={() => ""}
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
							onChange={() => ""}
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
							onChange={() => ""}
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
							onChange={() => ""}
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
				<div className="form-section form-section-grv-comments">
					<div className="form-section-grv-comments-title">
						<p className="form-section-title">Grv Comments</p>
						<p className="form-section-title-grv-comments">
							{/* Total Comments {grvTotalComments} */} 3
						</p>
					</div>
					<GrvCommentsTable po={po} setPo={setPo} />
				</div>

				{/* media section */}
				<div className="form-section form-section-media">
					<div className="form-section-media-title">
						<p className="form-section-title">Media</p>
					</div>
					<div className="grv-media media-pics">
						<div className="grv-meadi-heading">Pictures</div>
						<GrvFormMedia mediaData={po.poData.poGrv.grvMedia.grvPics} />
					</div>
					<div className="grv-media media-videos">
						<div className="grv-meadi-heading">Videos</div>
						<GrvFormMedia mediaData={po.poData.poGrv.grvMedia.grvVideos} />
					</div>
					<div className="grv-media media-voice">
						<div className="grv-meadi-heading">Voice</div>
						<GrvFormMedia mediaData={po.poData.poGrv.grvMedia.grvVoice} />
					</div>
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
export default GrvForm;
