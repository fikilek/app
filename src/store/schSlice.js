import { createSlice } from "@reduxjs/toolkit";
import { poData, splData } from "../data/schData/schData";

const schSlice = createSlice({
	name: "sch",
	initialState: { poData, splData },
	reducers: {
		// Purchase Order reducers
		poCreated: (state, action) => {
			// console.log(`poCreated running`);
			// console.log(`state.poData`, state.poData);
			// console.log(`action`, action);
			state.poData.push(action.payload)
		},
		poUpdated: (state, action) => {},
		poDeleted: (state, action) => {},

		// Proof of payment reducers
		popCreated: (state, action) => {},
		popUpdated: (state, action) => {},
		popDeleted: (state, action) => {},

		// Goods receiving reducers
		grvCreated: (state, action) => {},
		grvUpdated: (state, action) => {},
		grvDeleted: (state, action) => {},
	},
});

// console.log(`schSlice`, schSlice);

export const {
	poCreated,
	poUpdated,
	poDeleted,
	popCreated,
	popUpdated,
	popDeleted,
	grvCreated,
	grvUpdated,
	grvDeleted,
} = schSlice.actions;

export default schSlice.reducer;
