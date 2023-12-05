import React, { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";
import Table from "react-bootstrap/Table";

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

const getTable = (selected) => {
	switch (selected) {
		case "world":
			const countryDataPerPop = calculatePerPopulationCountry(countryData);
			return (
				<>
					<thead>
						<tr>
							<th>Country</th>
							<th>Total Tests</th>
							<th>Cases Per Population</th>
							<th>Deaths Per Population</th>
						</tr>
					</thead>
					<tbody>
						{countryDataPerPop.map((country) => (
							<tr>
								<td>{country.country_name}</td>
								<td>{country.total_tests}</td>
								<td>{country.casesPerPopulation}</td>
								<td>{country.deathsPerPopulation}</td>
							</tr>
						))}
					</tbody>
				</>
			);
		case "state":
			const stateDataPerPop = calculatePerPopulation(stateData);
			return (
				<>
					<thead>
						<tr>
							<th>State</th>
							<th>Population</th>
							<th>Cases Per Population</th>
							<th>Deaths Per Population</th>
						</tr>
					</thead>
					<tbody>
						{stateDataPerPop.map((state) => {
							const stateName = geo[state.fips]?.name;

							return (
								<tr>
									<td>{stateName}</td>
									<td>{state.population}</td>
									<td>{state.casesPerPopulation}</td>
									<td>{state.deathsPerPopulation}</td>
								</tr>
							);
						})}
					</tbody>
				</>
			);
		case "county":
			const newData = calculatePerPopulation(countyData);
			return (
				<>
					<thead>
						<tr>
							<th>State</th>
							<th>County</th>
							<th>Population</th>
							<th>Cases Per Population</th>
							<th>Deaths Per Population</th>
						</tr>
					</thead>
					<tbody>
						{newData.map((county) => (
							<tr>
								<td>{county.state}</td>
								<td>{county.county}</td>
								<td>{county.population}</td>
								<td>{county.casesPerPopulation}</td>
								<td>{county.deathsPerPopulation}</td>
							</tr>
						))}
					</tbody>
				</>
			);
		default:
			return null;
	}
};

function DataTable() {
	const [selected, setSelected] = useContext(NavbarContext);

	return (
		<Table striped bordered hover variant="dark">
			{getTable(selected)}
		</Table>
	);
}

export default DataTable;
