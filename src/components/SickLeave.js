import React, { useContext, useRef, useState } from "react";
import { Context } from "../store/ContextProvider";
import { checkIsWeekend } from "../utlis/days";
import { apiUrl } from "../utlis/api";

const errorsMulti = {
	wrongDates: "Nie wybrano dat",
	notEndDate: "Wybierz datę końcową",
	startDateFirst: "Wybierz najpierw datę początkową",
};

const SickLeave = () => {
	const { setTimeOffs } = useContext(Context);

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const [isError, setIsError] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = () => {
		if (!startDate && !endDate) {
			setError(errorsMulti.wrongDates);
			setIsError(true);
			return;
		} else if (!startDate) {
			setError(errorsMulti.startDateFirst);
			setIsError(true);
			return;
		} else if (!endDate) {
			setError(errorsMulti.notEndDate);
			setIsError(true);
			return;
		}
		setIsError(false);

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
		fetch(`${apiUrl}/timeoff`, requestOptions)
			.then(response => response.json())
			.then(newTimeOff => {
				setTimeOffs(prev => [newTimeOff, ...prev]);
				setStartDate("");
				setEndDate("");
			});
	};

	return (
		<div>
			<div className='dates font'>
				<input
					onClick={e => e.target.showPicker()}
					value={startDate}
					onChange={e => {
						if (checkIsWeekend(e.target.value)) {
							return;
						}
						setStartDate(e.target.value);
					}}
					className='start-date'
					type='date'
					min={new Date().toISOString().split("T")[0]}
				/>
				<input
					onClick={e => e.target.showPicker()}
					value={endDate}
					onChange={e => {
						if (checkIsWeekend(e.target.value)) {
							return;
						}
						setEndDate(e.target.value);
					}}
					className='end-date'
					type='date'
					min={startDate}
				/>
				{isError && <div className='error-box'>{error}</div>}
			</div>
			<div className='total-time-off label-text'>
				<p className='paragraph'>This doesn't include weekends</p>
			</div>
			<input className='reason font' placeholder='Reason (optional)' />
			<div className='div-spec'>
				<label className='label-text file-text'>Attach file (optional)</label>
				<input className='file-box' type='file' id='myFile' name='filename' />
			</div>
			<div className='btn-box'>
				<button
					type='button'
					onClick={handleSubmit}
					className='btn-request font'>
					Submit request
				</button>
			</div>
		</div>
	);
};

export default SickLeave;
