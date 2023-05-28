import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrnAst from "../../../formSection/FormSectionTrnAst";

const BoxAuditJsx = props => {
	const { ast, trn, astCat, astCatIndex } = props;

	return (
		<div>
			<FormSectionTrnAst
				trn={trn}
				ast={ast}
				astCat={astCat}
				astCatIndex={astCatIndex}
			>
				<div className="ast">
					<div className="row-1 ast-row">
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="box type"
								name={`astData[${astCat}][${astCatIndex}].astData.box.type`}
								placeholder="Box Type"
								options={formSelectOptions.boxTypeOptions}
							/>
							<FormikControl
								// readOnly={true}
								control="input"
								type="text"
								label="box no"
								name={`astData[${astCat}][${astCatIndex}].astData.${astCat}.astNo`}
								placeholder="Box No"
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								// readOnly={true}
								control="select"
								type="text"
								label="is box lockable?"
								name={`astData[${astCat}][${astCatIndex}].trnData.boxInstallation.lockable`}
								placeholder="Is Box Lockable?"
								options={formSelectOptions.yesNoOptions}
							/>
							<FormikControl
								control="select"
								type="text"
								label="is box locked?"
								name={`astData[${astCat}][${astCatIndex}].astData.${astCat}.trnData.boxInstallation.isLocked`}
								placeholder="Is Box Locked?"
								options={formSelectOptions.yesNoOptions}
							/>
						</div>{" "}
					</div>
					<div className="row-3 sc-row">
						{/* service connection form- meter/cb/erfNo */}
						<FormikControl
							control="scFieldArray"
							type="text"
							name={`astData[${astCat}][${astCatIndex}].trnData.boxInstallation.scns`}
							astCat={astCat}
							astCatIndex={astCatIndex}
						/>
					</div>
				</div>
			</FormSectionTrnAst>
		</div>
	);
};

export default BoxAuditJsx;
