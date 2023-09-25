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

const LoginPage = () => { // LoginPage jest komponentem (komponent zawsze ma f.strzalkowa z wielkiej litery zwracajaca kod html)
	const { error, setIsLogged, setError, setRole } = useContext(Context); //po prawej obiekt, po lewej destrukturyzacja obiektu, czyli przypisanie poszczegolnych pol obiektu do zmiennych lokalnych
	const navigate = useNavigate();

	const [username, setUsername] = useState(""); // stwórz stan
	const [password, setPassword] = useState("");

	const checkLogin = e => {
		e.preventDefault(); // przy sumbit buttonu zazwyczaj robi sie e.preventDefault(), zeby przeglarka nie probowala wyslac formularza, tylko wykonala ponizsza logike
		if (!username || !password) return; // jesli jest pusty string to jest false, ! neguje boolean i wymusza konwersje ze string do boolean/ / jezeli username lub haslo sa puste to przerywamy procedure sprawdzania loginu

		const foundUser = loginData.find(user => user.username === username);

		if (!foundUser) {
			setError("There is no account with the given details");
		} else {
			if (foundUser.password === password) {
				setIsLogged(true);
				setRole(foundUser.role);
				setError("");
				navigate("/");
			} else {
				setError("Wrong password");
			}
		}
	}; // ta funkcja nic nie zwraca bo nie ma returna, po ktorym cos zostaje zwrocone

	return (
		<>
			<div className='background-container'>
				<div className='background-box'>
					<div className='bubbles-box'>
						<div className='bubbles'>
							<div className='bubble'></div>
							<div className='bubble'></div>
							<div className='bubble'></div>
							<div className='bubble'></div>
							<div className='bubble'></div>
							<div className='bubble'></div>
							<div className='bubble'></div>
							<div className='bubble'></div>
							<div className='bubble'></div>
						</div>
					</div>
				</div>
				<div className='login-container'>
					<form className='form'>
						<input
							className='input-login'
							value={username}
							name='login'
							id='login'
							placeholder='login'
							onChange={e => setUsername(e.target.value)} // ustawiaczka state'a na aktualna wartosc inputa
						/>
						<label htmlFor='password'></label>
						<input
							className='input-login'
							type='password'
							value={password}
							name='password'
							id='password'
							placeholder='password'
							onChange={e => setPassword(e.target.value)}
						/>
						<div className='btn-box'>
							<button className='btn-login' onClick={checkLogin}>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>

			{error && <p>{error}</p>} {/* wyswietlanie errorow ustawianych wczesniej przez setError, jesli error jest pustym stringiem to nic nie jest juz wyswietlane, a jest jest niepusty to wyswietl error */}
		</>
	);
};

export default LoginPage;
