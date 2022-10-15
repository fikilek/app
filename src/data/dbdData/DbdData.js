import { randomNumber } from "../../utils/utils";
import feeder1 from "../../images/feeder1.jpg";
import transformer2 from "../../images/transformer2.png";
import pole1 from "../../images/pole1.png";
import box2 from "../../images/box2.png";
import meter1 from "../../images/meter1.png";
import cb3 from "../../images/cb3.png";
import seal2 from "../../images/seal2.jpg";
import totals2 from "../../images/totals2.png";

// const getTotals = (astsTrnsTotals, item) => {
// 	return astsTrnsTotals && astsTrnsTotals.reduce(
// 		(accumulator, current) => (accumulator += current.data[item])
// 	);
// };

export class DbdData {
	constructor() {

		this.totals = [
			{
				name: "feeders",
				asts_quantities: 0,
				trns_quantities: 0,
				astImg: feeder1,
			},
			{
				name: "transformers",
				asts_quantities: 0,
				trns_quantities: 0,
				astImg: transformer2,
			},
			{
				name: "poles",
				asts_quantities: 0,
				trns_quantities: 0,
				astImg: pole1,
			},
			{
				name: "boxes",
				asts_quantities: 0,
				trns_quantities: 0,
				astImg: box2,
			},
			{
				name: "meters",
				asts_quantities: 0,
				trns_quantities: 0,
				astImg: meter1,
			},
			{
				name: "cbs",
				asts_quantities: 0,
				trns_quantities: 0,
				astImg: cb3,
			},
			{
				name: "seals",
				asts_quantities: 0,
				trns_quantities: 0,
				astImg: seal2,
			},
		];
		this.trns_monthly_totals = [
			{
				month: "january",
				data: {
					feeders: randomNumber(0, 100),
					poles: randomNumber(0, 100),
					boxes: randomNumber(0, 100),
					meters: randomNumber(0, 100),
					cbs: randomNumber(0, 100),
					seals: randomNumber(0, 100),
				},
			},
			{
				month: "february",
				data: {
					feeders: randomNumber(0, 100),
					poles: randomNumber(0, 100),
					boxes: randomNumber(0, 100),
					meters: randomNumber(0, 100),
					cbs: randomNumber(0, 100),
					seals: randomNumber(0, 100),
				},
			},
		];
	}

	setTrnsTotals = () => {
		this.trns_monthly_totals.reduce((accumator, current) => {

		})
	}

}
