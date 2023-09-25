import React, { useState } from "react";
import Vacation from "./Vacation";
import SickLeave from "./SickLeave";

const Form = () => { // w React: jest to komponent bo z wielkiej litery i zwraca html, z punktu JavaScript: f. strzalkowa zero argumentowa
  const [timeOffType, setTimeOffType] = useState("vacation"); 

  return (
    <div className="start-view">
      <div className="box-type-off">
        {/* czesc wspolna  */}
        <h2 className="label-text">Time off request</h2>
        <select
          defaultValue={timeOffType}
          onChange={(e) => setTimeOffType(e.target.value)} 
        >
          <option value="vacation">Vacation</option>
          <option value="sickLeave">Sick leave</option>
        </select>
      </div>
      {timeOffType === "vacation" && <Vacation />}  {/* jesli timeoftype jest vacation to wyswietl komponent vacation */}
      {timeOffType === "sickLeave" && <SickLeave />}
    </div>
  );
};

export default Form;
