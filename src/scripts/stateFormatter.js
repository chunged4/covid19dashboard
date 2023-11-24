const fs = require("fs");

// Read the JSON file
const rawData = fs.readFileSync("../data/states.json");
const jsonData = JSON.parse(rawData);

// Transform the data
const transformedData = jsonData.reduce((result, item) => {
	const { fips, state } = item;
	result[fips] = { state };
	return result;
}, {});

// Output the transformed data as JSON
const outputJson = JSON.stringify(transformedData, null, 2);

// Write the output to a new file
fs.writeFileSync("fipsToState.json", outputJson);

console.log("Transformation complete. Check your_output_file.json");
