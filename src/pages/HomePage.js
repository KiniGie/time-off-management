import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/ContextProvider";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./HomePage.css";

const HomePage = () => {
	const [opinions, setOpinions] = useState([]);
	const [opinion, setOpinion] = useState("");
	const [isInputFocus, setIsInputFocus] = useState(false);
	const { isLogged } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLogged) {
			navigate("/login");
		}
	}, []);

	if (!isLogged) {
		return null;
	}

	const handleAddOpinion = () => {
		if (!opinion) {
			return;
		}

		const newOpinion = {
			/* id: Math.floor(Math.random() * 1000), */
			person: "Jan Skoczny",
			text: opinion,
		};

		setOpinions([newOpinion, ...opinions]);
	};

	return (
		<div className='home'>
			<div className='main-section'>
				<div className='main-photo'>
					<Swiper pagination={{ clickable: true }} modules={[Pagination]}>
						<SwiperSlide>
							<img
								src='https://img.freepik.com/darmowe-zdjecie/rendering-3d-spotkanie-biznesowe-i-pokoj-pracy-na-budynku-biurowym_105762-1972.jpg?w=2000&t=st=1689935736~exp=1689936336~hmac=51b6ac9371fddad0254664d8bf6e1042358e4985af04a80082aa47c88e5c733a'
								className='office-pic'
							/>
						</SwiperSlide>

						<SwiperSlide>
							<img
								src='https://img.freepik.com/premium-zdjecie/multiracial-nowoczesny-zespol-biznesowy-rozwijajacy-strategie-firmy-w-biurze_52137-6803.jpg?size=626&ext=jpg&ga=GA1.1.1922413231.1689935713&semt=sph'
								alt='office-2'
								className='office-pic'
							/>
						</SwiperSlide>

						<SwiperSlide>
							<img
								src='https://img.freepik.com/premium-zdjecie/pokoj-w-pustym-biurze_780608-4633.jpg?size=626&ext=jpg&ga=GA1.1.1922413231.1689935713&semt=sph'
								alt='office-3'
								className='office-pic'
							/>
						</SwiperSlide>
					</Swiper>
				</div>
				<div className='main-info'>
					<p className='info-box'>
						W nowej lokalizacji zaprojektowano przesteń spełniającą wymogi najbardziej wymagających pracowników. 
						Załozeniem było więc zadbanie o najwyzszej jakosci wyposazenie dbające o prawidłową postawę oraz ciszę, a takze zapewnienie prywatności. 
					</p>
				</div>
			</div>
			<div className='section-content'>
				<div className='box1 home-box-spec'>
					<p className='size'>Departments</p>
					<p>Development</p>
					<p>Legal & Compliance</p>
					<p>Operations</p>
					<p>Human Resources</p>
					<p>Finance</p>
					<p>Marketing & PR</p>
				</div>
				<div className='box2 home-box-spec color'>
					<div
						className='box-input-opinion'
						style={
							isInputFocus ? { outline: "1px solid rgb(171, 121, 218)" } : {}
						}>
						<img
							className='person-pic'
							src='https://cdn.pixabay.com/photo/2016/03/05/18/54/animal-1238228_1280.jpg'></img>
						<input
							onFocus={() => setIsInputFocus(true)}
							onBlur={() => setIsInputFocus(false)}
							className='input-search' // ZMIENIC TU
							placeholder='Podziel się z nami swoją opinią'
							onChange={e => {
								setOpinion(e.target.value);
							}}></input>
						<button
							className='btn-send'
							type='button'
							onClick={handleAddOpinion}>
							Send
						</button>
					</div>
					<div className='opinion-box home-box-spec'>
						<div className='opinion-post'>
							{opinions.map(opinion => (
								<>
									<div className='ramka1'>
										<img
											className='person-pic'
											src='https://cdn.pixabay.com/photo/2016/03/05/18/54/animal-1238228_1280.jpg'></img>
										{opinion.person}
									</div>
									<div className='ramka2'>{opinion.text}</div>
								</>
							))}
						</div>
					</div>
				</div>
				<div className='box3 home-box-spec'>
					<p className='size'>Company tools</p>
					<tr className='mm0'>
						<th className='mm1'>
							<a href='https://www.google.pl/'>
								<img
									src='https://images.sftcdn.net/images/t_app-icon-m/p/a4ff16fe-96d1-11e6-a92a-00163ec9f5fa/3049944431/google-drive-icon.png'
									alt='google drive'
									className='pic'
								/>
							</a>
						</th>
						<th className='mm2'>
							<a href='https://www.google.pl/'>Google Drive</a>
						</th>
					</tr>
					<tr className='mm0'>
						<th className='mm1'>
							<a href='https://www.atlassian.com/pl/software/jira'>
								<img
									src='https://static-00.iconduck.com/assets.00/jira-icon-512x512-z7na7dot.png'
									alt='jira'
									className='pic'
								/>
							</a>
						</th>
						<th className='mm2'>
							<a href='https://www.google.pl/'>Jira</a>
						</th>
					</tr>

					<tr className='mm0'>
						<th className='mm1'>
							<a href='https://www.postman.com'>
								<img
									src='https://yt3.googleusercontent.com/X-rhKMndFm9hT9wIaJns1StBfGbFdLTkAROwm4UZ3n9ucrBky5CFIeeZhSszFXBgQjItzCD0SA=s900-c-k-c0x00ffffff-no-rj'
									alt='postman'
									className='pic'
								/>
							</a>
						</th>
						<th className='mm2'>
							<a href='https://www.google.pl/'>Postman</a>
						</th>
					</tr>

					<tr className='mm0'>
						<th className='mm1'>
							<a href='www.google.com'>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png'
									alt='slack'
									className='pic'
								/>
							</a>
						</th>
						<th className='mm2'>
							<a href='https://www.google.pl/'>Slack</a>
						</th>
					</tr>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
