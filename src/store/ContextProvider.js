import React, { createContext, useState } from "react";
import { apiUrl } from "../utlis/api";
import { calculateDaysByType } from "../utlis/days";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const fullTimeOffs = 26;
  const [isLogged, setIsLogged] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("admin"); // admin to wartosc poczatkowa, setRole ja zmienia
  const [error, setError] = useState("");
  const [timeOffs, setTimeOffs] = useState([]);
  const [leftVacationDays, setLeftVacationDays] = useState(fullTimeOffs); //  typ number

  const fetchTimeOffs = () => {
    setIsLoading(true);
    fetch(`${apiUrl}/timeoff`)
      .then((res) => res.json()) // zrob dane z jsona zawartego w response, po odebraniu (czyli PRZY GET) z backendu zamieniamy stringi w obiekty
      .then((json) => {
        setTimeOffs(json); /* setTimeOffs to funkcja () przyjmujaca jako argument tablice timeOffow */
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
