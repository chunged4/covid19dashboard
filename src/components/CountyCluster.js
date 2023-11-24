import React from "react";
import { Marker, Popup } from "react-leaflet";
import CountyPopup from "./CountyPopup";
import counties from "../data/countyData.json";
import geo from "../data/fipsCountyToGeo.json";
import L from "leaflet";

function getIcon(width, height) {
	return L.icon({
		iconUrl: require("../images/pin.png"),
		iconSize: [width, height],
	});
}

const CountyCluster = () => {
	return counties.map((county, index) => {
		const lng = geo[county.fips]?.lng;
		const lat = geo[county.fips]?.lat;

		// Check if both lat and lng exist before rendering the Marker
		if (lat !== undefined && lng !== undefined) {
			return (
				<Marker
					key={index}
					position={[lat, lng]}
					icon={getIcon(20, 26)}
					title={county.county}>
					<CountyPopup county={county} />
				</Marker>
			);
		}

		return null; // Return null if either lat or lng is missing
	});
};

export default CountyCluster;
