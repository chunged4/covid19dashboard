import React, { useMemo } from "react";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Cell,
	Text,
	LabelList,
} from "recharts";
import "../styles/world-bar-graph.css";

const data = [
	{ name: "Total_Cases", pv: 509268964 },
	{ name: "Total_Recovered", pv: 461827849 },
	{ name: "Total_Deaths", pv: 6242509 },
	{ name: "Serious_Critical", pv: 42510 },
];

const YAxisLeftTick = ({ y, payload: { value } }) => {
	return (
		<Text x={0} y={y} textAnchor="start" verticalAnchor="middle" scaleToFit>
			{value}
		</Text>
	);
};

let ctx;

export const measureText14HelveticaNeue = (text) => {
	if (!ctx) {
		ctx = document.createElement("canvas").getContext("2d");
		ctx.font = "14px 'Helvetica Neue";
	}

	return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE = 10;

const SimpleBarChart = () => {
	const xKey = "name";
	const yKey = "pv";

	const maxTextWidth = useMemo(
		() =>
			data.reduce((acc, cur) => {
				const value = cur[yKey];
				const width = measureText14HelveticaNeue(value.toLocaleString());
				if (width > acc) {
					return width;
				}
				return acc;
			}, 0),
		[data, yKey]
	);

	return (
		<ResponsiveContainer width={"100%"} height={77 * data.length} debounce={50}>
			<BarChart
				data={data}
				layout="vertical"
				margin={{
					left: -10,
					top: 55,
					right: 150,
				}}>
				<XAxis hide axisLine={false} type="number" />
				<YAxis
					yAxisId={0}
					dataKey={xKey}
					type="category"
					axisLine={false}
					tickLine={false}
					tick={YAxisLeftTick}
				/>
				<YAxis
					orientation="right"
					yAxisId={1}
					dataKey={yKey}
					type="category"
					axisLine={false}
					tickLine={false}
					tickFormatter={(value) => value.toLocaleString()}
					mirror
					tick={{
						transform: `translate(${maxTextWidth + BAR_AXIS_SPACE + 45}, 0)`,
					}}
				/>
				<YAxis
					orientation="left"
					yAxisId={2}
					dataKey={xKey}
					type="category"
					axisLine={false}
					tickLine={false}
					tickFormatter={(value) => value.toLocaleString()}
					mirror
					tick={{
						transform: `translate(-10, -28)`,
					}}
					className="test"
				/>
				<Bar
					dataKey={yKey}
					minPointSize={2}
					barSize={26}
					background={{ fill: "#444" }}>
					{data.map((d, idx) => {
						return <Cell key={d[xKey]} fill="#ff3e58" />;
					})}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default SimpleBarChart;
