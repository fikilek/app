import React, { createContext, useState } from "react";

// Create context:
// UserContext: to query the context state
export const ModalContext = createContext();

// A "provider" is used to encapsulate only the
// components that needs the state in this context
const ModalContextProvider = (props) => {
	// console.log(`props`, props);
	const [windowToOpen, setWindowToOpen] = useState("intit value");
	const [open, setOpen] = useState(false);
	// console.log(`windowToOpen`, windowToOpen);
	return (
		<ModalContext.Provider value={{ windowToOpen, setWindowToOpen, open, setOpen }}>
			{props.children}
		</ModalContext.Provider>
	);
};

export default ModalContextProvider;
