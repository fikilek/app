import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const PoleCommissioningJsx = props => {
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
						<p className="data-header">PO / Stores Data</p>
						<p>
							Asset No - <span>{ast?.astData.astNo}</span>
						</p>
						<p>
							Pole Code - <span>{ast?.astData.pole.code}</span>
						</p>
					</div>

					<div className="data">
						<p className="data-header">Installation Data</p>
						<p>
							Location - premises
							<span>
								{
									trn.astData[astCat][astCatIndex][`${astCat}Installation`].location
										.premises
								}
							</span>
						</p>
						<p>
							Asset physical address -
							<span>
								{trn.astData[astCat][astCatIndex][`${astCat}Installation`].astAdr.adr}
							</span>
						</p>
						<p>
							Asset address gps -
							<span>
								{trn.astData[astCat][astCatIndex][`${astCat}Installation`].astAdr.gps}
							</span>
						</p>
					</div>
					{/* <div className="photos"></div> */}
				</div>
				<div className="row-2 ast-row">
					<FormikControl
						control="select"
						type="text"
						label="installation data verified?"
						name={`astData[${astCat}][${astCatIndex}].trnData.poleCommissioning.installationDataVerified`}
						placeholder="installation data verified?"
						options={formSelectOptions.yesNoOptions}
					/>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default PoleCommissioningJsx;
