import React, { PureComponent } from "react";
import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Label,
} from "recharts";
import countyData from "../data/countyData.json";

export default class Example extends PureComponent {
	render() {
		return (
			<BarChart
				width={8000}
				height={300}
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
				{/* <Legend align="left" /> */}
				{/* <Bar dataKey="actuals.deaths" fill="#ff3e58" /> */}
				<Bar dataKey="actuals.cases" fill="#ff3e58" />
			</BarChart>
		);
	}
}
