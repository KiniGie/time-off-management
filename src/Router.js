import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PanelPage from "./pages/PanelPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <HomePage />,
				},
				{
					path: "panel",
					element: <PanelPage />,
				},
			],
		},

		{
			path: "login",
			element: <LoginPage />,
		},
	],
	{ basename: "/time-off-management" }
);

const Router = ({ children }) => {
	return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default Router;
