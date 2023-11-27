import React, { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";
import Table from "react-bootstrap/Table";

import countryData from "../data/countryData.json";
import stateData from "../data/stateData.json";
import countyData from "../data/countyData.json";
import geo from "../data/fipsStateToGeo.json";

const getTable = (selected) => {
	switch (selected) {
		case "world":
			return (
				<>
					<thead>
						<tr>
							<th>Country</th>
							<th>Total Tests</th>
							<th>Cases</th>
							<th>Deaths</th>
						</tr>
					</thead>
					<tbody>
						{countryData.map((country) => (
							<tr>
								<td>{country.country_name}</td>
								<td>{country.total_tests}</td>
								<td>{country.cases}</td>
								<td>{country.deaths}</td>
							</tr>
						))}
					</tbody>
				</>
			);
		case "state":
			return (
				<>
					<thead>
						<tr>
							<th>State</th>
							<th>Population</th>
							<th>Cases</th>
							<th>Deaths</th>
						</tr>
					</thead>
					<tbody>
						{stateData.map((state) => {
							const stateName = geo[state.fips]?.name;

							return (
								<tr>
									<td>{stateName}</td>
									<td>{state.population}</td>
									<td>{state.actuals.cases}</td>
									<td>{state.actuals.deaths}</td>
								</tr>
							);
						})}
					</tbody>
				</>
			);
		case "county":
			return (
				<>
					<thead>
						<tr>
							<th>State</th>
							<th>County</th>
							<th>Population</th>
							<th>Cases</th>
							<th>Deaths</th>
						</tr>
					</thead>
					<tbody>
						{countyData.map((county) => (
							<tr>
								<td>{county.state}</td>
								<td>{county.county}</td>
								<td>{county.population}</td>
								<td>{county.actuals.cases}</td>
								<td>{county.actuals.deaths}</td>
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
