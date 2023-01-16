import React from "react";
import FormShowHideSection from "../formShowHideSection/FormShowHideSection";
import FormSectionInvPopGrv from "../formSectioninvPop/FormSectionInvPop";
import FormSectionSupplier from "../formSectionSupplier/FormSectionSupplier";
import FormSectionStores from "../formSectionStores/FormSectionStores";
import FormSectionWitness from "../formSectionWitness/FormSectionWitness";
import FormSectionReceiver from "../formSectionReceiver/FormSectionReceiver";

const FormSectionGrv = ({ po, setPo, active, setActive }) => {
	return (
		// fs - form section
		// fsh - form section header
		// fsb - form section body
		// fs-rws = form section receipt - witness - stores
		<div className={`fs fs-grv `}>
			<div className="fsh">
				<div className="open-colse-icons">
					<FormShowHideSection
						sectionName={"grv"}
						active={active}
						setActive={setActive}
					/>
				</div>
				<div>
					<p>Form Section: Grv</p>
				</div>
			</div>
			<div
				className={`fsb fsb-grv ${active === "grv" ? "showSection" : "hideSection"}`}
			>
				<FormSectionReceiver po={po} setPo={setPo} />
				<FormSectionWitness po={po} setPo={setPo} />
				<FormSectionStores po={po} setPo={setPo} />
			</div>
		</div>
	);
};

export default FormSectionGrv;
