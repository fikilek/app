import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { useFirestore } from "../../../hooks/useFirestore";
import FormSectionBtns from "./formSectionBtns/FormSectionBtns";
import FormSectionPoItems from "./formSectionPoItems/FormSectionPoItems";
import FormSectionUpdatedCreated from "./formSectionUpdatedCreated/FormSectionUpdatedCreated";
import FormSectionInvPopGrvSupplier from "./invPopGrvSupplier/FormSectionInvPopGrvSupplier";

const initSectionStates = {
	sectionUpdatedCreated: true,
	sectionInvPopGrvSupplier: false,
	sectionPoItems: false,
};

const FormBodyPo = ({ formData }) => {
	const { setComponentToOpen, setModalOpened } = useContext(ModalContext);
	const [sectionStates, setSectionStates] = useState(initSectionStates);
	// const [po, setForm] = useState(formData);
	const [po, setPo] = useState(formData);
	// console.log(`po`, po);
	const { addDocument, response } = useFirestore("pos");
	// console.log(`response`, response);

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(`po`, po);
		addDocument(po);
	};

	useEffect(() => {
		if (response.success) {
			setPo([]);
			setModalOpened(false);
			setComponentToOpen("");
		}
	}, [response]);

	return (
		<div className="form-body form-body-po">
			<form className="po-form" onSubmit={handleSubmit}>
				<FormSectionUpdatedCreated
					po={po}
					setPo={setPo}
					sectionStates={sectionStates}
					setSectionStates={setSectionStates}
				/>
				<FormSectionInvPopGrvSupplier
					po={po}
					setPo={setPo}
					sectionStates={sectionStates}
					setSectionStates={setSectionStates}
				/>
				<FormSectionPoItems
					po={po}
					setPo={setPo}
					sectionStates={sectionStates}
					setSectionStates={setSectionStates}
				/>
				<FormSectionBtns />
			</form>
		</div>
	);
};

export default FormBodyPo;
