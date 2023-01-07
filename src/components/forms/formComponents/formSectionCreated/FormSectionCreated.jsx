import moment from "moment";
import React, { useEffect } from "react";
import { MdLockClock, MdPerson } from "react-icons/md";
import useAuthContext from "../../../../hooks/useAuthContext";

const tsConverter = fbTs => {
	const jsTs = fbTs.toDate();
	console.log(`jsTs`, jsTs);
	return moment(jsTs).format("YYYY-MM-DD HH:mm:ss");
};

const FormSectionCreated = ({
	po,
	setPo,
	modalData,
	sectionStates,
	setSectionStates,
}) => {
	const { user } = useAuthContext();
	console.log(`po`, po);
	useEffect(() => {
		setPo(prev => {
			console.log(`prev`, prev);
			if (!prev.id) {
				// console.log(`There is no id, its a new doc, so do borth "updated" and "created" `)
				return {
					...prev,
					metaData: {
						...prev.metaData,
						createdAtDatetime: moment().format("YYYY-MM-DD HH:mm:ss"),
						createdByUser: user.displayName,
					},
				};
			} else {
				// console.log(`Its an exisitng doc, ONLY do "updated"`);
				return prev;
			}
		});
	}, []);
	return (
		<div className={`fs fs-created`}>
			<p className="fs-title">Created</p>
			<div className="form-field po-form-created-by-user">
				<span className="form-field-icon">
					<MdPerson />
				</span>
				<input
					type="text"
					name="createdByUser"
					id="createdByUser"
					value={po.metaData.createdByUser}
					// onChange={handleChange}
					placeholder="Created By User"
				/>
			</div>
			<div className="form form-field po-form-created-at-datetime">
				<span className="form-field-icon">
					<MdLockClock />
				</span>
				<input
					type="datetime-local"
					name="createdAtDatetime"
					id="createdAtDatetime"
					// value={tsConverter(po.metaData.createdAtDatetime)}
					value={moment((po.metaData.createdAtDatetime).toDate()).format("YYYY-MM-DD HH:mm:ss")}
					// onChange={handleChange}
					placeholder="Created At Datetime"
				/>
			</div>
		</div>
	);
};
export default FormSectionCreated;