import React from "react";
import "./admin.css";
import AdminUsers from "./ml2/AdminUsers";
import AdminSystTables from "./ml2/AdminSystTables";
import AdminMobileDevices from "./ml2/AdminMobileDevices";
import AdminSimCards from "./ml2/AdminSimCards";
import AdminSystUserRoles from "./ml3/AdminSystUserRoles";
import AdminSystAstStates from './ml3/AdminSystAstStates'
import AdminSystTrnStates from './ml3/AdminSystTrnStates'

import { useNavigate, useParams } from "react-router-dom";

const Admin = () => {
	const { ml2, ml3 } = useParams();
	const navigate = useNavigate()
	return (
		<div className="admin">
			{navigate("/noPageFou")}
			{ml2 === "unps" && ml3 === undefined ? <AdminUsers /> : ""}
			{ml2 === "syst" && ml3 === undefined ? <AdminSystTables /> : ""}
			{ml2 === "mds" && ml3 === undefined ? <AdminMobileDevices /> : ""}
			{ml2 === "smcs" && ml3 === undefined ? <AdminSimCards /> : ""}

			{ml2 === "syst" && ml3 === "urs" ? <AdminSystUserRoles /> : ""}
			{ml2 === "syst" && ml3 === "ast-stt" ? <AdminSystAstStates /> : ""}
			{ml2 === "syst" && ml3 === "trn-stt" ? <AdminSystTrnStates /> : ""}
		</div>
	);
};

export default Admin;
