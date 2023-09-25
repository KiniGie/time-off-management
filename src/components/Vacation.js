import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/ContextProvider";
import { checkIsWeekend } from "../utlis/days";
import { apiUrl } from "../utlis/api";

const errorsMulti = {
  wrongDates: "Nie wybrano dat",
  notEndDate: "Wybierz datę końcową",
  startDateFirst: "Wybierz najpierw datę początkową",
  tooLong: "Wybrany zakres przekracza dostępną liczbę dni urlopu",
};
const errorsSingle = {
  wrongDate: "Nie wybrano daty",
};

const Vacation = () => {
  // "" typ string bo jest w cudzyslowiu!!! dateStart to stan, "" z ustestate jest stanem poczatkowym
  //   const [dateStart, setDateStart] = useState("");
  //   const [dateEnd, setDateEnd] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(""); //tworzymy stan i wartosc poczatkowa to pusty string

  const { setTimeOffs, leftVacationDays } = useContext(Context);// ustawiaczka do stata, left... to czytaczka

  const [isCheckedMultiDays, setIsCheckedMultiDays] = useState(false);
  const [isError, setIsError] = useState(false); // czy jest blad
  const [error, setError] = useState(""); // tekst bledu  TODO: POALCZYC ISERROR I ERROR

  useEffect(() => {   // odpowiada za zerowanie bledow
    if (isCheckedMultiDays) {
      setEndDate("");
    } else {
      setEndDate(startDate);
    }
    setIsError(false); // czysci bledy
    setError("");
  }, [isCheckedMultiDays]); // jak zmienia sie stan to czysci bledy, tutaj zmieniaja sie zaleznosci, ktore wykonywane sa na pcozatku i przy kazdej zmianie tego stanu

  const handleSubmit = () => {
    //sprawdzenie czy data została wybrana, jeśli nie to wykona się funkcja w if'ie czyli return(przerwanie działania funkcji handleSubmit)
    if (!startDate && !endDate && isCheckedMultiDays) {
      setError(errorsMulti.wrongDates);
      setIsError(true);
      return; 
    } else if (!startDate) {
 /*      setError(
        isCheckedMultiDays ? errorsMulti.startDateFirst : errorsSingle.wrongDate
      ); do wyrzucenia, ponizszy oznacza to samo */
      if (isCheckedMultiDays) {
        setError(errorsMulti.startDateFirst);
        setIsError(true);
      } else {
        setError(errorsSingle.wrongDate);
        setIsError(true);
      }
      return;
    } else if (!endDate && isCheckedMultiDays) {
      setError(errorsMulti.notEndDate);
      setIsError(true);
      return;
    }

    const d1 = new Date(startDate).getTime(); // string -> data -> unix timestamp (ms od 1970)
    const d2 = new Date(endDate).getTime();

    const numberOfDays = (d2 - d1) / (24 * 60 * 60 * 1000); //zamiana milisekund na dni

    if (numberOfDays > leftVacationDays) {
      setError(errorsMulti.tooLong);
      setIsError(true);
      return; //return, zeby reszta kodu sie nie wykonala
    }

    setIsError(false); //po przejsciu walidacji znikaja komunikaty bledu
  
    const requestOptions = { // obiekt bo klamerki i nazwa : wartosc
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ // nazwa : string 
        timeOffType: "Vacation",
        startDate,
        endDate,
        status: "Requested",
      }) 
    };
    fetch(`${apiUrl}/timeoff`, requestOptions) // fetch to uderzenie do backendu, dajemy url, a drugi argument tobiekt zawierajacy wiele opcji (requestOptions) /// timeoff to sciezka // fetch zwraca promise, obiecuje, ze cos zwroci
      .then((response) => response.json()) // wyciagamy body w postaci jsona z tej odpowiedzi
      .then((newTimeOff) => {
        setTimeOffs((timeOffs) => [newTimeOff, ...timeOffs]); 
        setStartDate(""); // czysczenie formularza po wyslaniu
        setEndDate("");
      });
  };

  // new Date() // teraz
  // new Date().toISOString() // "2023-03-03T09:09:09.555"
  // new Date().toISOString().split("T") // ["2023-03-03", "09:09:09.555"]
  // new Date().toISOString().split("T")[0] // "2023-03-03"

  return (
    <form>
      <div>
        <div className="div-spec">
          <p className="label-text">Multiple days</p>
          <label className="switch">
            <input  // tu zachodzi interakcja uzytkownika z inputem 
              type="checkbox"
              onChange={(e) => setIsCheckedMultiDays(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="dates font">
          <input
            onClick={(e) => e.target.showPicker()}
            value={startDate}
            onChange={(e) => {
              if (checkIsWeekend(e.target.value)) return;
              setIsError(false);
              setError("");
              setStartDate(e.target.value);
              if (!isCheckedMultiDays) setEndDate(e.target.value);
            }}
            className="start-date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
          />

          {isCheckedMultiDays ? (
            <input
              value={endDate}
              onChange={(e) => {
                if (checkIsWeekend(e.target.value)) {
                  // alert("Nie można wybrać daty weekendowej");
                  return;
                }
                if (!startDate) {
                  setError(errorsMulti.startDateFirst);
                  setIsError(true);
                  return;
                }
                setEndDate(e.target.value);
              }}
              className="end-date"
              type="date"
              min={startDate} /// nie mozemy wybrac wartosci koncowej urlopu wczesniejszej niz data poczatkowa
            />
          ) : null}
          {isError && <div className="error-box">{error}</div>}  
        </div>

        <div className="total-time-off label-text">
          <p className="paragraph">This doesn't include weekends</p>
        </div>
        <input className="reason font" placeholder="Reason (optional)" />
        <div className="btn-box">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn-request font"
          >
            Submit request
          </button>
        </div>
      </div>
    </form>
  );
};

export default Vacation;
