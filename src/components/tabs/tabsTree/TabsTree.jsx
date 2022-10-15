import React from 'react'
import './tabsTree.css'

const TabsTree = ({ tableData, ml1, ml2, ml3}) => {
  return (
			<>
				<div>TabsTree </div>
				<div> {` ml1: ${ml1} `}</div>
				<div> {` ml2: ${ml2} `}</div>
				<div> {` ml3: ${ml3} `}</div>
			</>
		);
}

export default TabsTree