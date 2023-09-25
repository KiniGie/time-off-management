import React, { createContext, useState } from "react";
import { apiUrl } from "../utlis/api";
import { calculateDaysByType } from "../utlis/days";

export const Context = createContext();

const ContextProvider = ({ children }) => {
	const fullTimeOffs = 26;
	const [isLogged, setIsLogged] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [role, setRole] = useState("admin");
	const [error, setError] = useState("");
	const [timeOffs, setTimeOffs] = useState([]);
	const [leftVacationDays, setLeftVacationDays] = useState(fullTimeOffs);

	const fetchTimeOffs = () => {
		setIsLoading(true);
		fetch(`${apiUrl}/timeoff`)
			.then(res => res.json())
			.then(json => {
				setTimeOffs(json);
				setLeftVacationDays(
					fullTimeOffs - calculateDaysByType(json, "Vacation")
				);
				setIsLoading(false);
			});
	};
	return (
		<Context.Provider
			value={{
				isLogged,
				isLoading,
				setIsLogged,
				error,
				setError,
				role,
				setRole,
				fetchTimeOffs,
				timeOffs,
				setTimeOffs,
				leftVacationDays,
			}}>
			{children}
		</Context.Provider>
	);
};
export default ContextProvider;
