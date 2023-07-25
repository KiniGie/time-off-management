import moment from "moment";

export const checkIsWeekend = (date) => {
  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay();

  return dayOfWeek === 0 || dayOfWeek === 6;
};

export const countTimeoffDays = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  let count = 0;

  while (start.isSameOrBefore(end)) {
    if (start.day() !== 0 && start.day() !== 6) {
      count++;
    }
    start.add(1, "day");
  }

  return count;
};
