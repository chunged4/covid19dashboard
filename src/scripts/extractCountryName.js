const fs = require("fs");
const countryData = require("../data/countryData.json");

function extractCountryNames(countryDataArray) {
	const countryNames = countryDataArray.map((data) => data.country_name);
	return countryNames;
}

const namesOnly = extractCountryNames(countryData);

// Convert the array to a string for writing to a file
const namesString = namesOnly.join("\n");

// Specify the file path where you want to save the names
const filePath = "country_names.txt";

// Write the names to the file
fs.writeFileSync(filePath, namesString);

console.log(`Country names have been written to ${filePath}`);
