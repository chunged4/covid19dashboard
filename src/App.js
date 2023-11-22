import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import "leaflet/dist/leaflet.css";
import "./App.css";

const customIcon = new L.Icon({
	iconUrl: "./images/pin.png",
	iconSize: new L.Point(40, 47),
});

const createClusterCustomIcon = function (cluster) {
	return L.divIcon({
		html: `<span>${cluster.getChildCount()}</span>`,
		className: "custom-marker-cluster",
		iconSize: L.point(30, 30, true),
	});
};

function App() {
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
				<MarkerClusterGroup
					onClick={(e) => console.log("onClick", e)}
					iconCreateFunction={createClusterCustomIcon}
					maxClusterRadius={150}
					spiderfyOnMaxZoom={true}
					showCoverageOnHover={true}
					polygonOptions={{
						fillColor: "#c42727",
						color: "#c42727",
						weight: 5,
						opacity: 1,
						fillOpacity: 0.5,
					}}>
					<Marker
						position={[34, -118.2]}
						icon={customIcon}
						title="Los Angeles"
					/>
					<Marker
						position={[33.75, -118]}
						icon={customIcon}
						title="San Diego"
					/>
					<Marker position={[34, -117.5]} icon={customIcon} title="Riverside" />
					<Marker position={[32.75, -117.1]} icon={customIcon} title="Four" />
					<Marker position={[33.75, -117.95]} icon={customIcon} title="Five" />
					<Marker position={[33.75, -117.96]} icon={customIcon} title="Six" />
				</MarkerClusterGroup>
			</MapContainer>
		</div>
	);
}

export default App;
