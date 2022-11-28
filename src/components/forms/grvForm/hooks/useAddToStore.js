import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../../../contexts/UserContext";
import { astCreated } from "../../../../store/astsSlice";
// import { ModalContext } from "../../contexts/ModalContext";

const useAddToStore = () => {
	// const { setComponentToOpen, setModalOpened } = useContext(ModalContext);
	const { astCartegories } = useSelector(state => state.admin);
	// console.log(`astCartegories`, astCartegories);
	const dispatch = useDispatch();

	const { user } = useContext(UserContext);

	const [addStarted, setAddStarted] = useState(false);
	const [addFinished, setAddFinished] = useState(false);

	const addToStore = po => {
		setAddStarted(true);
		const { poPi } = po;
		// console.log(`po`, po);
		// create and array of assets that will be added into asts
		const itemsToAddToAsts =
			poPi &&
			poPi.map(items => {
				// console.log(`items`, items);
				const astCartegory = astCartegories[items.itemAstCartegory];
				// console.log(`astCartegory`, astCartegory);
				const itemToAdd = Array(items.itemQuantity).fill(
					
					{
					astSystemId: nanoid(),
					// metaData: {
					// 	createdAtDatetime: moment(new Date()).format("YYYY-MM-DD HH:mm"),
					// 	createdByUser: user ? `${user.surname} ${user.name}` : "No User",
					// 	astOrigin: {
					// 		originId: po.poSytemId,
					// 		originNo: po.poData.poNo,
					// 	},
					// 	updatedAtDatetime: moment(new Date()).format("YYYY-MM-DD HH:mm"),
					// 	updatedByUser: user ? `${user.surname} ${user.name}` : "No User",
					// 	trnCount: 1, //asr,
					// },
					astData: {
						astSerialNo: "",
						astNo: "", // eg, meter no
						astState: "stores", // ['stores', 'field', 'servic', '', '', ']
						astCartegory: items.itemAstCartegory, // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
						
						// astDetails: astCartegory,
					},
					}
				
				);
				// console.log(`itemToAdd`, itemToAdd);
				return itemToAdd;
			});

		// add items to asts. THis will be done with redux dispatch
		// console.log(`itemsToAddToAsts`, itemsToAddToAsts);

		setAddFinished(true);
		setAddStarted(false);
		return itemsToAddToAsts;
	};

	const addToAsts = items => {
		// console.log(`items`, items)

		dispatch(
			astCreated({
				astSystemId: null,
				// metaData: {
				// 	createdAtDatetime: moment(new Date()).format("YYYY-MM-DD HH:mm"),
				// 	createdByUser: user ? `${user.surname} ${user.name}` : "No User",
				// 	astOrigin: {
				// 		originId: 'originId',
				// 		originNo: 'originNo',
				// 	},
				// 	updatedAtDatetime: moment(new Date()).format("YYYY-MM-DD HH:mm"),
				// 	updatedByUser: user ? `${user.surname} ${user.name}` : "No User",
				// 	trnCount: 1, //asr,
				// },
				astData: {
					astSerialNo: "",
					astNo: "", // eg, meter no
					astState: "stores", // ['stores', 'field', 'servic', '', '', ']
					astCartegory: items.itemAstCartegory, // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
					// astDetails: "meter details",
				},
			})
		);	


		// items &&
		// 	items.forEach(item => {
		// 		// console.log(`item`, item)
		// 		item.forEach(asset => {
		// 			console.log(`asset`, asset);
		// 			dispatch(astCreated(asset));
		// 		});
		// 	});
	};
	return { addStarted, addFinished, addToStore, addToAsts };
};
export default useAddToStore;
