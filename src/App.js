import React, { useState } from "react";

import Navbar from "./components/Navbar";
import ContentLayout from "./components/ContentLayout";

import "./styles/app.css";
import "leaflet/dist/leaflet.css";

import { NavbarProvider } from "./context/NavbarContext";
import { StatsProvider } from "./context/StatsContext";
import MainTitles from "./components/MainTitles";

function App() {
	const [subtitle, setSubtitle] = useState("World");

	const updateSubtitle = (newSubtitle) => {
		setSubtitle(newSubtitle);
	};

	return (
		<NavbarProvider>
			<StatsProvider>
				<div className="app">
					<Navbar updateSubtitle={updateSubtitle} />
					<div className="main-content">
						<MainTitles subtitle={subtitle} />
						<ContentLayout />
					</div>
				</div>
			</StatsProvider>
		</NavbarProvider>
	);
}

export default App;
