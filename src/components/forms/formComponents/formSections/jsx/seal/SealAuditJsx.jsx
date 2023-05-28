import React from "react";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrnAst from "../../../formSection/FormSectionTrnAst";

const SealAuditJsx = props => {
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
							<FormikControl
								control="input"
								type="text"
								label="seal no"
								name={`astData[${astCat}][${astCatIndex}].astData.seal.no`}
								placeholder="Meter No"
							/>
							<FormikControl
								control="input"
								type="text"
								label="linked meter no"
								name={`astData[${astCat}][${astCatIndex}].trnData.sealInstallation.linkedMeterNo`}
								placeholder="Linked Meter No"
							/>
					</div>
				</div>
			</FormSectionTrnAst>
		</div>
	);
};

export default SealAuditJsx;
