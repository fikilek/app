import React from "react";

const FormShowHideSection = ({ sectionName, active, setActive }) => {
	const handleClick = (e) => {
		e.preventDefault()
		if (sectionName === active) {
			setActive(null)
		} else {
			setActive(sectionName);
		}
	}
	return (
		<button type="button" onClick={handleClick}>
			{active === sectionName ? "-" : "+"}
		</button>
	);
};

export default FormShowHideSection;
