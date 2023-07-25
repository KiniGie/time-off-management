import React from "react";
import Vacation from "./Vacation";
import SickLeave from "./SickLeave";

const SelectForm = ({ variant }) => {
  return (
    <>
      {variant === "vacation" && <Vacation />}
      {variant === "sickLeave" && <SickLeave />}
    </>
  );
};

export default SelectForm;
