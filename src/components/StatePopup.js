import React from "react";
import { Popup } from "react-leaflet";

const StatePopup = ({ state }) => {
	return (
		<Popup>
			<div className="popup">
				<p className="popup-title">{state.name}</p>
				<p className="popup-text">
					<strong>Population: </strong>
					<span className="popup-color">{state.population}</span>
				</p>
				<p className="popup-text">
					<strong>Cases: </strong>
					<span className="popup-color">{state.actuals.cases}</span>
				</p>
				<p className="popup-text">
					<strong>Deaths: </strong>
					<span className="popup-color">{state.actuals.deaths}</span>
				</p>
			</div>
		</Popup>
	);
};

export default StatePopup;
