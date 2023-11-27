import React from "react";
import { Popup } from "react-leaflet";

const CountryPopup = ({ country }) => {
	return (
		<Popup>
			<div className="popup">
				<p className="popup-title">{country.country_name}</p>
				<p className="popup-text">
					<strong>Total Tests: </strong>
					<span className="popup-color">{country.total_tests}</span>
				</p>
				<p className="popup-text">
					<strong>Cases: </strong>
					<span className="popup-color">{country.cases}</span>
				</p>
				<p className="popup-text">
					<strong>Deaths: </strong>
					<span className="popup-color">{country.deaths}</span>
				</p>
			</div>
		</Popup>
	);
};

export default CountryPopup;
