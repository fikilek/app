import React from "react";
import "./trns.css";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Tabs from "../../components/tabs/Tabs";

const Trns = () => {
	const { ml2, ml3 } = useParams();
	// const [search, setSearch] = useSearchParams();
	// console.log(`ml3: ${ml3}`);
	return (
		<div className="asts">
			<Tabs ml1={"trns"} ml2={ml2} ml3={ml3} />
		</div>
	);
};

export default Trns;
