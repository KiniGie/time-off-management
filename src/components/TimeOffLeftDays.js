import React, { useContext } from "react";
import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Context } from "../store/ContextProvider";
import { countTimeoffDays } from "../utlis/weekends";

const TimeOffLeftDays = () => {
  const { timeOffs } = useContext(Context);
  function getDaysBetweenDates(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    // Create Date objects for the input strings
    const d1 = new Date(date1);
    const d2 = date2 === "" ? d1 : new Date(date2);

    // Calculate the difference in days
    const diffDays = Math.round(Math.abs((d2 - d1) / oneDay));

    if (isNaN(diffDays)) {
      console.log(d2, date2);
    }

    return diffDays;
  }

  function calculateDaysByType(timeOffs, timeOffType) {
    return (
      // timeOffs // tablica obiektow TimeOff
      // bierzemy tylko wiersze ktore sa vacation  timeOffType === "Vacation"
      // odejmujemmy start date od end date
      // uzycie reduce, ktory sumuje
      // number

      //[
      // {
      //   "id":1,
      //   "timeOffType":"OccasionalLeave",
      //   "startDate":"2023-02-02",
      //   "endDate":"2023-02-03",
      //   "status":"Approved"
      // },
      // {
      //   "id":2,
      //   "timeOffType":"Vacation",
      //   "startDate":"2023-04-05",
      //   "endDate":"2023-04-07",
      //   "status":"Approved"
      // },
      // {
      //   "id":3,
      //   "timeOffType":"Vacation",
      //   "startDate":"2023-06-11",
      //   "endDate":"2023-06-18",
      //   "status":"Requested"
      // }
      // ]
      timeOffs
        .filter((timeOff) => timeOff.timeOffType === timeOffType)
        //[
        // {
        //   "id":2,
        //   "timeOffType":"Vacation",
        //   "startDate":"2023-04-05",
        //   "endDate":"2023-04-07",
        //   "status":"Approved"
        // },
        // {
        //   "id":3,
        //   "timeOffType":"Vacation",
        //   "startDate":"2023-06-11",
        //   "endDate":"2023-06-18",
        //   "status":"Requested"
        // }
        // ]
        .map((timeOff) => countTimeoffDays(timeOff.startDate, timeOff.endDate))
        //[
        //  2,
        //  7
        //]
        // function      B[].reduce(f: (A, B) => A, initalAccumulator: A): A
        .reduce((a, b) => a + b, 0)
    );
  }

  return (
    <div className="right-side box-spec">
      <div className="time-off-entitlement font label-text">
        <table>
          <thead>
            <tr>
              <th className="th-types">Type of time off</th>
              <th>Days</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FontAwesomeIcon icon={faPlaneUp} />
                Vacation days used
              </td>
              <td>
                <div className="th-center">
                  {calculateDaysByType(timeOffs, "Vacation")}/27
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faHeart} />
                Sick leave used
              </td>
              <td>
                <div className="th-center">
                  {calculateDaysByType(timeOffs, "SickLeave")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeOffLeftDays;
