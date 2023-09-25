import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/ContextProvider";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./HomePage.css";

const HomePage = () => {
	// homepage jest komponentem i f.strzalkowa
	const [opinions, setOpinions] = useState([]);
	const [opinion, setOpinion] = useState("");
	const [isInputFocus, setIsInputFocus] = useState(false);
	const { isLogged } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLogged) {
			navigate("/login");
		}
	}, []); //useEffect wykonuje sie na pcozatku i w momencie zmiany zaleznosci podanych w []

	if (!isLogged) {
		return null; // null zeby strona nie mignela
	}

	const handleAddOpinion = () => {
		//f.strzalkowa, zero argumentowa
		if (!opinion) {
			return;
		}

		const newOpinion = {
			/* id: Math.floor(Math.random() * 1000), */
			person: "Jan Skoczny",
			text: opinion,
		};
		console.log("dodaje");
		setOpinions([newOpinion, ...opinions]);
		setOpinion("");
	};

	return (
		<div className='home'>
			<div className='main-section'>
				<div className='main-photo'>
					<Swiper pagination={{ clickable: true }} modules={[Pagination]}>
						<SwiperSlide>
							<img
								src='https://img.freepik.com/premium-zdjecie/fioletowa-inspiracja-wnetrza-przestrzeni-roboczej_828688-1950.jpg?size=626&ext=jpg&ga=GA1.1.1922413231.1689935713&semt=ais'
								className='office-pic'
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								src='https://img.freepik.com/premium-zdjecie/nowoczesne-wnetrze-salonu-loft_33739-262.jpg?w=1800'
								alt='office-2'
								className='office-pic'
							/>
						</SwiperSlide>
					</Swiper>
				</div>
				<div className='main-info'>
					<p className='info-box'>
						In the new location, a space has been designed that meets the
						requirements of the most demanding employees. The assumption was
						therefore to ensure the highest quality equipment ensuring correct
						posture and silence, as well as ensuring privacy.
					</p>
				</div>
			</div>
			<div className='section-content'>
				<div className='box1 home-box-spec'>
					<p className='size'>Departments</p>
					<ul className='departments-list'>
						<li>Development</li>
						<li>Legal & Compliance</li>
						<li>Operations</li>
						<li>Human Resources</li>
						<li>Finance</li>
						<li>Marketing & PR</li>
					</ul>
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
							onBlur={() => setIsInputFocus(false)} // odwrotnosc onFocusa
							className='input-search' // ZMIENIC TU
							placeholder='Tell us your opinion'
							value={opinion}  // wartosc inputa i wartosc stanu opinion beda ze soba zsynchronizowane (do tego potrzeba value ionChange), jak zmienia sie wartosc inputa to zmienia sie stan i na odwrot
							onChange={e => {
								setOpinion(e.target.value); // na wpisanie czegos ustaw wartosc na wartosc wpisane 
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
							{opinions.map(opinion => ( // wyswietla tablice htmlow
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
					<ul className='tools-list'>
						<li className='tools-item'>
							<a
								href='https://www.google.pl/?client=safari'
								className='link-tools'>
								<img
									className='pic-tools'
									src='https://images.sftcdn.net/images/t_app-icon-m/p/a4ff16fe-96d1-11e6-a92a-00163ec9f5fa/3049944431/google-drive-icon.png'
								/>
								Google Dive
							</a>
						</li>

						<li className='tools-item'>
							<a
								href='https://www.google.pl/?client=safari'
								className='link-tools'>
								<img
									className='pic-tools'
									src='https://w7.pngwing.com/pngs/684/413/png-transparent-figma-logo-thumbnail-tech-companies-thumbnail.png'
								/>
								Figma
							</a>
						</li>

						<li className='tools-item'>
							<a
								href='https://www.google.pl/?client=safari'
								className='link-tools'>
								<img
									className='pic-tools'
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png'
								/>
								Slack
							</a>
						</li>

						<li className='tools-item'>
							<a
								href='https://www.google.pl/?client=safari'
								className='link-tools'>
								<img
									className='pic-tools'
									src='https://static-00.iconduck.com/assets.00/jira-icon-512x512-z7na7dot.png'
								/>
								Jira
							</a>
						</li>

						<li className='tools-item'>
							<a
								href='https://www.google.pl/?client=safari'
								className='link-tools'>
								<img
									className='pic-tools'
									src='https://yt3.googleusercontent.com/X-rhKMndFm9hT9wIaJns1StBfGbFdLTkAROwm4UZ3n9ucrBky5CFIeeZhSszFXBgQjItzCD0SA=s900-c-k-c0x00ffffff-no-rj'
								/>
								Postman
							</a>
						</li>
						<li className='tools-item'>
							<a
								href='https://www.google.pl/?client=safari'
								className='link-tools'>
								<img
									className='pic-tools'
									src='https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg'
								/>
								GitHub
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
