import React, { useState, useContext } from "react";
import caret from "../images/caret-up-solid.svg";
import { StatsContext } from "../context/StatsContext";

const MainTitles = ({ subtitle }) => {
	const [selectedStats, setSelectedStats] = useContext(StatsContext);

	const handleBarGraphClick = (option) => {
		setSelectedStats(option);
	};

	return (
		<div className="titles">
			<h1 className="main-title">Covid-19 Statistics</h1>
			<div className="sub-title-wrapper">
				<p className="sub-title">{subtitle}</p>
				<img src={caret} alt="" className="sub-title-icon" />
			</div>
			<ul className="stats-nav">
				<li
					className={`stats-nav-item ${
						selectedStats === "total" ? "stats-nav-selected" : ""
					}`}
					onClick={() => handleBarGraphClick("total")}>
					Total
				</li>
				<li
					className={`stats-nav-item ${
						selectedStats === "per-pop" ? "stats-nav-selected" : ""
					}`}
					onClick={() => handleBarGraphClick("per-pop")}>
					Per Population
				</li>
			</ul>
		</div>
	);
};

export default MainTitles;
