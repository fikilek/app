
import useFilterAstsColData from "./useFilterAstsColData";
import useFilterAstsRowData from "./useFilterAstsRowData";

const useGetAstsData = ml2 => {
  // console.log(`ml2`, ml2)
	const { filterAstsRowData } = useFilterAstsRowData(ml2);
	const { filterAstsColData } = useFilterAstsColData(ml2);

	const getAstsData = () => {
		return {
			rowData: filterAstsRowData(ml2),
			columnDefs: filterAstsColData(ml2),
		};
	};

	return { getAstsData };
};

export default useGetAstsData;
