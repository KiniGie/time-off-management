import React from "react";
import { Link, useNavigate } from "react-router-dom";

/* import Navigation from "./components/Navigation.css";
 */
const Navigation = () => {
	return (
		<nav>
			<ul className='main-menu'>
				<li>
					<Link className='btn-nav-request header-menu' to='panel?page=1'>
						Request time off
					</Link>
				</li>
				<li>
					<Link className=' header-menu' to='/'>
						Home
					</Link>
				</li>
				<li>
					<Link className=' header-menu' to='/login'>
						Log out
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
