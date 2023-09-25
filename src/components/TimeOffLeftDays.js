import React, { useContext } from "react";
import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Context } from "../store/ContextProvider";
import { calculateDaysByType, countTimeoffDays } from "../utlis/days";

const TimeOffLeftDays = () => {
	const { timeOffs } = useContext(Context);
	function getDaysBetweenDates(date1, date2) {
		const oneDay = 24 * 60 * 60 * 1000;

		const d1 = new Date(date1);
		const d2 = date2 === "" ? d1 : new Date(date2);

		const diffDays = Math.round(Math.abs((d2 - d1) / oneDay));

		if (isNaN(diffDays)) {
			console.log(d2, date2);
		}

		return diffDays;
	}

	return (
		<div className='right-side box-spec'>
			<div className='time-off-entitlement font label-text'>
				<table>
					<thead>
						<tr>
							<th className='th-types'>Type of time off</th>
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
								<div className='th-center'>
									{calculateDaysByType(timeOffs, "Vacation")}/26
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<FontAwesomeIcon icon={faHeart} />
								Sick leave used
							</td>
							<td>
								<div className='th-center'>
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
