export const getTotalQauntites = (ar, quantity) => {
	return (
		ar &&
		ar.reduce(
			(accum, current) => (accum = accum + Number(current.itemQuantity)),
			0
		)
	);
};
