import React from "react";
import useModal from "../../../hooks/useModal";

const astCatMap = new Map([
	['meter', "MT"],
	['cb', "CB"],
	['seal', "Sl"],
	['box', "BX"],
	['pole', "PL"],
]);

const TrnAstCheckoutFormBtn = params => {
	// this component is use to launch a TrnAstCheckoutForm component where assets ca be checked out and inti a store
	// console.log(`params.data`, params.data)

	// get trn data
	const astCats = params.data.astData;
	// console.log(`astCats`, astCats);

	const astCatsObj = {
		astCatsTotal: 0,
		astCatsArray: [],
	};
	for (const astCat in astCats) {
		// console.log(`astCat`, astCat);
		astCatsObj.astCatsArray.push(`${astCatMap.get(astCat)}:${astCats[astCat].length}`);
		astCatsObj.astCatsTotal =
			astCatsObj.astCatsTotal + Number(astCats[astCat].length);
	}
	// console.log(`astCatsArray`, astCatsObj.astCatsArray);

	// get open modal rom useModal
	const { openModal } = useModal();

	// open trnAstCheckoutForm modal
	const handleClick = e => {
		openModal({
			modalName: "trnAstCheckoutForm",
			payload: params.data,
		});
	};

	// const NumberOfAsts = Number(meters) + Number(boxes) + Number(cbs) + Number(seals);
	const NumberOfAsts = astCatsObj.astCatsTotal;

	return (
		<div className="trn-ast-checkout">
			<button onClick={handleClick}>
				<span>{NumberOfAsts}</span>
			</button>
			<span>{` - `}</span>
			<button onClick={handleClick}>
				{astCatsObj.astCatsArray &&
					astCatsObj.astCatsArray.map((ast, index) => {
						return (
							<span key={index}>
								<span>{ast}</span>
								<span>{' | '}</span>
							</span>
						);
					})}
			</button>
		</div>
	);
};

export default TrnAstCheckoutFormBtn;
