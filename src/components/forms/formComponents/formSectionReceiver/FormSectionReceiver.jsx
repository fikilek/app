import React from "react";
import { useState } from "react";
import { FcBusinessman, FcCellPhone } from "react-icons/fc";
import { MdEmail, MdOutlineEmail, MdPassword } from "react-icons/md";
import useAuthContext from "../../../../hooks/useAuthContext";
import FormError from "../formError/FormError";
import FormSectionBtns from "../formSectionBtns/FormSectionBtns";

const FormSectionReceiver = ({ po, setPo }) => {
	// get detailes of the signed on user
	const { user } = useAuthContext();

	// get detailes of the receiver from firebase auth using uid
	const receiver = {
		dispalyName: "Zuko Fubu",
		email: "zuko@gmail.com",
		phoneNumber: "081 726 2352",
	};

	// const receiver = null;
	const [pwd, setPwd] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		// authenticate the user from firebase auth
		const confirmedReceiver = {
			email: user.email,
			pwd: pwd,
		}
		console.log(`receivering PO`, user.email);

	};

	return (
		// fs: form section
		// fsr: form section receiver

		<div className="fs fs-fsb-grv fsb-grv-receiver">
			<p className="fs-title receiver-title">Receiver</p>
			{receiver ? (
				<div className="fsw fsr-received">
					<div className="received-msg">
						<p>
							This confirms that the goods in this Purchase Order has been received.
						</p>
					</div>
					<div className="grv-receiver">
						<p>{receiver.dispalyName}</p>
						<p>{receiver.phoneNumber}</p>
						<p>{receiver.email}</p>
					</div>
					<div className="cancell-receivereing">
						<button type="button">Cancel Witenssing</button>
					</div>
				</div>
			) : (
				<div className="fsw fsw-not-receivered">
					<div className="not-receivered-msg">
						<p>
							The goods in this Purchase Order have not been receivered as yet. To
							receive, type user password and click the received btn below.
						</p>
					</div>
					<div className="receiver-form">
						<form onClick={handleSubmit}>
							<div className="form-field form-field-email">
								<span className="form-field-icon">
									<MdEmail />
								</span>
								<input
									disabled
									type="email"
									name="email"
									id="email"
									value={user.email}
									placeholder="enter email used for signin"
								/>
							</div>
							<div className="form-field form-field-password">
								<span className="form-field-icon">
									<MdPassword />
								</span>
								<input
									autoFocus
									type="password"
									name="password"
									id="pwd"
									placeholder="Password"
									value={pwd}
									onChange={e => setPwd(e.target.value)}
								/>
							</div>
							<FormSectionBtns />
							<FormError />
						</form>
					</div>
				</div>
			)}
		</div>
	);
};
export default FormSectionReceiver;
