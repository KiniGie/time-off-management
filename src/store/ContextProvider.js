import React, { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true);
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [timeOffs, setTimeOffs] = useState([]);

  const fetchTimeOffs = () => {
    fetch("https://9b75tgf537.execute-api.eu-central-1.amazonaws.com/timeoff")
      .then((res) => res.json()) // zrob dane z jsona zawartego w response, po odebraniu (czyli PRZY GET) z backendu zamieniamy stringi w obiekty 
      .then((json) => {
        setTimeOffs(json); /* setTimeOffs to funkcja () */
      });
  };
  // PRZY PATCHU przed wyslaniem zamieniamy obiekty w stringi
  return (
    <Context.Provider
      value={{
        isLogged,
        setIsLogged,
        error,
        setError,
        role,
        setRole,
        fetchTimeOffs,
        timeOffs,
        setTimeOffs,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
