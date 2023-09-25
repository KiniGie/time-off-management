import { useEffect, useContext } from "react";

/* import Navigation from "./components/Navigation";
 */ import Form from "./components/Form";
import TimeOffData from "./components/TimeOffData";
import TimeOffLeftDays from "./components/TimeOffLeftDays";

import "./App.css";
import { Context } from "./store/ContextProvider";
import { useNavigate } from "react-router-dom";

function App() {
  const { isLogged, fetchTimeOffs } = useContext(Context); // useContext to funkcja z reacta przywołująca argument (context w tym przypadku), boolean zaczynaja sie czesto na is (odp. true/false), (fetch - czasownik, czyli to funkcja)
  const navigate = useNavigate(); // useNavigate przywoluje funkcje ( bo czasownik 'navigate') i pozwala przejsc do innych stron)

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, []); // jesli jest pusta tablica to przekierowanie na storne logowania dzieje sie raz na poczatku

  useEffect(() => {
    fetchTimeOffs();
  }, []); // pobierz dane z backendu na poczatku 

  return (
    <>
      {isLogged ? (
        <div className="App">
          <header className="content-section"> {/* TODO: WYRZUĆ HEADER, ZMIEŃ APP */}
            <div className="left-side box-spec">
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
