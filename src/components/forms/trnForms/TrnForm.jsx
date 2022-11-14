import React, { useContext, useState, useEffect, useMemo } from "react";
// import "./trnForm.css";
import {
	MdFormatListNumbered,
	MdHistory,
	MdLockClock,
	MdMyLocation,
	MdPerson,
	MdWebAsset,
} from "react-icons/md";
import { GiChoice } from "react-icons/gi";
import { ModalContext } from "../../../contexts/ModalContext";
import { UserContext } from "../../../contexts/PoContext";
import { useNavigate } from "react-router-dom";
import grv1 from "../../../images/grv1.png";
import { capitalize } from "../../../utils/utils";
import TrnFormMeter from "./trnFormAst/trmFormMeter/TrnFormMeter";

const TrnForm = () => {
	// console.log(`TrnForm running`)
	// this section controls the display of the modal
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	console.log(`componentToOpen`, componentToOpen);

	const trnData = useMemo(
		() => JSON.parse(componentToOpen.payload),
		[componentToOpen.payload]
	);
	console.log(`trnData`, trnData);

	// trn form data this.state
	// const [trnFormData, setTrnFormData] = useState(trnData);
	// console.log(`trnFormData`, trnFormData);

	// const { trnType } = trnFormData;
	// console.log(`trnType`, trnType)

	// const { menuStatus, setMenuStatus } = useContext(MenuContext);
	// const { user, setUser } = useContext(UserContext);

	// const navigate = useNavigate();

	const handleModalCloseBtn = e => {
		setModalOpened(false);
		setComponentToOpen({
			...componentToOpen,
			name: "",
		});
	};

	// const handleSigninSubmit = e => {
	// 	e.preventDefault();
	// 	console.log(`trnFormData`, trnFormData);
	// };

	// const handleChange = e => {
	// 	console.log(`e`, e.target.value);
	// 	console.log(`e`, e.target.name);
	// 	setTrnFormData({
	// 		...trnFormData,
	// 		[e.target.name]: e.target.value,
	// 	});
	// };

	// console.log(`trnFormData.asset.astCartegory`, trnFormData.asset.astCartegory);

	return (
		<div className="ireps-form-container">
			<div className="ireps-form">
				<div className="trn-form-header ireps-form-header">
					<div className="trn-form-header-title-img">
						<h1 className="trn-form-header-title">
							{capitalize(trnData.trnType)} Form
						</h1>
						<img src={grv1} alt="grv images" className="grv-img" />
					</div>
					<div className="trn-form-header-close-btn" onClick={handleModalCloseBtn}>
						<div className="btn-div" id="btn-div">
							<button>X</button>
						</div>
					</div>
				</div>

				{/* <>{trnFormData.astCatergory === 'vtct' ? <TrnFormVtct /> : ''} </>
				<>{trnFormData.astCatergory === 'transformer' ? <TrnFormTransformer /> : ''}</>
				<>{trnFormData.astCatergory === 'feeder' ? <TrnFormFeeder /> : ''}</>
				<>{trnFormData.astCatergory === 'pole' ? <TrnFormPole /> : ''}</>
				<>{trnFormData.astCatergory === 'box' ? <TrnFormBox /> : ''}</> */}
				<>{trnData.assetData.astCartegory === "meter" ? <TrnFormMeter /> : ""}</>
				{/* <>{trnFormData.astCatergory === 'cb' ? <TrnFormCuircuitBreaker /> : ''}</>
				<>{trnFormData.astCatergory === 'seal' ? <TrnFormSeal /> : ''}</> */}
			</div>
		</div>
	);
};
export default TrnForm;
