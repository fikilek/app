import React, { useState } from "react";
import { FaFileInvoiceDollar, FaShoppingBasket } from "react-icons/fa";
import { FcBusinessman, FcCellPhone } from "react-icons/fc";
import {
	MdBusiness,
	MdLockClock,
	MdOutlineEmail,
	MdPerson,
} from "react-icons/md";
import { RiMoneyCnyBoxLine } from "react-icons/ri";
import useCollection from "../../../../hooks/useCollection";

const FormSectionSupplier = ({
	po,
	setPo,
	modalData,
	sectionState,
	setSectionStates,
}) => {
	// get all suppliers from firestore collection
	// const suppliers = getSuppliers("suppliers")

	// const [suppliers, setSuppliers] = useState(initSuppliers);
	const { data: suppliers, error, isPending } = useCollection("suppliers")
	// console.log(`suppliers`, suppliers)

	const handleChangeSupplier = e => {
		e.preventDefault();
		// console.log(`e.target.id`, e.target.id);
		// console.log(`e.target.value`, e.target.value);
		const selectedSupplier = suppliers.find(
			supplier => supplier.id === e.target.value
		);
		// console.log(`selectedSupplier`, selectedSupplier);
		setPo(prev => {
			return {
				...prev,
				poSplData: {
					...prev.poSplData,
					id: selectedSupplier.id,
					splNo: selectedSupplier.splNo,
					splName: selectedSupplier.splName,
					splContactSurname: selectedSupplier.splContactSurname,
					splContactName: selectedSupplier.splContactName,
					splContactNo: selectedSupplier.splContactNo,
					splContactEmailAdr: selectedSupplier.splContactEmailAdr,
				},
			};
		});
	};

	return (
		<div className="fs fs-supplier">
			<p className="fs-title supplier-title">Supplier</p>

			<div className="form-field po-form-supplier-name">
				<span className="form-field-icon">
					<MdBusiness />
				</span>
				<select
					name="splName"
					id="splName"
					// value={po.poData.poGrv.grvStoreData.storeName}
					onChange={handleChangeSupplier}
					placeholder="Supplier Name"
				>
					{suppliers &&
						suppliers.map(supplier => {
							return (
								<option key={supplier.id} value={supplier.id}>
									{supplier.splName}
								</option>
							);
						})}
				</select>
			</div>

			<div className="form-field po-form-supplier-contact-surname">
				<span className="form-field-icon">
					<FcBusinessman />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="splContactSurname"
					id="splContactSurname"
					value={po.poSplData.splContactSurname}
					// onChange={handleSplDataChange}
					placeholder="Contact Surname"
				/>
			</div>
			<div className="form-field po-form-supplier-contact-name">
				<span className="form-field-icon">
					<FcBusinessman />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="splContactName"
					id="splContactName"
					value={po.poSplData.splContactName}
					// onChange={handleSplDataChange}
					placeholder="Contact Name"
				/>
			</div>
			<div className="form-field po-form-supplier-contact-no">
				<span className="form-field-icon">
					<FcCellPhone />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="splContactNo"
					id="splContactNo"
					value={po.poSplData.splContactNo}
					// onChange={handleSplDataChange}
					placeholder="Contact No"
				/>
			</div>
			<div className="form-field po-form-supplier-contact-email-adr">
				<span className="form-field-icon">
					<MdOutlineEmail />
				</span>
				<input
					readOnly="readOnly"
					type="email"
					name="splContactEmailAdr"
					id="splContactEmailAdr"
					value={po.poSplData.splContactEmailAdr}
					// onChange={handleSplDataChange}
					placeholder="Contact Email Adr"
				/>
			</div>
		</div>
	);
};
export default FormSectionSupplier;
