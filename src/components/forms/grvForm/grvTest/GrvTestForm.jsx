import { nanoid } from "@reduxjs/toolkit";
import React, { useContext } from "react";
import { useState } from "react";
import { MdBusiness } from "react-icons/md";
import { useDispatch } from "react-redux";
import { grvCreated } from "../../../../store/schSlice";
import { astTestDataCreated } from "../../../../store/astsSlice";
import { ModalContext } from "../../../../contexts/ModalContext";
import { db } from "../../../../firebaseConfig/fbConfig";
import { collection, addDoc } from "firebase/firestore";

const newGrvTestFormData = {
	// grvId: nanoid(),
	grvAstCartegory: "",
	grvAstNo: "",
};

const GrvTestForm = () => {
	const [grvFormData, setGrvFormData] = useState(newGrvTestFormData);
	// const dispatch  = useDispatch();

	const { setModalOpened, setComponentToOpen } = useContext(ModalContext);

	const handleChange = e => {
		e.preventDefault();
		setGrvFormData({
			...grvFormData,
			[e.target.id]: e.target.value,
		});
	};

	const handleCancel = e => {
		e.preventDefault();
		setModalOpened(false);
		setGrvFormData([]);
		setComponentToOpen("");
	};

	const handleSubmit = async e => {
		e.preventDefault();
		// console.log(`submit grvFormData`, grvFormData);

		const refGrvData = collection(db, "grvData");
		const refAstsTestDAta = collection(db, "astsTestData");

		const docRefGrv = await addDoc(refGrvData, grvFormData);
		const docId = docRefGrv.id;

		const docRefAsts = await addDoc(refAstsTestDAta, {
			grvId: docId,
			astCartegory: grvFormData.grvAstCartegory,
			astNo: grvFormData.grvAstNo,
		});

		setModalOpened(false);
		setGrvFormData([]);
		setComponentToOpen("");
	};

	return (
		//grv test form - gtf

		<div className="grv-container">
			<div className="grv-test-form-header">
				<p>Grv Test Form</p>
			</div>

			<div className="grv-test-form-body">
				<form className="gt">
					<div className="form-field gtf-grv-ast-cartegory">
						<span className="form-field-icon">
							<MdBusiness />
						</span>
						<input
							type="text"
							name="grvAstCartegory"
							id="grvAstCartegory"
							value={grvFormData.grvAstCartegory}
							onChange={handleChange}
							placeholder="Grv Ast Cartegory"
						/>
					</div>
					<div className="grv-test-form-body">
						<div className="form-field gtf-grv-astno">
							<span className="form-field-icon">
								<MdBusiness />
							</span>
							<input
								type="text"
								name="grvAstNo"
								id="grvAstNo"
								value={grvFormData.grvAstNo}
								onChange={handleChange}
								placeholder="Grv Ast No"
							/>
						</div>
					</div>
					<div className="form-btns">
						<button
							onClick={handleCancel}
							className="grv-test-form-footer-cancel-btn"
						>
							Cancel
						</button>
						<button
							onClick={handleSubmit}
							className="grv-test-form-footer-submit-btn"
						>
							Submit
						</button>
					</div>
				</form>
			</div>

			<div className="grv-test-form-footer"></div>
		</div>
	);
};

export default GrvTestForm;
