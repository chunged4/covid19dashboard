import React, { useContext, useState } from "react";
import Map from "./Map";
import Bargraph from "./Bargraph";
import BarGraphPerPop from "./BarGraphPerPop";
import AreaGraph from "./AreaGraph";
import DataTable from "./DataTable";
import DataTablePerPop from "./DataTablePerPop";
import "../styles/content-layout.css";
import WorldBarGraph from "./WorldBarGraph";
import { NavbarContext } from "../context/NavbarContext";
import { StatsContext } from "../context/StatsContext";

const getTitle = (selected) => {
	switch (selected) {
		case "world":
			return "Cases By Country";
		case "state":
			return "Cases By State";
		case "county":
			return "Cases By County";
		default:
			return null;
	}
};

const ContentLayout = () => {
	const [selected, setSelected] = useContext(NavbarContext);
	const [selectedStats, setSelectedStats] = useContext(StatsContext);
	const [barGraphSelected, setBarGraphSelected] = useState("cases");

	const handleBarGraphClick = (option) => {
		setBarGraphSelected(option);
	};

	return (
		<div className="content-layout">
			<div className="map-area">
				<Map />
			</div>
			<div className="table-area">
				{selectedStats === "total" ? <DataTable /> : <DataTablePerPop />}
			</div>
			<div className="histogram-area">
				<div className="bar-graph-title-wrapper">
					<h3 className="area-title">{getTitle(selected)}</h3>
					<ul className="bar-graph-nav">
						<li
							className={`bar-graph-nav-item ${
								barGraphSelected === "cases" ? "bar-graph-selected" : ""
							}`}
							onClick={() => handleBarGraphClick("cases")}>
							Cases
						</li>
						<li
							className={`bar-graph-nav-item ${
								barGraphSelected === "deaths" ? "bar-graph-selected" : ""
							}`}
							onClick={() => handleBarGraphClick("deaths")}>
							Deaths
						</li>
					</ul>
				</div>
				<div className="bar-graph-wrapper">
					{selectedStats === "total" ? (
						<Bargraph barGraphSelected={barGraphSelected} />
					) : (
						<BarGraphPerPop barGraphSelected={barGraphSelected} />
					)}
				</div>
			</div>
			<div className="bargraph-area">
				<h3 className="area-title world-graph-title">World Statistics</h3>
				<WorldBarGraph />
			</div>
		</div>
	);
};

export default ContentLayout;
