import React, { PureComponent } from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { parse, format } from "date-fns";

import data from "../data/dailyStateData.json";

export default class Example extends PureComponent {
	static demoUrl = "https://codesandbox.io/s/simple-area-chart-4ujxw";

	render() {
		// Filter the data to only include entries with state === "CA"
		const filteredData = data.filter((entry) => entry.state === "CA");

		// Reverse the order of the filtered data
		const reversedData = [...filteredData].reverse();

		// Format the date field
		const formattedData = reversedData.map((entry) => ({
			...entry,
			date: format(parse(entry.date, "yyyyMMdd", new Date()), "MM/dd/yyyy"),
		}));

		return (
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					width={500}
					height={400}
					data={formattedData}
					margin={{
						top: 30,
						right: 30,
						left: 40,
						bottom: 0,
					}}>
					<XAxis dataKey="date" tick={false} />
					<YAxis />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="positive"
						stroke="#ff3e58"
						fill="#ff3e58"
					/>
				</AreaChart>
			</ResponsiveContainer>
		);
	}
}
