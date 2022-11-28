import React from "react";

const TableCellArrayData = ({ params }) => {
	// console.log(`params`, params);
	return (
		<>
      <span>{`L:${params.value.length} - `}</span>
			<span>{`W:${params.value.width} - `}</span>
			<span>{`H:${params.value.height}`}</span>
		</>
	);
};

export default TableCellArrayData;
