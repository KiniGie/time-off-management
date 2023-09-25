import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/ContextProvider";

const Navigation = () => {
  const { setIsLogged } = useContext(Context);
  return (
    <nav>
      <ul className="main-menu">
        <li>
          <Link className="btn-nav-request header-menu" to="panel?page=1">
            Request time off
          </Link>
        </li>
        <li>
          <Link className=" header-menu" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className=" header-menu"
            to="/login"
            onClick={() => {
              setIsLogged(false);
            }}
          >
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
