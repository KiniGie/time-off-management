import React, { useContext } from "react";
import { formatTimeOffs } from "../utlis/formatNames";
import { Context } from "../store/ContextProvider";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TimeOff /* komponent reactowy! */ = ({
  id,
  timeOffType,
  startDate,
  endDate,
  status,
}) => {
  const { role, fetchTimeOffs } = useContext(Context);

  const handleChangeStatus = async (statusToSet) => {
    if (statusToSet.toLowerCase() === status.toLowerCase()) return; // jesli warunek jest spelniony to nie robimy nic, jesli jest declined i klikam declined to nie zrobi sie nic 

    const a = {
      b: "b",
      c: 123,
    }

    const b = '{"b": "b", "c": 123}'

    const requestOptions = { // klamerka wasata- > blok kodu, obiekt, wstawienie kodu js w html, to jest obiekt
      method: "PATCH", // put w niektórych API  pozwala tworzyć zasoby
      headers: { "Content-Type": "application/json" }, //  headery zaweiraja dodatkowe informacje takie jak typy, wielkosci etc.
      body: JSON.stringify({ // body to kontent, mieso / BIERZE DANE JAVASCRIPTOWE I ZAMIENIA W STRINGA, zamienia wszystko w string, obiekt takze
        status: statusToSet,
      }),
    }

    const response = await fetch(   //fetch robi request i czeka na response
      `${process.env.REACT_APP_API_URL}/${id}`, // ` to string z interpolacja tzn. // jak klikam na check mark to wysylam do api request PATCH z prosba o zmiane statusu na approved dotyczaca timeoffa id
      requestOptions
    )
    if (response.status === 200) {
      fetchTimeOffs();  // pobiera wszystkie timeoffy
    }
  };

  return (
    <tr>
      <td className="td-timeOff">{formatTimeOffs(timeOffType)}</td>
      {/* {} wstawienie kodu js do html */}
      <td className="td-timeOff">{startDate}</td>
      <td className="td-timeOff">{endDate}</td>
      <td className="td-timeOff">{status}</td>
      {role === "admin" ? (
        <td className="icons-box">
          <button 
            onClick={() => handleChangeStatus("Approved")}
            className="btn-action btn-accept"
            style={{border:"none", cursor:"pointer"}}
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#2eba2c", height: "20px" }}
            />
          </button>
          <button
            onClick={() => handleChangeStatus("Declined")}
            className="btn-action btn-declined"
            style={{border:"none", cursor:"pointer"}}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#e7082a", height: "20px"}}
            />
          </button>
        </td>
      ) : null}
    </tr>
  );
};

export default TimeOff;

/* tworzymy komponenty do tworzenia reuzwalnych rzeczy, do ich wysweitlania danych w postaci html (np piszemy wiele razy w kodzie lub tworzymy petle) */
