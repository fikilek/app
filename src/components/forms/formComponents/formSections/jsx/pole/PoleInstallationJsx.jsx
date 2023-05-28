import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const PoleInstallationJsx = props => {
  const { ast, trn, astCat, astCatIndex } = props;
  
	return (
			<FormSectionTrn
				trn={trn}
				ast={ast}
				astCat={astCat}
				astCatIndex={astCatIndex}
			>
				<div className="ast">
					<div className="row-1 ast-row read-only-row">
						<div className="data">
							<p>
								Pole No - <span>{ast?.astData.astNo}</span>
							</p>
						</div>
						<div className="photos"></div>
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
							label="pole lat/lon"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.astAdr.gps`}
							placeholder="Exact Gps"
						/>
					</div>
					<div className="row-3 ast-row">
						{/* premises and exact box location */}
						<FormikControl
							control="select"
							type="text"
							label="is pole inside or outside premises"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleInstallation.location.premises`}
							placeholder="Where is pole Placed"
							options={formSelectOptions.astLocationPremisesOptions}
						/>
					</div>
				</div>
			</FormSectionTrn>
	);
};

export default PoleInstallationJsx;
