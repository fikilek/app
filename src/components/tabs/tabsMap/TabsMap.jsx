import React from 'react'
import './tabsMap.css'

const TabsMap = ({ tableData, ml1, ml2, ml3 }) => {
  return (
			<>
				<div>TabsMap </div>
				<div> {` ml1: ${ml1} `}</div>
				<div> {` ml2: ${ml2} `}</div>
				<div> {` ml3: ${ml3} `}</div>
			</>
		);
};

export default TabsMap