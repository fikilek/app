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
	const { addDocument, response, updateDocument } = useFirestore("pos");
	// console.log(`response`, response);

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(`po`, po);
		if (po.id) {
			// there is an id. So the document exists. It therefore must only be updated.
			// console.log(`Updating doc:`, po);
			const id = po.id
			delete po.id
			updateDocument(po, id)
		} else {
			// there is no id. So the document is new. There add the document to the collection.
			// console.log(`Creating doc:`, po);
			addDocument(po);
		}
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
