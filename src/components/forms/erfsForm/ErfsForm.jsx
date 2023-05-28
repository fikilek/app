import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";

import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import useAuthContext from "../../../hooks/useAuthContext";
import { toast } from "react-toastify";
import FormikControl from "../formComponents/formik/FormikControl";
import FormBtn from "../formComponents/formBtn/FormBtn";
import FormSection from "../formComponents/formSection/FormSection";
import FormHeader4 from "../formComponents/formHeaders/FormHeader4";
import { formSelectOptions } from "../../../utils/utils";

const ErfsForm = props => {
	const { formData } = props;
	const { closeModal } = useModal();
	// console.log(`formData`, formData);

	const [active, setActive] = useState(null);

	// const { getTrnFormSection, getTrnValidationSchema } = useTrnForm(trn);

	const { response, updateDocument, addDocument } = useFirestore("erfs");

	const { user } = useAuthContext();
	// console.log(`user`, user)

	// const trnSpecificData = getTrnFormSection(
	// 	trn.astData.astCartegory,
	// 	trn.metaData.trnType
	// );
	// console.log(`trnSpecificData`, trnSpecificData)
	// const { jsx, trnData } = trnSpecificData;

	// const [_trn, set_trn] = useState({
	// 	...trn,
	// 	metaData: {
	// 		...trn.metaData,
	// 		updatedAtDatetime: timestamp.fromDate(new Date()),
	// 		updatedByUser: user.displayName,
	// 	},
	// 	trnData: trn.id ? trn.trnData : trnData,
	// });

	const onSubmit = values => {
		// console.log(`formik submitted values`, values);
		if (values.id) {
			updateDocument(values);
		} else {
			addDocument(values);
		}
	};

	// console.log(`response`, response);

	useEffect(() => {
		if (response.success) {
			closeModal();
			toast(
				`${formData.erfNo} ?  ${formData.erfNo} UPDATED' : Erf CREATED succeesfully!`,
				{
					position: "bottom-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				}
			);
		}
	}, [response, closeModal, formData.erfNo]);

	return (
		<div className="form-wrapper">
			<div className="form-container simcards-form-container">
				<FormHeader4
					formName={"Erf"}
					formNo={formData.erfNo}
					closeModal={closeModal}
				/>
				<Formik
					initialValues={formData}
					onSubmit={onSubmit}
					// validationSchema={getTrnValidationSchema(
					// 	trn.astData.astCartegory,
					// 	trn.metaData.trnType
					// )}
				>
					{formik => {
						const disabled = !(formik.isValid && formik.dirty);
						// console.log(`formik.dirty`, formik.dirty);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`disabled`, disabled);
						// console.log(`formik.values`, formik.values);

						return (
							<Form>
								{/* trn form */}
								<div className="trn-form">
									{/* erf no and gps */}
									<FormSection
										sectionData={{
											sectionName: "erf-gps",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="erf-gps-wrapper">
											<FormikControl
												control="input"
												type="text"
												label="erf no"
												name="erfNo"
												placeholder="Erf No"
											/>
											<FormikControl
												control="input"
												type="text"
												label="longitude"
												name="gps.longitude"
												placeholder="Gps Longitude"
											/>
											<FormikControl
												control="input"
												type="text"
												label="latitude"
												name="gps.latitude"
												placeholder="Latitude"
											/>
										</div>
									</FormSection>

									{/* customer */}
									<FormSection
										sectionData={{
											sectionName: "customer",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="customer-cartegory-type">
											<FormikControl
												control="select"
												type="text"
												label="custormer cartegory"
												name="customer.cartegory"
												placeholder="Custormer Cartegory"
												options={formSelectOptions.customerCartegoryOptions}
											/>
											<FormikControl
												control="select"
												type="text"
												label="custormer type"
												name="customer.type"
												placeholder="Custormer Type"
												options={formSelectOptions.customerTypeOptions}
											/>
										</div>
										<div
											className={`customer-type-warm-body ${
												formik.values.customer.type === "warm body"
													? "show-section"
													: "hide-section"
											}`}
										>
											<FormikControl
												control="input"
												type="text"
												label="surname"
												name="customer.warmBody.surname"
												placeholder="Surname"
											/>
											<FormikControl
												control="input"
												type="text"
												label="name"
												name="customer.warmBody.name"
												placeholder="Name"
											/>
											<FormikControl
												control="input"
												type="text"
												label="id no"
												name="customer.warmBody.idNo"
												placeholder="Id No"
											/>
											<FormikControl
												control="select"
												type="text"
												label="gender"
												name="customer.warmBody.gender"
												placeholder="Gender"
												options={formSelectOptions.genderOptions}
											/>
										</div>
										<div
											className={`customer-type-juristic-person ${
												formik.values.customer.type === "juristic person"
													? "show-section"
													: "hide-section"
											} `}
										>
											<FormikControl
												control="input"
												type="text"
												label="legal name"
												name="customer.juristicPerson.name"
												placeholder="Legal ame"
											/>
											<FormikControl
												control="input"
												type="text"
												label="trading name"
												name="customer.juristicPerson.tradingName"
												placeholder="Trading Name"
											/>
											<FormikControl
												control="input"
												type="text"
												label="registered CIPC name"
												name="customer.juristicPerson.registeredName"
												placeholder="Registered CIPC Nane"
											/>
											<FormikControl
												control="input"
												type="text"
												label="registered CIPC no"
												name="customer.juristicPerson.registeredNo"
												placeholder="Registered CIPC No"
											/>
										</div>
										<div className="custormer-billing"></div>
									</FormSection>

									{/* contact-person */}
									<FormSection
										sectionData={{
											sectionName: "customer-contact-person",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="contact-person">
											<FormikControl
												control="input"
												type="text"
												label="surname"
												name="customer.contactPerson.surname"
												placeholder="Surname"
											/>
											<FormikControl
												control="input"
												type="text"
												label="name"
												name="customer.contactPerson.name"
												placeholder="Name"
											/>
											<FormikControl
												control="input"
												type="text"
												label="land line"
												name="customer.contactPerson.landLine"
												placeholder="Land Line"
											/>
											<FormikControl
												control="input"
												type="text"
												label="WhatsApp"
												name="customer.contactPerson.whatsApp"
												placeholder="WhatsApp"
											/>
											<FormikControl
												control="input"
												type="text"
												label="cell no"
												name="customer.contactPerson.cellNo"
												placeholder="Cell No"
											/>
											<FormikControl
												control="input"
												type="text"
												label="email adr"
												name="customer.contactPerson.emailAdr"
												placeholder="Email Adr"
											/>
										</div>
									</FormSection>

									{/* address */}
									<FormSection
										sectionData={{
											sectionName: "customer-adr",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="customer-adr-wrapper">
											<div className="customer-address">
												<FormikControl
													control="input"
													type="text"
													label="street address"
													name="address.street"
													placeholder="Street Address"
												/>
												<FormikControl
													control="input"
													type="text"
													label="suburd / tship"
													name="address.suburbTownship"
													placeholder="Suburb / Tship"
												/>
											</div>
											<div className="munic-town-suburb">
												<FormikControl
													control="input"
													type="text"
													label="towm"
													name="address.town"
													placeholder="Town"
												/>
												<FormikControl
													control="input"
													type="text"
													label="ward no"
													name="address.ward"
													placeholder="Ward No"
												/>
												<FormikControl
													control="input"
													type="text"
													label="local municipality / metro"
													name="address.lmMetro"
													placeholder="municipality"
												/>
												<FormikControl
													control="input"
													type="text"
													label="district municipality"
													name="address.dm"
													placeholder="municipality"
												/>
											</div>
											<div className="province-country">
												<FormikControl
													control="input"
													type="text"
													label="province"
													name="address.province"
													placeholder="province"
												/>
												<FormikControl
													control="input"
													type="text"
													label="country"
													name="address.country"
													placeholder="Country"
												/>
												<FormikControl
													control="input"
													type="text"
													label="system address"
													name="address.systemAdr"
													placeholder="system address"
												/>
											</div>
										</div>
									</FormSection>

									{/* billig */}
									<FormSection
										sectionData={{
											sectionName: "billing",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="billing-wrapper">
											<FormikControl
												control="input"
												type="text"
												label="tariff"
												name="billing.tariff"
												placeholder="Tariff"
											/>
											<FormikControl
												control="select"
												type="text"
												label="indigent?"
												name="billing.indigent"
												placeholder="Indigent"
												options={formSelectOptions.yesNoOptions}
											/>
											<FormikControl
												control="input"
												type="text"
												label="Accounts"
												name="billing.accountNo.length"
												placeholder="Accounts"
											/>
											<FormikControl
												control="select"
												type="text"
												label="stand use"
												name="standUse"
												placeholder="stand use"
												options={formSelectOptions.standUseOptions}
											/>
										</div>
									</FormSection>

									{/* metadata */}
									<FormSection
										sectionData={{
											sectionName: "metadata",
											// astCat: trn.astData.astCartegory,
											// trnType: trn.metaData.trnType,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="metadata-updated-created">
											{/* updated */}
											<div className="updated">
												<FormikControl
													control="input"
													type="text"
													label="updated by user"
													name="metaData.updatedByUser"
													readOnly="readOnly"
													placeholder="updated by user"
												/>

												<FormikControl
													control="datetime"
													label="updated at datetime"
													name="metaData.updatedAtDatetime"
													readOnly="readOnly"
													dateFormat="yyyy MM dd - HH:mm:ss"
													placeholder="updated at datetime"
												/>
											</div>

											{/* create */}
											<div className="created">
												<FormikControl
													control="input"
													type="text"
													label="created by user"
													name="metaData.createdByUser"
													readOnly="readOnly"
													placeholder="created by user"
												/>

												<FormikControl
													control="datetime"
													label="created at datetime"
													name="metaData.createdAtDatetime"
													readOnly="readOnly"
													dateFormat="yyyy MM dd - HH:mm:ss"
													placeholder="dated at datetime"
												/>
											</div>
										</div>
									</FormSection>

									<div className="form-btns">
										<FormBtn isPending={false} btnName="reset" />
										<FormBtn
											isPending={response.isPending}
											btnName="submit"
											disabled={disabled}
										/>
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};
export default ErfsForm;
