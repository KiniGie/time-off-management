import React, { useContext } from "react";
import { formatTimeOffs } from "../utlis/formatNames";
import { Context } from "../store/ContextProvider";
import {
	faCircleCheck,
	faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiUrl } from "../utlis/api";

const TimeOff = ({ id, timeOffType, startDate, endDate, status }) => {
	const { role, fetchTimeOffs } = useContext(Context);

	const handleChangeStatus = async statusToSet => {
		if (statusToSet.toLowerCase() === status.toLowerCase()) return;

		const requestOptions = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				status: statusToSet,
			}),
		};

		const response = await fetch(
			`${apiUrl}/timeoff/${id}`,
			requestOptions
		);
		if (response.status === 200) {
			fetchTimeOffs();
		}
	};

	return (
		<div className='timeOff-container'>
			<div className='ttt'>
				<p className='d'>From</p>
				<p className='d2'>to</p>
			</div>
			<div className='timeofff'>
				<div className='td-timeOff1'>{startDate}</div>
				<div className='d2'>{endDate}</div>
			</div>
			<div className='tff'>
				<div className='td-timeOff'>{formatTimeOffs(timeOffType)}</div>
				<div className='td-timeOff3'>
					{status}
					{role === "admin" ? (
						<div className='icons-box'>
							<div className='box-btns'>
								<button
									onClick={() => handleChangeStatus("Approved")}
									className='btn-action btn-accept'
									style={{
										border: "none",
										cursor: "pointer",
										backgroundColor: "transparent",
									}}>
									<FontAwesomeIcon
										icon={faCircleCheck}
										style={{ color: "rgb(158, 83, 229)", height: "20px" }}
									/>
								</button>
								<button
									onClick={() => handleChangeStatus("Declined")}
									className='btn-action btn-declined'
									style={{
										border: "none",
										cursor: "pointer",
										backgroundColor: "transparent",
									}}>
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
