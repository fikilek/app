import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { useFirestore } from "../../../hooks/useFirestore";
import FormSectionBtns from "./formSectionBtns/FormSectionBtns";
import FormSectionPoItems from "./formSectionPoItems/FormSectionPoItems";
import FormSectionInvPopGrvSupplier from "./formSectionInvPopSupplier/FormSectionInvPopSupplier";
import FormSectionMetadata from "./formSectionMetadata/FormSectionMetadata";
import FormSectionGrv from "./formSectionGrv/FormSectionGrv";

const FormBodyPo = ({ formData }) => {
	const { setComponentToOpen, setModalOpened } = useContext(ModalContext);
	// const [po, setForm] = useState(formData);
	const [po, setPo] = useState(formData);
	// console.log(`po`, po);
	const [active, setActive] = useState(null);
	// console.log(`active`, active);
	const { addDocument, response, updateDocument } = useFirestore("pos");
	// console.log(`response`, response);

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(`po`, po);
		if (po.id) {
			// there is an id. So the document exists. It therefore must only be updated.
			console.log(`Updating doc:`, po);
			// const id = po.id;
			// delete po.id;
			updateDocument(po);
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
				<FormSectionMetadata
					po={po}
					setPo={setPo}
					active={active}
					setActive={setActive}
				/>
				<FormSectionInvPopGrvSupplier
					po={po}
					setPo={setPo}
					active={active}
					setActive={setActive}
				/>
				<FormSectionPoItems
					po={po}
					setPo={setPo}
					active={active}
					setActive={setActive}
				/>
				{(po.id || !response.isPending) &&  (
					<FormSectionGrv
						po={po}
						setPo={setPo}
						active={active}
						setActive={setActive}
					/>
				)}
				<FormSectionBtns />
			</form>
		</div>
	);
};

export default FormBodyPo;
