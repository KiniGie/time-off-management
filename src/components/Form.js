import React, { useState } from "react";
import SelectForm from "./SelectForm";

const Form = () => {
  const [selectedOption, setSelectedOption] = useState("vacation");

  return (
    <div className="start-view">
      <div className="box-type-off">
        {/* czesc wspolna  */}
        <h2 className="label-text">Time off request</h2>
        <select
          /* className="time-off-select" */
          defaultValue={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="vacation">Vacation</option>
          <option value="sickLeave">Sick leave</option>
        </select>
      </div>
      <SelectForm variant={selectedOption} />
    </div>
  );
};

export default Form;
