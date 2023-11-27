import React, { useContext } from "react";
import "../styles/navbar.css";
import logo from "../images/logo.svg";
import worldIcon from "../images/earth-americas-solid.svg";
import usaIcon from "../images/flag-usa-solid.svg";
import countyIcon from "../images/map-pin-solid.svg";
import { NavbarContext } from "../context/NavbarContext";

const Navbar = () => {
	const [selected, setSelected] = useContext(NavbarContext);

	const handleClick = (e) => {
		setSelected(e.target.dataset.name);
	};

	return (
		<div className="my-navbar">
			<div className="navbar-content">
				<div>
					<img src={logo} className="navbar-logo" alt="World" />
				</div>
				<ul className="navbar-list">
					<li
						className={`navbar-item ${selected === "world" ? "selected" : ""}`}
						data-name="world"
						onClick={(e) => handleClick(e)}>
						<img className="navbar-img" src={worldIcon} alt="World" />
					</li>
					<li
						className={`navbar-item ${selected === "state" ? "selected" : ""}`}
						data-name="state"
						onClick={(e) => handleClick(e)}>
						<img className="navbar-img" src={usaIcon} alt="USA" />
					</li>
					<li
						className={`navbar-item ${selected === "county" ? "selected" : ""}`}
						data-name="county"
						onClick={(e) => handleClick(e)}>
						<img className="navbar-img" src={countyIcon} alt="Pin" />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
