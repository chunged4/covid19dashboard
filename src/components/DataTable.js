import React from "react";
import Table from "react-bootstrap/Table";
import countyData from "../data/countyData.json";

function DataTable() {
  return (
    <Table striped bordered hover variant="dark">
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
        {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr> */}
      </tbody>
    </Table>
  );
}

export default DataTable;
