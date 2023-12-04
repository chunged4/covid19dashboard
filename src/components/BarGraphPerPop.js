import React, { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

import countryData from "../data/countryData.json";
import stateData from "../data/stateData.json";
import countyData from "../data/countyData.json";
import geo from "../data/fipsStateToGeo.json";

function calculatePerPopulationCountry(countryDataArray) {
	const resultArray = [];

	countryDataArray.forEach((data) => {
		const totalCases = parseInt(data.cases.replace(/,/g, ""), 10);
		const totalDeaths = parseInt(data.deaths.replace(/,/g, ""), 10);
		const totalPopulation = data.population;

		if (
			!isNaN(totalCases) &&
			!isNaN(totalDeaths) &&
			!isNaN(totalPopulation) &&
			totalPopulation !== 0
		) {
			const casesPerPopulation = (totalCases / totalPopulation) * 1000000;
			const deathsPerPopulation = (totalDeaths / totalPopulation) * 1000000;

			resultArray.push({
				...data,
				casesPerPopulation: casesPerPopulation.toFixed(2),
				deathsPerPopulation: deathsPerPopulation.toFixed(2),
			});
		} else {
			// Handle cases where data is missing or population is 0
			resultArray.push({
				...data,
				casesPerPopulation: null,
				deathsPerPopulation: null,
			});
		}
	});

	return resultArray;
}

function calculatePerPopulation(dataArray) {
	const resultArray = [];

	dataArray.forEach((data) => {
		const totalCases = data.actuals.cases;
		const totalDeaths = data.actuals.deaths;
		const totalPopulation = data.population;

		if (
			totalCases !== null &&
			totalDeaths !== null &&
			totalPopulation !== null &&
			totalPopulation !== 0
		) {
			const casesPerPopulation = (totalCases / totalPopulation) * 1000000; // Adjust the scaling factor as needed
			const deathsPerPopulation = (totalDeaths / totalPopulation) * 1000000; // Adjust the scaling factor as needed

			resultArray.push({
				...data,
				casesPerPopulation: casesPerPopulation.toFixed(2),
				deathsPerPopulation: deathsPerPopulation.toFixed(2),
			});
		} else {
			// Handle cases where data is missing or population is 0
			resultArray.push({
				...data,
				casesPerPopulation: null,
				deathsPerPopulation: null,
			});
		}
	});

	return resultArray;
}

const getGraphWidth = (selected) => {
	switch (selected) {
		case "world":
			return 950;
		case "state":
			return 950;
		case "county":
			return 8000;
		default:
			return null;
	}
};

const getBarChart = (selected, barGraphSelected) => {
	switch (selected) {
		case "world":
			const countryDataPerPop = calculatePerPopulationCountry(countryData);
			return (
				<BarChart data={countryDataPerPop}>
					<XAxis dataKey="country_name" label="" />
					<YAxis
						domain={barGraphSelected === "deaths" ? [0, 6500] : [0, 700000]}
					/>
					<Tooltip />
					<Bar
						dataKey={
							barGraphSelected === "deaths"
								? "deathsPerPopulation"
								: "casesPerPopulation"
						}
						fill="#ff3e58"
						name={
							barGraphSelected === "deaths" ? "Deaths" : "Cases Per Population"
						}
					/>
				</BarChart>
			);
		case "state":
			const stateDataPerPop = calculatePerPopulation(stateData);
			return (
				<BarChart data={stateDataPerPop}>
					<XAxis dataKey="state" label="" />
					<YAxis
						domain={barGraphSelected === "deaths" ? [0, 5000] : [0, 120000]}
					/>
					<Tooltip />
					<Bar
						dataKey={
							barGraphSelected === "deaths"
								? "deathsPerPopulation"
								: "casesPerPopulation"
						}
						fill="#ff3e58"
						name={
							barGraphSelected === "deaths"
								? "Deaths Per Population"
								: "Cases Per Population"
						}
					/>
				</BarChart>
			);
		case "county":
			const newData = calculatePerPopulation(countyData);
			return (
				<BarChart data={newData}>
					<XAxis dataKey="county" label="" tick={false} />
					<YAxis
						domain={barGraphSelected === "deaths" ? [0, 6000] : [0, 800000]}
					/>
					<Tooltip />
					<Bar
						dataKey={
							barGraphSelected === "deaths"
								? "deathsPerPopulation"
								: "casesPerPopulation"
						}
						fill="#ff3e58"
						name={
							barGraphSelected === "deaths"
								? "Deaths Per Population"
								: "Cases Per Population"
						}
					/>
				</BarChart>
			);
		default:
			return null;
	}
};

const Example = ({ barGraphSelected }) => {
	const [selected, setSelected] = useContext(NavbarContext);

	return (
		<ResponsiveContainer width={getGraphWidth(selected)} height={250}>
			{getBarChart(selected, barGraphSelected)}
		</ResponsiveContainer>
	);
};

export default Example;
