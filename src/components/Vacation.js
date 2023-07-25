import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/ContextProvider";
import { checkIsWeekend } from "../utlis/weekends";

const errorsMulti = {
  wrongDates: "Nie wybrano dat",
  notEndDate: "Wybierz datę końcową",
  startDateFirst: "Wybierz najpierw datę początkową",
};
const errorsSingle = {
  wrongDate: "Nie wybrano daty",
};

const Vacation = () => {
  // "" typ string bo jest w cudzyslowiu!!! dateStart to stan, "" z ustestate jest stanem poczatkowym
  //   const [dateStart, setDateStart] = useState("");
  //   const [dateEnd, setDateEnd] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { setTimeOffs } = useContext(Context);

  const [isCheckedMultiDays, setIsCheckedMultiDays] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isCheckedMultiDays) {
      setEndDate("");
    } else {
      setEndDate(startDate);
    }
    setIsError(false);
    setError("");
  }, [isCheckedMultiDays]);

  const handleSubmit = () => {
    //sprawdzenie czy data została wybrana, jeśli nie to wykona się funkcja w if'ie czyli return(przerwanie działania funkcji handleSubmit)
    if (!startDate && !endDate && isCheckedMultiDays) {
      setError(errorsMulti.wrongDates);
      setIsError(true);
      return;
    } else if (!startDate) {
      setError(
        isCheckedMultiDays ? errorsMulti.startDateFirst : errorsSingle.wrongDate
      );
      setIsError(true);
      return;
    } else if (!endDate && isCheckedMultiDays) {
      setError(errorsMulti.notEndDate);
      setIsError(true);
      return;
    }
    setIsError(false);
    // tu dodajemy wysylanie do backendu
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timeOffType: "Vacation",
        startDate,
        endDate,
        status: "Requested",
      }) /* JSON jest obiektem, bo robimy na nim kropke, stringify jest funkcja przyjmujaca parametry w postaci obiketu ( ale nie musi obiektu) ||||  backend ma swoje id, nie potrzebuje moich id, nada mu swoj unikatowy id, dlatego nie wpisujemy id w tym body */,
    };
    fetch(
      "https://9b75tgf537.execute-api.eu-central-1.amazonaws.com/timeoff",
      requestOptions
    )
      .then((response) => response.json()) // data to wynik response.json()
      .then((newTimeOff) => setTimeOffs((prev) => [...prev, newTimeOff])); // dane, ktore przyszly z backendu to newTimeOff i do istniejacej tablicy je dodajemy
  };

  return (
    <form>
      <div>
        <div className="div-spec">
          <p className="label-text">Multiple days</p>
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => setIsCheckedMultiDays(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="dates font">
          <input
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
              min={startDate}
            />
          ) : null}
        </div>
        {isError && <p>{error}</p>}

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
