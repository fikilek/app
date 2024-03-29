import { useState, useEffect } from "react";
import { db } from "../firebaseConfig/fbConfig";
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";

const useCollection = (ml1, ml2, ml3) => {
	// console.log(`inside useGetCollecion ml1:`, ml1);
	// console.log(`inside useGetCollecion ml2:`, ml2);
	// console.log(`inside useGetCollecion ml3:`, ml3);
	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		let q = null;

		// transactions
		if (ml1 === "erfs") {
			// if (ml2) {

			q = query(
				collection(db, ml1),
				orderBy("metaData.updatedAtDatetime", "desc")
			);
		}

		// transactions
		if (ml1 === "trns") {
			// if (ml2) {
			if (ml3 && ml2) {
				q = query(
					collection(db, ml1),
					where("astData.astCartegory", "==", ml2),
					where("metaData.trnType", "==", ml3),
					orderBy("metaData.updatedAtDatetime", "desc")
				);
			} else if (ml2) {
				q = query(
					collection(db, ml1),
					where("astData.astCartegory", "==", ml2),
					orderBy("metaData.updatedAtDatetime", "desc")
				);
			} else {
				q = query(
					collection(db, ml1),
					orderBy("metaData.updatedAtDatetime", "desc")
				);
			}
		}
		// assets
		if (ml1 === "asts") {
			if (ml2) {
				q = query(
					collection(db, ml1),
					where("astData.astCartegory", "==", ml2),
					orderBy("metaData.updatedAtDatetime", "desc")
				);
			} else {
				q = query(
					collection(db, ml1),
					orderBy("metaData.updatedAtDatetime", "desc")
				);
			}
		}
		// admin
		if (ml1 === "admin") {
			if (ml2 === "systt") {
				q = query(
					collection(db, ml3),
					orderBy("metaData.updatedAtDatetime", "desc")
				);
			} else {
				q = query(
					collection(db, ml2),
					orderBy("metaData.updatedAtDatetime", "desc")
				);
			}
		}

		// sch
		if (ml1 === "sch") {
			q = query(
				collection(db, ml2),
				orderBy("metaData.updatedAtDatetime", "desc")
			);
		}

		// console.log(`q`, q);

		setIsPending(true);
		setSuccess(false);
		setError("");
		const unsubscribe = onSnapshot(
			q,
			snapShot => {
				// console.log(`snapShot`, snapShot);
				const results = [];
				snapShot.docs.forEach(doc => {
					results.push({ id: doc.id, ...doc.data() });
				});
				setData(results);
			},
			err => {
				// console.log(`firestore err`, err.message);
				setIsPending(false);
				setError(err.message);
			}
		);

		setIsPending(false);
		setSuccess(true);
		setError("");
		return unsubscribe;
	}, [ml1, ml2, ml3]);

	// console.log(`isPending`, isPending)

	return { data, error, isPending, success };
};

export default useCollection;
