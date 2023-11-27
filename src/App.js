import React from "react";

import Navbar from "./components/Navbar";
import ContentLayout from "./components/ContentLayout";

import "./styles/app.css";
import "leaflet/dist/leaflet.css";

import { NavbarProvider } from "./context/NavbarContext";

function App() {
	return (
		<NavbarProvider>
			<div className="app">
				<Navbar />
				<div className="main-content">
					<div className="titles">
						<h1 className="main-title">Covid-19 Statistics</h1>
						<div className="sub-title-wrapper">
							<p className="sub-title">By County</p>
						</div>
					</div>
					<ContentLayout />
				</div>
			</div>
		</NavbarProvider>
	);
}

export default App;
