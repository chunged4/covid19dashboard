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

const processedData = countryData.map((item) => ({
	...item,
	cases: parseInt(item.cases, 10), // Convert "cases" to an integer
}));

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
			return (
				<BarChart
					data={processedData}
					margin={{
						top: 70,
						right: 40,
						left: 40,
						bottom: 0,
					}}>
					<XAxis dataKey="country_name" label="" />
					<YAxis />
					<Tooltip />
					<Bar
						dataKey={barGraphSelected === "deaths" ? "deaths" : "cases"}
						fill="#ff3e58"
						name={barGraphSelected === "deaths" ? "Deaths" : "Cases"}
					/>
				</BarChart>
			);
		case "state":
			const stateDataPerPop = calculatePerPopulation(stateData);
			return (
				<BarChart
					data={stateDataPerPop}
					margin={{
						top: 70,
						right: 40,
						left: 40,
						bottom: 0,
					}}>
					<XAxis dataKey="state" label="" />
					<YAxis />
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
			const countyDataPerPop = calculatePerPopulation(countyData);
			return (
				<BarChart
					data={countyDataPerPop}
					margin={{
						top: 70,
						right: 40,
						left: 40,
						bottom: 0,
					}}>
					<XAxis dataKey="county" label="" tick={false} />
					<YAxis />
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
		<ResponsiveContainer width={getGraphWidth(selected)} height={300}>
			{getBarChart(selected, barGraphSelected)}
		</ResponsiveContainer>
	);
};

export default Example;
