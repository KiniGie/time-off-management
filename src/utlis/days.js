import moment from "moment";

export const checkIsWeekend = (date) => {
  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay();

  return dayOfWeek === 0 || dayOfWeek === 6;
};

export const countTimeoffDays = (startDate, endDate) => {
  const day = moment(startDate);
  const end = moment(endDate);
  let count = 0;

  // przejdz po wszystkich dniach w urlopie
  while (day.isSameOrBefore(end)) { // sprawdza kazdy dzien w tym zakresie czy nie jest sobota lub niedziela
    // jezeli dzien nie jest niedziela lub sobota to 
    if (day.day() !== 0 && day.day() !== 6) {
      count = count + 1; // dodaj 1 do liczby dni wykorzystywanych przez ten urlop
    }
    day.add(1, "day"); // przejdz do sprawdzania nastepnego dnia
  }

  // zwroc liczbe dni roboczych w urlopie
  return count;
};

export const calculateDaysByType = (timeOffs, timeOffType) => {
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
};
