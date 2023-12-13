import React from "react";
import "../styles/sources.css";
import Table from "react-bootstrap/Table";

const Sources = () => {
	const sources = [
		"https://rapidapi.com/spamakashrajtech/api/corona-virus-world-and-india-data",
		"https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics/",
		"https://rapidapi.com/slotixsro-slotixsro-default/api/covid-19-tracking/",
		"https://rapidapi.com/api-sports/api/covid-193/",
		"https://covidactnow.org/data-api",
		"https://data.worldbank.org/indicator/SP.POP.TOTL",
		"https://covidtracking.com/data/api",
	];

	const extractNameFromSource = (source) => {
		// Extract name from the URL (you may need to adjust this based on your actual source URLs)
		const parts = source.split("/");
		return parts[parts.length - 2] || `Name${sources.indexOf(source) + 1}`;
	};

	return (
		<div className="sources">
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>Name</th>
						<th>Sources</th>
					</tr>
				</thead>
				<tbody>
					{sources.map((source, index) => (
						<tr key={index}>
							<td>{extractNameFromSource(source)}</td>
							<td>{source}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Sources;
