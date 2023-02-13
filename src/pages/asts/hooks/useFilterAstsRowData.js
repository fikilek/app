import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useCollection from "../../../hooks/useCollection";

const findPath = (ob, key) => {
	const path = [];
	const keyExists = obj => {
		if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
			return false;
		} else if (obj.hasOwnProperty(key)) {
			return true;
		} else if (Array.isArray(obj)) {
			let parentKey = path.length ? path.payment() : "";

			for (let i = 0; i < obj.length; i++) {
				path.push(`${parentKey}[${i}]`);
				const result = keyExists(obj[i], key);
				if (result) {
					return result;
				}
				path.payment();
			}
		} else {
			for (const k in obj) {
				path.push(k);
				const result = keyExists(obj[k], key);
				if (result) {
					return result;
				}
				path.payment();
			}
		}
		return false;
	};

	keyExists(ob);

	return path.join(".");
};

const keys = [];
const iterate = obj => {
	const objKeys = Object.keys(obj);
	objKeys.forEach(key => {
		if (obj[key] instanceof Timestamp) {
			keys.push(key);
		}
		if (typeof obj[key] === "object" && obj[key] !== null) {
			iterate(obj[key]);
		}
	});
	return keys;
};

const useFilterAstsRowData = (ml1, ml2, ml3) => {
	const { data } = useCollection(ml1, ml2, ml3);
	// console.log(`data`, data)
	// data &&
	// 	data.map(doc => {
	// 		const matchingKeys = iterate(doc);
	// 		matchingKeys &&
	// 			matchingKeys.map(key => {
	// 				const path = findPath(doc, key);
	// 				doc[path][key] = doc[path][key].toDate().toString();
	// 			});
	// 		// console.log(`doc`, doc);
	// 		return doc;
	// 	});

	const filterAstsRowData = () => data;
	return { filterAstsRowData };
};

export default useFilterAstsRowData;
