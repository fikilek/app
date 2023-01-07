import React from "react";
import FormSectionCreated from "../formSectionCreated/FormSectionCreated";
import FormSectionUpdated from "../formSectionUpdated/FormSectionUpdated";

const FormSectionUpdatedCreated = ({
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
		// fsuc - form section updated created
		<div className={`fs fs-uc`}>
			<div className="fsh">
				<div className="open-colse-icons">
					<button
						type="button"
						onClick={() =>
							setSectionStates({
								...sectionStates,
								sectionUpdatedCreated:
									sectionStates.sectionUpdatedCreated === true ? false : true,
							})
						}
					>
						<div
							className={`icon ${
								sectionStates.sectionUpdatedCreated ? "showSection" : "hideSection"
							}`}
						>
							-
						</div>
						<div
							className={`icon ${
								sectionStates.sectionUpdatedCreated ? "hideSection" : "showSection"
							}`}
						>
							+
						</div>
					</button>
				</div>
				<div>
					<p>Form Section: Updated / Created</p>
				</div>
			</div>
			<div
				className={`fsb ${
					sectionStates.sectionUpdatedCreated ? "showSection" : "hideSection"
				}`}
			>
				<FormSectionUpdated
					po={po}
					setPo={setPo}
					sectionState={sectionStates.sectionUpdatedCreated}
					setSectionState={setSectionStates}
				/>
				<FormSectionCreated
					po={po}
					setPo={setPo}
					sectionState={sectionStates.sectionUpdatedCreated}
					setSectionState={setSectionStates}
				/>
			</div>
		</div>
	);
};

export default FormSectionUpdatedCreated;
