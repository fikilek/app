import React from "react";
import "./PoInvPopImage.css";

const PoInvPopImage = params => {
	// console.log(`params`, params);
	const { setShowImage, setUrl, setAlt, value: url, type } = params;

	const handleClick = e => {
		e.preventDefault();
		setShowImage(true);
		setUrl(url);
		setAlt("invoice or payment");
	};

	return (
		// pipi: po inv pop image
		<div className="pipi">
			<img
				onClick={handleClick}
				src={params.value}
				alt={`${type} info`}
			/>
		</div>
	);
};

export default PoInvPopImage;
