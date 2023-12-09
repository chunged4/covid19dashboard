import React from "react";
import { Marker, Popup } from "react-leaflet";
import CountryPopup from "./CountryPopup";
import countries from "../data/countryData.json";
import geo from "../data/nameCountryToGeo.json";
import L from "leaflet";

function getIcon(width, height) {
	return L.icon({
		iconUrl: require("../images/pin.png"),
		iconSize: [width, height],
	});
}

const CountryCluster = () => {
	return countries.map((country, index) => {
		// Get Data
		const lng = geo[country.country_name]?.lng;
		const lat = geo[country.country_name]?.lat;

		if (lat !== undefined && lng !== undefined) {
			return (
				<Marker
					key={index}
					position={[lat, lng]}
					icon={getIcon(20, 26)}
					title={country.country_name}>
					<CountryPopup country={country} />
				</Marker>
			);
		}

		return null; // Return null if either lat or lng is missing
	});
};

export default CountryCluster;
