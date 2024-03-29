import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
import { auth } from "../firebaseConfig/fbConfig";

const authReducer = (state, action) => {
	switch (action.type) {
		case "SIGNIN":
			return { ...state, user: action.payload };
		case "SIGNOUT":
			return { ...state, user: null };
		case "AUTH_IS_READY": 
			// console.log(`AUTH_IS_READY updated with payload: `, action.payload);
			return { ...state, user: action.payload, isAuthReady: true}
		default:
			return state;
	}
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		isAuthReady: false,
	});
	// console.log(`state`, state);

	useEffect(() => {
		// console.log(`AuthContext useEffect running`)
		const unsub = onAuthStateChanged(auth, (user) => {
			// console.log(`auth`, auth)
			dispatch({ type: "AUTH_IS_READY", payload: auth.currentUser });
			unsub()
		} )
	}, [])

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};



export default AuthContextProvider;
