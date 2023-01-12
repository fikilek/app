import React from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useOpenModal from "../../hooks/useModal";

const RequireAuth = () => {
	const context = useAuthContext();
	const openModal = useOpenModal();
	const location = useLocation();
	// console.log(`location`, location);
	return context?.user ? (
		<Outlet />
	) : (
		<Navigate to="/signinPage" state={{ from: location }} replace={true} />
		// openModal({modalName:"signin", payload: {from: location}})
	);
};

// TODO: See if only one signin page can be used. At the moent, its a modal and a page. Only one should be used

export default RequireAuth;
