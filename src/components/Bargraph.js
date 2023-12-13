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

const processedData = countryData.map((item) => ({
	...item,
	cases: parseInt(item.cases.replace(/,/g, ""), 10), // Remove commas and convert "cases" to an integer
	deaths: parseInt(item.deaths.replace(/,/g, ""), 10),
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
						left: 50,
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
			return (
				<BarChart
					data={stateData}
					margin={{
						left: 50,
					}}>
					<XAxis dataKey="state" label="" />
					<YAxis />
					<Tooltip />
					<Bar
						dataKey={
							barGraphSelected === "deaths" ? "actuals.deaths" : "actuals.cases"
						}
						fill="#ff3e58"
						name={barGraphSelected === "deaths" ? "Deaths" : "Cases"}
					/>
				</BarChart>
			);
		case "county":
			return (
				<BarChart
					data={countyData}
					margin={{
						left: 40,
					}}>
					<XAxis dataKey="county" label="" tick={false} />
					<YAxis />
					<Tooltip />
					<Bar
						dataKey={
							barGraphSelected === "deaths" ? "actuals.deaths" : "actuals.cases"
						}
						fill="#ff3e58"
						name={barGraphSelected === "deaths" ? "Deaths" : "Cases"}
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
