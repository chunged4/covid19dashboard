import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import CountyCluster from "./CountyCluster";

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

const Map = () => {
	return (
		<MapContainer
			center={[38, -100]}
			zoom={4}
			style={{ height: "100%", width: "100%" }}>
			<TileLayer
				url="https://api.mapbox.com/styles/v1/webdevlex/clp91lvcn000m01ree5tvfu4u/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid2ViZGV2bGV4IiwiYSI6ImNscDkxaTZndDFjcmsya3FsZWo1em5yaXIifQ.0r8erFbXaIeuDVnelCSh9g"
				attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
			/>
			<MarkerClusterGroup
				iconCreateFunction={createClusterCustomIcon}
				maxClusterRadius={125}
				spiderfyOnMaxZoom={true}
				showCoverageOnHover={true}
				polygonOptions={{
					fillColor: "#ff3e58",
					color: "#ff3e58",
					weight: 5,
					opacity: 1,
					fillOpacity: 0.5,
				}}>
				<CountyCluster />
			</MarkerClusterGroup>
		</MapContainer>
	);
};

export default Map;
