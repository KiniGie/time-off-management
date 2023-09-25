import React, { useContext, useEffect } from "react";
import Navigation from "./Navigation";
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from "../store/ContextProvider";

const Layout = () => {
  const { isLogged } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // isLogged || navigate("/login"); 
    if (!isLogged) {
      navigate("/login")  // jesli nie ejztes zalogowany przekieruj do login 
    } // 
  }, [isLogged]);  // to jest tablica zaleznosci / za kazdym razem jak zmieni sie isLoged wykonaj powyzsza funkcje
  return isLogged ? (
    <div>
      <Navigation />
      <Outlet />
    </div>
  ) : null;
};

export default Layout;
