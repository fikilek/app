import { createSlice } from "@reduxjs/toolkit";
import { poData, splData } from "../data/schData/schData";

const schSclice = createSlice({
	name: "sch",
	initialState: { poData, splData },
	reducers: {
		// Purchase Order reducers
		poCreated: (state, action) => {},
		poUpdated: (state, action) => {},
		poDeleted: (state, action) => { },
		
		// Proof of payment reducers
		popCreated: (state, action) => {},
		popUpdated: (state, action) => {},
		popDeleted: (state, action) => { },
		
		// Goods receiving reducers
		grvCreated: (state, action) => {},
		grvUpdated: (state, action) => {},
		grvDeleted: (state, action) => {},
	},
});

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
} = schSclice.actions;

export default schSclice.reducer;
