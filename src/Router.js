import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PanelPage from "./pages/PanelPage";
import LoginPage from "./pages/LoginPage";
import Navigation from "./components/Navigation";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navigation/>
        <Outlet />
      </div>
    ),
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
]);

const Router = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default Router;
