import { createSlice } from "@reduxjs/toolkit";
import { poData, splData } from "../data/schData/schData";

const schSlice = createSlice({
	name: "sch",
	initialState: { poData, splData },
	reducers: {
		// Purchase Order reducers
		poCreated: (state, action) => {
			state.poData.push(action.payload)
		},

		poUpdated: (state, action) => {
			const index = state.poData.findIndex(
				element => element.poSystemId === action.payload.poSystemId
			);
			state.poData[index] = action.payload;
		},

		poDeleted: (state, action) => {
			console.log(`poDeleted running`);
			console.log(`state.poData`, state.poData);
			console.log(`action`, action);
			// No recorded is physically deleted. It just get flagged ax having been deleted.
			// step 1: reveive poSystemId from payload
			const id = action.payload.poSystemId;
			// step 2:locate or find the index of the record with sytem id
			const index = state.poData.findIndex(item => item.poSystemId === id);
			// step 3: get the object to delete
			const deletedPo =  {
				...state.poData[index],
				poStatus: "Delete",
			};
			state.poData[index] = deletedPo
		},

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
