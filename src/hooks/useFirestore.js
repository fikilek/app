import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import cloneDeep from "lodash.clonedeep";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebaseConfig/fbConfig";
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

	const deleteDocument = async id => {};

	const updateDocument = async (document) => {
		console.log(`document`, document)
		const id = document.id;
		const newObj = cloneDeep(document);
		// delete newObj.id;
		dispatch({ type: "IS_PENDING" });
		// console.log(`id`, id)
		const docToUpdateRef = doc(db, fbCollection, id);
		try {
			// console.log(`po`, po)
			const updatedDocument = await updateDoc(docToUpdateRef, newObj);
			// console.log(`updatedDocument`, updatedDocument);
			dispatchIfNotCancelled({
				type: "UPDATED_DOCUMENT",
				payload: updatedDocument,
			});
			// console.log(`addedDocument`, addedDocument);
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	const getDocument = async uid => {
		// console.log(`uid`, uid)
		const docRef = doc(db, fbCollection, uid);
		// console.log(`docRef`, docRef);
		dispatch({ type: "IS_PENDING" });
		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				// console.log("Document data:", docSnap.data());
				dispatchIfNotCancelled({
					type: "UPDATED_DOCUMENT",
					payload: docSnap.data(),
				});
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { response, addDocument, deleteDocument, updateDocument, getDocument };
};
