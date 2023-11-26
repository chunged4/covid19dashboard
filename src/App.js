import React from "react";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Bargraph from "./components/Bargraph";
import AreaGraph from "./components/AreaGraph";
import "./styles/app.css";
import "leaflet/dist/leaflet.css";

import { NavbarProvider } from "./context/NavbarContext";

function App() {
	return (
		<NavbarProvider>
			<div className="app">
				<div className="navbar-area">
					<Navbar />
				</div>
				<div className="title-area">
					<h1 className="title">Affected Areas</h1>
				</div>
				<div className="map-area">
					<Map />
				</div>
				<div className="table-area"></div>
				<div className="histogram-area">
					<Bargraph />
				</div>
				<div className="bargraph-area">
					<AreaGraph />
				</div>
			</div>
		</NavbarProvider>
	);
}

export default App;
