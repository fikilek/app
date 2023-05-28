import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrnAst from "../../../formSection/FormSectionTrnAst";

const MeterAuditJsx = props => {
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
								control="input"
								type="text"
								label="meter no"
								name={`astData[${astCat}][${astCatIndex}].astData.astNo`}
								placeholder="Meter No"
							/>
							<FormikControl
								// readOnly={true}
								control="input"
								type="text"
								label="meter serial no"
								name={`astData[${astCat}][${astCatIndex}].astData.astSerialNo`}
								placeholder="Meter Serail No"
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="meter phase"
								name={`astData[${astCat}][${astCatIndex}].astData.${astCat}.meter.phase`}
								placeholder="Phase"
								options={formSelectOptions.meterPhaseOptions}
							/>
							<FormikControl
								control="select"
								type="text"
								label="meter type"
								name={`astData[${astCat}][${astCatIndex}].astData.${astCat}.meter.type`}
								placeholder="Type"
								options={formSelectOptions.meterTypeOptions}
							/>
						</div>
					</div>
					<div className="row-2 ast-row">
						<div className="meter-adr">
							<FormikControl
								control="input"
								type="text"
								label="meter address"
								name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.astAdr.adr`}
								placeholder="Meter Adr"
							/>
						</div>
						<div className="meter-gps">
							<FormikControl
								// readOnly={true}
								control="input"
								type="text"
								label="meter gps(lat/lon)"
								name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.astAdr.gps`}
								placeholder="Meter Gps"
							/>
						</div>
					</div>
					<div className="row-3 ast-row">
						<FormikControl
							control="select"
							type="text"
							label="is meter outside or inside premises?"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.location.premises`}
							placeholder="Service Connection Entry"
							options={formSelectOptions.astLocationPremisesOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="is meter inside box?"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.location.insideBox`}
							placeholder="inside Box"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
					<div className="row-4 ast-row">
						<FormikControl
							control="select"
							type="text"
							label="exact location?"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.location.exactLocation`}
							placeholder="Exact Location"
							options={formSelectOptions.astExactLocationOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="service connection"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.serviceConnection.connection`}
							placeholder="Service Connection Entry"
							options={formSelectOptions.serviceConnectionEntryOptions}
						/>
					</div>
					<div className="row-5 ast-row">
						<FormikControl
							control="input"
							type="text"
							label="keypad serial no"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.keyPad.serialNo`}
							placeholder="Keypad Serial No"
						/>
						<FormikControl
							readOnly={true}
							control="input"
							type="text"
							label="keypad photos"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.keyPad.photos.length`}
							placeholder="Keypad Photos"
						/>
					</div>
				</div>
			</FormSectionTrnAst>
		</div>
	);
};

export default MeterAuditJsx;
