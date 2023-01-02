import { useState, useEffect } from "react";
import { db } from "../firebaseConfig/fbConfig";
import { collection, onSnapshot } from "firebase/firestore";

const useCollection = (ml1, ml2, ml3) => {
	// console.log(`inside useGetCollecion`);
	const [data, setData] = useState([]);

	useEffect(() => {
		const ref = collection(db, ml1);
		// console.log(`ref`, ref);
		const unsubscribe = onSnapshot(ref, snapShot => {
			// console.log(`snapShot`, snapShot);
			const results = [];
			snapShot.docs.forEach(ast => {
				results.push({ id: ast.id, ...ast.data() });
			});
			setData(results);
		});
		return () => unsubscribe();
	}, []);

	return { data };
};

export default useCollection;
