import { collection, addDoc } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db, timestamp } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";

const initData = {
	document: null,
	error: null,
	isPending: false,
	success: false,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
      // console.log(`IS_PENDING`, action.payload);
			return {
				document: null,
				error: null,
				isPending: true,
				success: false,
			};
    case "ADD_DOCUMENT":
      // console.log(`ADD_DOCUMENT`, action.payload);
			return {
				document: action.payload,
				error: null,
				isPending: false,
				success: true,
			};
		case "ERROR":
      // console.log(`ERROR`, action.payload);
			return {
				document: null,
				error: action.payload,
				isPending: false,
				success: false,
			};
		default:
			return state;
	}
};

export const useFirestore = fbCollection => {
	const [response, dispatch] = useReducer(firestoreReducer, initData);
	const [isCancelled, setIsCancelled] = useState(false);
	const { user } = useAuthContext();

	const addMetaData = doc => {
		const datetime = timestamp.fromDate(new Date());
		if (doc.id) {
			// document has id so it already exist in firestore meaning its been created already. Therefore, only updating is required
			return {
				...doc,
				metaData: {
					updatedAtDatetime: datetime,
					updatedByUser: user.displayName,
				},
			};
		} else {
			// document DOES NOT EXIST in firestore meaning its a new documemt. Therefore, both updatedAT and creaedAt must be added to the document.
			return {
				...doc,
				metaData: {
					updatedAtDatetime: datetime,
					updatedByUser: user.displayName,
					createdAtDatetime: datetime,
					createdByUser: user.displayName,
				},
			};
		}
	};

	const dispatchIfNotCancelled = action => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	const ref = collection(db, fbCollection);

  const addDocument = async doc => {
    // console.log(`start adding doc`, doc)
		dispatch({ type: "IS_PENDING" });
		try {
			const po = addMetaData(doc);
			// console.log(`po`, po);
			const addedDocument = await addDoc(ref, po);
			dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addedDocument });
			// console.log(`addedDocument`, addedDocument);
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	const deleteDocument = async id => {};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { response, addDocument, deleteDocument };
};
