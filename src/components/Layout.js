import React, { useContext, useEffect } from "react";
import Navigation from "./Navigation";
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from "../store/ContextProvider";

const Layout = () => {
	const { isLogged } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLogged) {
			navigate("/login");
		}
	}, [isLogged]);
	return isLogged ? (
		<div>
			<Navigation />
			<Outlet />
		</div>
	) : null;
};

export default Layout;
