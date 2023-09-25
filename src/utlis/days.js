import moment from "moment";

export const checkIsWeekend = date => {
	const selectedDate = new Date(date);
	const dayOfWeek = selectedDate.getDay();

	return dayOfWeek === 0 || dayOfWeek === 6;
};

export const countTimeoffDays = (startDate, endDate) => {
	const day = moment(startDate);
	const end = moment(endDate);
	let count = 0;

	while (day.isSameOrBefore(end)) {
		if (day.day() !== 0 && day.day() !== 6) {
			count = count + 1;
		}
		day.add(1, "day");
	}

	return count;
};

export const calculateDaysByType = (timeOffs, timeOffType) => {
	return (
		timeOffs
			.filter(timeOff => timeOff.timeOffType === timeOffType)
			.map(timeOff => countTimeoffDays(timeOff.startDate, timeOff.endDate))
			.reduce((a, b) => a + b, 0)
	);
};
