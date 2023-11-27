import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import countyData from "../data/countyData.json";

const Example = () => {
	const legendFormatter = (value, entry) => {
		// You can customize the legend label here based on the dataKey
		if (entry.dataKey === "actuals.deaths") {
			return "Deaths";
		}
		// Default label
		return value;
	};

	return (
		<ResponsiveContainer width={8000} height={300}>
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
		</ResponsiveContainer>
	);
};

export default Example;
