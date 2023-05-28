import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrnAst from "../../../formSection/FormSectionTrnAst";

const PoleAuditJsx = props => {
	const { ast, trn, astCat, astCatIndex } = props;

	return (
		<FormSectionTrnAst
			trn={trn}
			ast={ast}
			astCat={astCat}
			astCatIndex={astCatIndex}
		>
			<div className="ast">
				<div className="row-1 ast-row">
					<FormikControl
						control="input"
						type="text"
						label="pole no"
						name={`astData[${astCat}][${astCatIndex}].astData.astNo`}
						placeholder="Pole No"
					/>
					<FormikControl
						control="select"
						type="text"
						label="pole type"
						name={`astData[${astCat}][${astCatIndex}].astData.${astCat}.pole.type`}
						placeholder="Pole Type"
						options={formSelectOptions.poleTypeOptions}
					/>
				</div>
				<div className="row-2 ast-row">
					<FormikControl
						control="input"
						type="text"
						label="exact/nearest pole address"
						name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.astAdr.adr`}
						placeholder="exact/nearest address"
					/>
					{/* TODO: figure out how to display gps. THis will be stored as a string in firestore so it will be dispalyed on ui as a gps string */}
					<FormikControl
						// readOnly={true}
						control="input"
						type="text"
						label="exact pole (gps) lat/lon"
						name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.astAdr.gps`}
						placeholder="Exact Gps"
					/>
				</div>
				<div className="row-4 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="premises?"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.location.premises`}
							placeholder="Where is pole Placed"
							options={formSelectOptions.astLocationPremisesOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="pole type"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.astData.pole.type`}
							placeholder="Pole type"
							options={formSelectOptions.poleTypeOptions}
						/>
					</div>
					<div className="half-row-50-50">
						{/* premises and exact box location */}
						<FormikControl
							control="select"
							type="text"
							label="health condition?"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.poleCondition.health`}
							placeholder="Health Condition?"
							options={formSelectOptions.goodBadOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="is pole leaning?"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.poleCondition.leaning`}
							placeholder="Is Pole Leaning?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
				</div>
				<div className="row-6 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="has attached lamp?"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.streetLamp.hasAttachedLamp`}
							placeholder="Has Attached Lamp?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="input"
							type="text"
							label="linked lamp no"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.streetLamp.lampNo`}
							placeholder="Linked Lamp No?"
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="has attached box?"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.box.hasAttachedBox`}
							placeholder="Has Attached Box"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="input"
							type="text"
							label="linked box no"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.box.boxNo`}
							placeholder="linked Box No?"
						/>
					</div>
				</div>
			</div>
		</FormSectionTrnAst>
	);
};

export default PoleAuditJsx;
