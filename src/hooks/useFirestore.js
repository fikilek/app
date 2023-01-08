import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
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
    case "UPDATED_DOCUMENT":
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
			// console.log(`po`, po);
			const addedDocument = await addDoc(ref, doc);
			dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addedDocument });
			// console.log(`addedDocument`, addedDocument);
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	const deleteDocument = async id => { };
	
	const updateDocument = async (document, id) => {
		const docToUpdateRef = doc(db, fbCollection, id )
		dispatch({ type: "IS_PENDING" });
		try {
			// console.log(`po`, po)
			const updatedDocument = await updateDoc(docToUpdateRef, document);
			dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument });
			// console.log(`addedDocument`, addedDocument);
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { response, addDocument, deleteDocument, updateDocument };
};
 