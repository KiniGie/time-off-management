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
  
  
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { setTimeOffs, leftVacationDays } = useContext(Context);

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
    if (!startDate && !endDate && isCheckedMultiDays) {
      setError(errorsMulti.wrongDates);
      setIsError(true);
      return; 
    } else if (!startDate) {
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

    const d1 = new Date(startDate).getTime(); 
    const d2 = new Date(endDate).getTime();

    const numberOfDays = (d2 - d1) / (24 * 60 * 60 * 1000);

    if (numberOfDays > leftVacationDays) {
      setError(errorsMulti.tooLong);
      setIsError(true);
      return;
    }

    setIsError(false);
  
    const requestOptions = { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        timeOffType: "Vacation",
        startDate,
        endDate,
        status: "Requested",
      }) 
    };
    fetch(`${apiUrl}/timeoff`, requestOptions) 
      .then((response) => response.json()) 
      .then((newTimeOff) => {
        setTimeOffs((timeOffs) => [newTimeOff, ...timeOffs]); 
        setStartDate(""); 
        setEndDate("");
      });
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
