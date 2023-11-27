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

const legendFormatter = (value, entry) => {
	// You can customize the legend label here based on the dataKey
	if (entry.dataKey === "actuals.deaths") {
		return "Deaths";
	}
	if (entry.dataKey === "country_name") {
		return "Deaths";
	}
	// Default label
	return value;
};

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

const getBarChart = (selected) => {
	switch (selected) {
		case "world":
			return (
				<BarChart
					data={processedData}
					margin={{
						top: 40,
						right: 40,
						left: 40,
						bottom: -10,
					}}>
					<XAxis dataKey="country_name" label="" />
					<YAxis />
					<Tooltip />
					<Legend align="left" formatter={legendFormatter} />
					<Bar dataKey="deaths" fill="#ff3e58" name="Deaths" />
				</BarChart>
			);
		case "state":
			return (
				<BarChart
					data={stateData}
					margin={{
						top: 40,
						right: 40,
						left: 40,
						bottom: -10,
					}}>
					<XAxis dataKey="state" label="" />
					<YAxis />
					<Tooltip />
					<Legend align="left" formatter={legendFormatter} />
					<Bar dataKey="actuals.deaths" fill="#ff3e58" name="Deaths" />
					{/* <Bar dataKey="actuals.cases" fill="#ff3e58" name="Custom Cases Label" /> */}
				</BarChart>
			);
		case "county":
			return (
				<BarChart
					data={countyData}
					margin={{
						top: 40,
						right: 40,
						left: 40,
						bottom: -10,
					}}>
					<XAxis dataKey="county" label="" tick={false} />
					<YAxis />
					<Tooltip />
					<Legend align="left" formatter={legendFormatter} />
					<Bar dataKey="actuals.deaths" fill="#ff3e58" name="Deaths" />
					{/* <Bar dataKey="actuals.cases" fill="#ff3e58" name="Custom Cases Label" /> */}
				</BarChart>
			);
		default:
			return null;
	}
};

const Example = () => {
	const [selected, setSelected] = useContext(NavbarContext);

	return (
		<ResponsiveContainer width={getGraphWidth(selected)} height={300}>
			{getBarChart(selected)}
		</ResponsiveContainer>
	);
};

export default Example;
