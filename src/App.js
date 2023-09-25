import { useEffect, useContext } from "react";

import Form from "./components/Form";
import TimeOffData from "./components/TimeOffData";
import TimeOffLeftDays from "./components/TimeOffLeftDays";

import "./App.css";
import { Context } from "./store/ContextProvider";
import { useNavigate } from "react-router-dom";

function App() {
	const { isLogged, fetchTimeOffs } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLogged) {
			navigate("/login");
		}
	}, []);

	useEffect(() => {
		fetchTimeOffs();
	}, []);

	return (
		<>
			{isLogged ? (
				<div className='App'>
					<header className='content-section'>
						{" "}
						<div className='left-side box-spec'>
							<Form />
						</div>
						<TimeOffLeftDays />
						<TimeOffData />
					</header>
				</div>
			) : null}
		</>
	);
}

export default App;
