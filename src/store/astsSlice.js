import { createSlice } from "@reduxjs/toolkit";
import { astsData } from "../data/astsData/astsData";

const astsSlice = createSlice({
	name: "asts",
	initialState: astsData,
	reducers: {
		astCreated: (state, action) => {},
		astUpdated: (state, action) => {},
		astDeleted: (state, action) => {},
	},
});

// console.log(`astsSlice`, astsSlice)

export const { astCreated, astUpdated, astDeleted } = astsSlice.actions;

export default astsSlice.reducer;
