import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import useGetAllStateData from "./hooks/useGetAllStateData";
import { Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
	const [covidData, setCovidData] = useState(null);
	useGetAllStateData(covidData, setCovidData);

	return (
		<div className="App">
			<MapContainer
				center={[38, -100]}
				zoom={5}
				style={{ height: "800px", width: "100%" }}>
				<TileLayer
					url="https://api.mapbox.com/styles/v1/webdevlex/clp91lvcn000m01ree5tvfu4u/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid2ViZGV2bGV4IiwiYSI6ImNscDkxaTZndDFjcmsya3FsZWo1em5yaXIifQ.0r8erFbXaIeuDVnelCSh9g"
					attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
				/>
			</MapContainer>
		</div>
	);
}

export default App;
