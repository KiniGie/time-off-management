import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/ContextProvider";

import "./LoginPage.css";

const loginData = [
  {
    username: "kinga@gmail.com",
    password: "test123",
    role: "admin",
  },
  {
    username: "konrad@gmail.com",
    password: "123test",
    role: "employee",
  },
];

const LoginPage = () => {
  const { error, setIsLogged, setError, setRole } = useContext(Context);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const checkLogin = (e) => {
    e.preventDefault();
    if (!username || !password) return;

    const foundUser = loginData.find((user) => user.username === username);

    if (!foundUser) {
      setError("Nie ma konta o podanych danych");
      return;
    } else {
      if (foundUser.password === password) {
        setIsLogged(true);
        setRole(foundUser.role);
        setError("");
        navigate("/");
      } else {
        setError("Błędne hasło");
        return;
      }
    }
  };

  return (
    <>
      <div className="container">
        <form className="form">
          <input
            className="input-login"
            value={username}
            name="login"
            id="login"
            placeholder="login"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password"></label>
          <input
            className="input-login"
            type="password"
            value={password}
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn-box">
            <button className="btn-login" onClick={checkLogin}>
              Login
            </button>
          </div>
        </form>
      </div>

      {error && <p>{error}</p>}
    </>
  );
};

export default LoginPage;
