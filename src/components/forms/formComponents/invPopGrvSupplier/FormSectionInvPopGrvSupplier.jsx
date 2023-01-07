import React from "react";
import FormSectionInvPopGrv from "../invPopGrv/FormSectionInvPopGrv";
import FormSectionSupplier from "../supplier/FormSectionSupplier";

const FormSectionInvPopGrvSupplier = ({
	po,
	setPo,
	sectionStates,
	setSectionStates,
}) => {
	// console.log(`sectionStates`, sectionStates);
	return (
		// fs - form section
		// fsh - form section header
		// fsb - form section body
		// fs-uc - form section updated created
		<div className={`fs fs-ipgs `}>
			<div className="fsh">
				<div className="open-colse-icons">
					<button
						type="button"
						onClick={() =>
							setSectionStates({
								...sectionStates,
								sectionInvPopGrvSupplier:
									sectionStates.sectionInvPopGrvSupplier === true ? false : true,
							})
						}
					>
						<div
							className={`icon ${
								sectionStates.sectionInvPopGrvSupplier ? "showSection" : "hideSection"
							}`}
						>
							-
						</div>
						<div
							className={`icon ${
								sectionStates.sectionInvPopGrvSupplier ? "hideSection" : "showSection"
							}`}
						>
							+
						</div>
					</button>
				</div>
				<div>
					<p>Form Section: Invoice, Proof Of Payment, Grv</p>
				</div>
			</div>
			<div
				className={`fsb ${
					sectionStates.sectionInvPopGrvSupplier ? "showSection" : "hideSection"
				}`}
			>
				<FormSectionInvPopGrv
					po={po}
					setPo={setPo}
					sectionState={sectionStates.sectionInvPopGrv}
					setSectionState={setSectionStates}
				/>
				<FormSectionSupplier
					po={po}
					setPo={setPo}
					sectionState={sectionStates.sectionInvPopGrv}
					setSectionState={setSectionStates}
				/>
			</div>
		</div>
	);
};

export default FormSectionInvPopGrvSupplier;
