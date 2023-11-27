import React from "react";
import { Marker, Popup } from "react-leaflet";
import StatePopup from "./StatePopup";
import states from "../data/stateData.json";
import geo from "../data/fipsStateToGeo.json";
import L from "leaflet";

function getIcon(width, height) {
	return L.icon({
		iconUrl: require("../images/pin.png"),
		iconSize: [width, height],
	});
}

const StateCluster = () => {
	return states.map((state, index) => {
		const stateName = geo[state.fips]?.name;
		const lng = geo[state.fips]?.lng;
		const lat = geo[state.fips]?.lat;
		state.name = stateName;

		// Check if both lat and lng exist before rendering the Marker
		if (lat !== undefined && lng !== undefined) {
			return (
				<Marker
					key={index}
					position={[lat, lng]}
					icon={getIcon(20, 26)}
					title={stateName}>
					<StatePopup state={state} />
				</Marker>
			);
		}

		return null; // Return null if either lat or lng is missing
	});
};

export default StateCluster;
