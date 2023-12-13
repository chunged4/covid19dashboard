import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ContentLayout from "./components/ContentLayout";
import "./styles/app.css";
import "leaflet/dist/leaflet.css";
import { NavbarProvider } from "./context/NavbarContext";
import { StatsProvider } from "./context/StatsContext";
import MainTitles from "./components/MainTitles";

function App() {
	const [subtitle, setSubtitle] = useState("World");
	const [stateData, setStateData] = useState(null);
	const [countyData, setCountyData] = useState(null);
	const [loading, setLoading] = useState(true);

	const updateSubtitle = (newSubtitle) => {
		setSubtitle(newSubtitle);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch state data
				const stateResponse = await fetch(
					`https://api.covidactnow.org/v2/states.json?apiKey=f30545ebf5284bd8bef97485c6cab51f`
				);
				const stateData = await stateResponse.json();
				setStateData(stateData);

				// Fetch county data
				const countyResponse = await fetch(
					`https://api.covidactnow.org/v2/counties.json?apiKey=f30545ebf5284bd8bef97485c6cab51f`
				);
				const countyData = await countyResponse.json();
				setCountyData(countyData);

				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Render "Loading..." if still loading
	if (loading) {
		return <p>Loading...</p>;
	}

	// Render the actual content once data is ready
	return (
		<NavbarProvider>
			<StatsProvider>
				<div className="app">
					<Navbar updateSubtitle={updateSubtitle} />
					<div className="main-content">
						<MainTitles subtitle={subtitle} />
						<ContentLayout stateData={stateData} countyData={countyData} />
					</div>
				</div>
			</StatsProvider>
		</NavbarProvider>
	);
}

export default App;
