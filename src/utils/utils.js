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
