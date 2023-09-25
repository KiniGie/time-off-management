import React, { useContext, useEffect, useState } from "react";
import TimeOff from "./TimeOff";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/ContextProvider";

const TimeOffData = () => {
	const { timeOffs, isLoading } = useContext(Context);
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const page = parseInt(params.get("page") ?? "1", 10);
	const timeOffsPerPage = 2;
	const [timeOffsToDisplay, setTimeOffsToDisplay] = useState(timeOffs);

	useEffect(() => {
		const numberOfPages = Math.ceil(timeOffs.length / timeOffsPerPage);

		if (timeOffs.length) {
			if (!page || page > numberOfPages) {
				navigate("/panel?page=1");
			}
			setTimeOffsToDisplay(
				timeOffs.slice(
					(page - 1) * timeOffsPerPage,
					(page - 1) * timeOffsPerPage + timeOffsPerPage
				)
			);
		}
	}, [page, timeOffs]);
	return (
		<div className='table-container'>
			<div className='time-off-requests label-text'>
				{isLoading ? (
					<div className='lds-ellipsis'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				) : (
					<div className='table-products'>
						<div className='border2'>
							{timeOffsToDisplay.map(timeoff => (
								<TimeOff
									key={timeoff.id}
									id={timeoff.id}
									timeOffType={timeoff.timeOffType}
									startDate={timeoff.startDate}
									endDate={timeoff.endDate}
									status={timeoff.status}
								/>
							))}
						</div>
					</div>
				)}
				<div className='link-box'>
					{[...Array(Math.ceil(timeOffs.length / timeOffsPerPage))].map(
						(el, index) => (
							<Link
								key={index}
								to={`/panel?page=${index + 1}`}
								style={
									index + 1 === page
										? { color: "rgb(135, 24, 239)" }
										: { color: "black" }
								}>
								{index + 1}
							</Link>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default TimeOffData;
