const fs = require("fs");

// Read the JSON file
const rawData = fs.readFileSync("./src/data/geo.json");
const jsonData = JSON.parse(rawData);

// Transform the data
const transformedData = jsonData.reduce((result, item) => {
	const { fips_code, lng, lat } = item;
	result[fips_code] = { lng, lat };
	return result;
}, {});

// Output the transformed data as JSON
const outputJson = JSON.stringify(transformedData, null, 2);

// Write the output to a new file
fs.writeFileSync("your_output_file.json", outputJson);

console.log("Transformation complete. Check your_output_file.json");
