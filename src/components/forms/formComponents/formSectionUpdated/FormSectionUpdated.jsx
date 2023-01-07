import moment from "moment";
import React, { useEffect } from "react";
import { MdLockClock, MdPerson } from "react-icons/md";
import useAuthContext from "../../../../hooks/useAuthContext";
import dateFormat, { masks } from "dateformat";

const FormSectionUpdated = ({
	po,
	setPo,
	modalData,
	sectionStates,
	setSectionStates,
}) => {
	console.log(`po`, po);
	const { user } = useAuthContext();
	useEffect(() => {
		setPo(prev => {
			return {
				...prev,
				metaData: {
					...prev.metaData,
					updatedAtDatetime:moment().format("YYYY-MM-DD HH:mm:ss") ,
					updatedByUser: user.displayName,
				},
			};
		});
	}, []);

	return (
		<div className={`fs fs-updated`}>
			<p className="fs-title">Updated</p>
			<div className="form-field po-form-updated-by-user">
				<span className="form form-field-icon">
					<MdPerson />
				</span>
				<input
					type="text"
					name="updatedByUser"
					id="updatedByUser"
					value={user.displayName}
					// onChange={handleChange}
					placeholder="Updated By User"
				/>
			</div>
			<div className="form form-field po-form-updated-at-datetime">
				<span className="form form-field-icon">
					<MdLockClock />
				</span>
				<input
					type="datetime-local"
					name="updatedAtDatetime"
					id="updatedAtDatetime"
					value={po.metaData.updatedAtDatetime}
					// onChange={handleChange}
					placeholder="Updated At Datetime"
				/>
			</div>
		</div>
	);
};

export default FormSectionUpdated;
