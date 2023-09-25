import React, { useContext } from "react";
import { formatTimeOffs } from "../utlis/formatNames";
import { Context } from "../store/ContextProvider";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiUrl } from "../utlis/api";

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
/* 
    const a = {
      b: "b",
      c: 123,
    };

    const b = '{"b": "b", "c": 123}';
 */
    const requestOptions = {
      // klamerka wasata- > blok kodu, obiekt, wstawienie kodu js w html, to jest obiekt
      method: "PATCH", // put w niektórych API  pozwala tworzyć zasoby
      headers: { "Content-Type": "application/json" }, //  headery zaweiraja dodatkowe informacje takie jak typy, wielkosci etc.
      body: JSON.stringify({
        // body to kontent, mieso / BIERZE DANE JAVASCRIPTOWE I ZAMIENIA W STRINGA, zamienia wszystko w string, obiekt takze
        status: statusToSet,
      }),
    };

    const response = await fetch(
      //fetch robi request i czeka na response
      `${apiUrl}/timeoff/${id}`, // ` to string z interpolacja tzn. // jak klikam na check mark to wysylam do api request PATCH z prosba o zmiane statusu na approved dotyczaca timeoffa id
      requestOptions
    );
    if (response.status === 200) {
      fetchTimeOffs(); // pobiera wszystkie timeoffy
    }
  };

  return (
    <div className="timeOff-container">
      {/* {} wstawienie kodu js do html */}
      <div className="ttt">
      <p className="d">From</p>
      <p className="d2">to</p>
      </div>
      <div className="timeofff">
      <div className="td-timeOff1">{startDate}</div>
      <div className="d2">{endDate}</div>
      </div>
      <div className="tff">
      <div className="td-timeOff">{formatTimeOffs(timeOffType)}</div>
      <div className="td-timeOff3">{status}
      {role === "admin" ? (
        <div className="icons-box">
          <div className="box-btns">
            <button
              onClick={() => handleChangeStatus("Approved")}
              className="btn-action btn-accept"
              style={{
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
            >
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "rgb(158, 83, 229)", height: "20px" }}
              />
            </button>
            <button
              onClick={() => handleChangeStatus("Declined")}
              className="btn-action btn-declined"
              style={{
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: "rgb(158, 83, 229)", height: "20px" }}
              />
            </button>
          </div>
        </div>
      ) : null}
      </div>
      </div>
      
    </div>
  );
};

export default TimeOff;

/* tworzymy komponenty do tworzenia reuzwalnych rzeczy, do ich wysweitlania danych w postaci html (np piszemy wiele razy w kodzie lub tworzymy petle) */
