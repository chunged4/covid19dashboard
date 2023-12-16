import React, { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import CountyCluster from "./CountyCluster";
import CountryCluster from "./CountryCluster";
import StateCluster from "./StateCluster";

import "../styles/map.css";

const createClusterCustomIcon = function (cluster) {
	return L.divIcon({
		html: `
			<span>
				${cluster.getChildCount()}
			</span>`,
		className: "custom-marker-cluster",
		iconSize: L.point(32, 32, true),
	});
};

const getSelected = (selected) => {
	switch (selected) {
		case "world":
			return <CountryCluster />;
		case "state":
			return <StateCluster />;
		case "county":
			return <CountyCluster />;
		default:
			return null;
	}
};

const getMapCenter = (selected) => {
	switch (selected) {
		case "world":
			return [30, 30];
		case "state":
			return [38, -100];
		case "county":
			return [38, -100];
		default:
			return null;
	}
};

const getMapZoom = (selected) => {
	switch (selected) {
		case "world":
			return 2;
		case "state":
			return 4;
		case "county":
			return 4;
		default:
			return null;
	}
};

function SetViewOnClick({ coords, zoom }) {
	const map = useMap();
	map.setView(coords, zoom);
	return null;
}

const Map = ({ stateData, countyData }) => {
	// Test
	const [selected, setSelected] = useContext(NavbarContext);

	return (
		<MapContainer
			center={getMapCenter(selected)}
			zoom={getMapZoom(selected)}
			style={{ height: "100%", width: "100%" }}>
			<TileLayer
				url="https://api.mapbox.com/styles/v1/webdevlex/clp91lvcn000m01ree5tvfu4u/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid2ViZGV2bGV4IiwiYSI6ImNscDkxaTZndDFjcmsya3FsZWo1em5yaXIifQ.0r8erFbXaIeuDVnelCSh9g"
				attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
			/>
			<SetViewOnClick
				coords={getMapCenter(selected)}
				zoom={getMapZoom(selected)}
			/>
			<MarkerClusterGroup
				iconCreateFunction={createClusterCustomIcon}
				maxClusterRadius={100}
				spiderfyOnMaxZoom={true}
				showCoverageOnHover={true}
				polygonOptions={{
					fillColor: "#ff3e58",
					color: "#ff3e58",
					weight: 5,
					opacity: 1,
					fillOpacity: 0.5,
				}}>
				{getSelected(selected, stateData, countyData)}
			</MarkerClusterGroup>
		</MapContainer>
	);
};

export default Map;

