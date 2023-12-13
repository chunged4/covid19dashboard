import React from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { parse, format } from "date-fns";

import stateTimeData from "../data/dailyByStateData.json";

const chart = (data) => {
	// Reverse the order of the filtered data
	const reversedData = [...data].reverse();

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
					bottom: 30,
				}}>
				<XAxis dataKey="date" tick={false} />
				<YAxis />
				<Tooltip />
				<Area
					type="monotone"
					dataKey="positive"
					stroke="#ff3e58"
					fill="#ff3e58"
					name="Positive"
				/>

				{/* Add more Area components for additional data series */}
				<Legend align="left" />
			</AreaChart>
		</ResponsiveContainer>
	);
};

const AreaGraph = () => {
	const firstStateArr = Object.values(stateTimeData)[0];

	return chart(firstStateArr);
};

// const AreaGraph = () => {
// 	return (
// 		<>
// 			{Object.values(stateTimeData).map((stateArr) => {
// 				return <div>{chart(stateArr)}</div>;
// 			})}
// 		</>
// 	);
// };

export default AreaGraph;
