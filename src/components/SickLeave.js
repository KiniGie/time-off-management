import React, { useContext, useRef, useState } from "react";
import { Context } from "../store/ContextProvider";
import { checkIsWeekend } from "../utlis/weekends";

const SickLeave = () => {
  const { setTimeOffs } = useContext(Context);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // const attachmentInput = useRef(null);

  const submitTimeOff = () => {
    if (
      !startDate ||
      !endDate
      // || !attachmentInput.current.value
    )
      return;

    console.log("przeszlo");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timeOffType: "SickLeave",
        startDate,
        endDate,
        status: "Requested",
      }),
    };
    fetch(
      "https://9b75tgf537.execute-api.eu-central-1.amazonaws.com/timeoff",
      requestOptions
    )
      .then((response) => response.json())
      .then((newTimeOff) => setTimeOffs((prev) => [...prev, newTimeOff]));
  };

  return (
    <div>
      <div className="dates font">
        <input
          value={startDate}
          onChange={(e) => {
            if (checkIsWeekend(e.target.value)) {
              // alert("Nie można wybrać daty weekendowej");
              return;
            }
            setStartDate(e.target.value);
          }}
          className="start-date"
          type="date"
        />
        <input
          value={endDate}
          onChange={(e) => {
            if (checkIsWeekend(e.target.value)) {
              // alert("Nie można wybrać daty weekendowej");
              return;
            }
            setEndDate(e.target.value);
          }}
          className="end-date"
          type="date"
          min={startDate}
        />
      </div>
      <div className="total-time-off label-text">
        <p className="paragraph">This doesn't include weekends</p>
      </div>
      <input className="reason font" placeholder="Reason (optional)" />
      <div className="div-spec">
        <label className="label-text file-text">Attach file (optional)</label>
        <input
          //ref={attachmentInput}
          className="file-box"
          type="file"
          id="myFile"
          name="filename"
        />
      </div>
      <div className="btn-box">
        <button onClick={submitTimeOff} className="btn-request font">
          Submit request
        </button>
      </div>
    </div>
  );
};

export default SickLeave;
