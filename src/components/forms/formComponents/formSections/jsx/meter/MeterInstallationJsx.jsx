import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const MeterInstallationtJsx = props => {
	const { ast, trn, astCat, astCatIndex, trnType } = props;

	return (
		<FormSectionTrn
			trn={trn}
			ast={ast}
			astCatIndex={astCatIndex}
			trnType={trnType}
		>
			<div className="ast">
				<div className="row-1 ast-row read-only-row">
					<div className="data">
						{/* <p>Meter No - <span>{ast?.astData.astNo}</span></p> */}
						<p>
							Meter Phase - <span>{ast?.astData.meter.phase}</span>
						</p>
						<p>
							Meter Type - <span>{ast?.astData.meter.type}</span>
						</p>
						<p>
							Meter Name - <span>{ast?.astData.meter.name}</span>
						</p>
						<p>
							Meter Code - <span>{ast?.astData.meter.code}</span>
						</p>
					</div>
					<div className="phtos"></div>
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
				<div className="row-6 ast-row">
					<div className="half-row">
						<FormikControl
							control="select"
							type="text"
							label="linked to cb?"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.linkedCb.isLinkedToCb`}
							placeholder="Is Linked To Cb?"
							options={formSelectOptions.yesNoOptions}
						/>
						{/* TODO: implement a hid/show depending on the yes/no answer */}
						<FormikControl
							control="input"
							type="text"
							label="linked cb no"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.linkedCb.cbNo`}
							placeholder="Cb No"
						/>
					</div>
					<div className="half-row">
						<FormikControl
							control="select"
							type="text"
							label="linked seal?"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.linkedSeal.isLinkedToSeal`}
							placeholder="Is Linked To Seal?"
							options={formSelectOptions.yesNoOptions}
						/>
						{/* TODO: implement a hid/show depending on the yes/no answer */}
						<FormikControl
							control="input"
							type="text"
							label="linked seal no"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.linkedSeal.sealNo`}
							placeholder="Seal No"
						/>
					</div>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default MeterInstallationtJsx;
