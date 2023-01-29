import React from "react";
import "./PoInvPopTable.css";

const PoInvPopTable = ({ data, type }) => {
	console.log(`data`, data);
	console.log(`type`, type);
	return (
		// pipt: po-inv-pop-table
		<div className="pipt">
			<table>
				<thead>
					<tr>
						<th>{`${type.substring(0, 3)} no`}</th>
						<th>{`${type.substring(0, 3)} amount`}</th>
						<th>{`${type.substring(0, 3)} image`}</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map(item => {
							return (
								<tr key={item.id}>
									<td>{item.no}</td>
									<td>{item.amount}</td>
									<td className="pipt-img-wrapper">
										<img className="pipt-img" src={item.url} alt={`${type}`} />
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default PoInvPopTable;
