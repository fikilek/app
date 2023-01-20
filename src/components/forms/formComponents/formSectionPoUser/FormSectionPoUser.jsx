import React from "react";
import "./FormSectionPoUser.css";
import moment from "moment";
import { useDocument } from "../../../../hooks/useDocument";
import { getUidFromPo } from "../../../../utils/utils";

const FormSectionPoUser = ({ po, formSectionName }) => {

	// get detailes of the receiver from firebase auth using uid
	const uid = getUidFromPo({ po, formSectionName });

	// console.log(`uid`, uid)
	const {error, document: receiver} = useDocument("users", uid)

	return (
		// fss: form sub section
		<div className="fss fss-po-user">
			<p className="fss-po-user-header">{formSectionName}</p>
			<div className="fss-po-user-body">
				{receiver ? (
					<div className="fss-po-user-body-receiver">
						<p>Name: {receiver.displayName}</p>
						<p>Email: {receiver.email}</p>
						<p>Phone: {receiver.phoneNumber}</p>
						<p>
							Date:{" "}
							{moment(
								po.poData.poGrv.grvGoodsReceiver.grvGoodsReceiverDate.toDate()
							).format("YYYY-MM-DD HH:mm:ss")}
						</p>
					</div>
				) : (
					<div className="fss-po-user-body-no-receiver">
						<p> Not Data </p>
					</div>
				)}
			</div>
			<p className="fss-po-user-error">{error}</p>
		</div>
	);
};
export default FormSectionPoUser;
