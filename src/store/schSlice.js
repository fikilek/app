import { createSlice } from "@reduxjs/toolkit";
import { poData, splData, piData } from "../data/schData/schData";

const schSclice = createSlice({
	name: "sch",
	initialState: { poData, splData, piData },
	reducers: {
		poCreated: (state, action) => {},
		poUpdated: (state, action) => {},
		poDeleted: (state, action) => {},
		grvCreated: (state, action) => {},
		grvUpdated: (state, action) => {},
		grvDeleted: (state, action) => {},
	},
});

export const {
	poCreated,
	poUpdated,
	poDeleted,
	grvCreated,
	grvUpdated,
	grvDeleted,
} = schSclice.actions;

export default schSclice.reducer;
