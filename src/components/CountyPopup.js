import React from "react";
import { Popup } from "react-leaflet";

const CountyPopup = ({ county }) => {
	return (
		<Popup>
			<div className="popup">
				<p className="popup-title">{county.county}</p>
				<p className="popup-text">
					<strong>Population: </strong>
					<span className="popup-color">{county.population}</span>
				</p>
				<p className="popup-text">
					<strong>Cases: </strong>
					<span className="popup-color">{county.actuals.cases}</span>
				</p>
				<p className="popup-text">
					<strong>Deaths: </strong>
					<span className="popup-color">{county.actuals.deaths}</span>
				</p>
			</div>
		</Popup>
	);
};

export default CountyPopup;
