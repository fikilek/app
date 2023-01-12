import { useState, useEffect } from "react";
import { db } from "../firebaseConfig/fbConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useCollection = (ml1, ml2, ml3) => {
	// console.log(`inside useGetCollecion`);
	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [isPending, setIsPending] = useState(false);

	useEffect(() => {
		// const ref = collection(db, ml1);
		const q = query(
			collection(db, ml1),
			orderBy("metaData.updatedAtDatetime", "desc")
		);
		// console.log(`ref`, ref);
		setIsPending(true);
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
				console.log(`firestore err`, err.message);
				setIsPending(false);
				setError(err.message);
			}
		);

		setIsPending(false);
		setError("");
		return () => unsubscribe();
	}, [ml1]);
	// console.log(`data`, data)

	return { data, error, isPending  };
};

export default useCollection;
