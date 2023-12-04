const fs = require("fs");
const data = require("../data/countryData.json");
const populationData = require("../data/countryPopulation.json");

// Update the array with population information
data.forEach((countryData) => {
	const countryName = countryData["country_name"];
	if (populationData.hasOwnProperty(countryName)) {
		countryData["population"] = populationData[countryName];
	}
});

// Convert the updated data to JSON
const updatedJsonData = JSON.stringify(data, null, 2);

// Write the updated JSON to a file
fs.writeFileSync("updated_data.json", updatedJsonData);

console.log("Updated JSON data has been written to 'updated_data.json'.");
