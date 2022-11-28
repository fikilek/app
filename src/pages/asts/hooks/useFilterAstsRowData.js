import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFilterAstsRowData = ml2 => {
	const { asts } = useSelector(state => state);
	// console.log(`asts`, asts);
	const {astsData} = asts
	// console.log(`astsData`, astsData);

	// const [assets, setAssets] = useState([]);

	useEffect(() => {
		// console.log(`assets updated with new astsData `, astsData);
		// setAssets(astsData);
	}, [astsData]);

	// console.log("assets", assets);

	const filterAstsRowData = () => {
		if (ml2 === undefined) return astsData;
		return (
			astsData && astsData.filter(ast => ast.astData.astCartegory === ml2.trim())
		);
	};
	return { filterAstsRowData };
};

export default useFilterAstsRowData;
