
import useFilterAstsColData from "./useFilterAstsColData";
import useFilterAstsRowData from "./useFilterAstsRowData";

const useGetAstsData = (ml1, ml2, ml3) => {
  // console.log(`ml2`, ml2)
	const { filterAstsRowData } = useFilterAstsRowData(ml1, ml2, ml3); //this must be useCollection hook
	const { filterAstsColData } = useFilterAstsColData(ml1, ml2, ml3);

	const getAstsData = () => {
		return {
			rowData: filterAstsRowData(ml2, ml2, ml3),
			columnDefs: filterAstsColData(ml2, ml2, ml3),
		};
	};

	return { getAstsData };
};

export default useGetAstsData;
