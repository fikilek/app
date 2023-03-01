import { nanoid } from "@reduxjs/toolkit";
import totals3 from "../images/totals3.png";

// finction to generate rendom number betwen min and max
export const randomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getDbdTotals = data => {
	console.log(`data received by getDbdTotals`, data);
	const totals = { name: "totals", data: { asts: 0, trns: 0 }, astImg: totals3 };
	const objEnt = Object.entries(data.asts_totals);
	// console.log(`objEnt`, objEnt)
	// console.log(`totals.data.asts`, totals.data.asts);
	let tot = 0;
	objEnt &&
		objEnt.map(i => {
			// console.log(i[0], i[1])
			tot = tot + i[1];
			// console.log(tot);
		});
	totals.data.asts = tot;
	// console.log(`totals.data.asts`, totals.data.asts);

	return { totals, asts: objEnt };
};

// capilalize first letter of a string and the rest small letters
export const capitalize = string => {
	const firstLetter = string.charAt(0).toUpperCase();
	const restOfString = string.slice(1).toLowerCase();
	return string && `${firstLetter}${restOfString}`;
};

export const getSystemId = () => nanoid();

export const getGrvStatus = (inv, payment, cr, wr) => {
	// if (poInvStatus === false || poPopStatus === false) return "No Grv"
	// if (poInvStatus === true || poPopStatus === true) return "Created"
	if (inv === false && payment === false && cr === false && wr === false)
		return "No Grv";
	if (inv === true && payment === false && cr === false && wr === false)
		return "No Grv";
	if (inv === false && payment === true && cr === false && wr === false)
		return "No Grv";
	if (inv === true && payment === true && cr === false && wr === false)
		return "Created";
	if (inv === false && payment === false && cr === true && wr === false)
		return "No Grv";
	if (inv === true && payment === false && cr === true && wr === false)
		return "Created";
	if (inv === false && payment === true && cr === true && wr === false)
		return "No Grv";
	if (inv === true && payment === true && cr === true && wr === false)
		return "Received";
	if (inv === false && payment === false && cr === false && wr === true)
		return "No Grv";
	if (inv === true && payment === false && cr === false && wr === true)
		return "No Grv";
	if (inv === false && payment === true && cr === false && wr === true)
		return "No Grv";
	if (inv === true && payment === true && cr === false && wr === true)
		return "No Grv";
	if (inv === false && payment === false && cr === true && wr === true)
		return "No Grv";
	if (inv === true && payment === false && cr === true && wr === true)
		return "No Grv";
	if (inv === false && payment === true && cr === true && wr === true)
		return "No Grv";
	if (inv === true && payment === true && cr === true && wr === true)
		return "Witnessed";
};

export const getUidFromPo = ({ po, signatureName }) => {
	if (signatureName === "receiver") {
		return po.poData.poGrv.grvReceiver.grvReceiverUid;
	}
	if (signatureName === "witness") {
		return po.poData.poGrv.grvWitness.grvWitnessUid;
	}
	if (signatureName === "poApprove") {
		return po.poApprove.approveUid;
	}
	return null;
};

export const getPoAction = signatureName => {
	switch (signatureName) {
		case "poApprove":
			return "approved";
		case "receiver":
			return "received";
		case "witness":
			return "witnessed";
		default:
			return null;
	}
};

export const getPoStatus = po => {
	const poApproved = po.poApprove.approveUid;
	const poReceived = po.poData.poGrv.grvReceiver.grvReceiverUid;
	const poWitnessed = po.poData.poGrv.grvWitness.grvWitnessUid;
	if (!poApproved && !poReceived && !poWitnessed) return "created";
	if (poApproved && !poReceived && !poWitnessed) return "approved";
	if (poApproved && poReceived && !poWitnessed) return "received";
	if (poApproved && poReceived && poWitnessed) return "witnessed";
	return null;
};
