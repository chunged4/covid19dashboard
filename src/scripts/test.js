const fs = require("fs");

// Read the JSON file
const rawData = fs.readFileSync("../data/dailyStateData.json");
const jsonData = JSON.parse(rawData);

// Function to group objects by "state"
function groupByState(data) {
	const groupedData = {};

	data.forEach((item) => {
		const state = item.state;

		if (!(state in groupedData)) {
			groupedData[state] = [];
		}

		groupedData[state].push(item);
	}, {});

	return groupedData;
}

// Call the function to get the grouped result
const groupedData = groupByState(jsonData);

// Convert the object to a JSON string
const jsonContent = JSON.stringify(groupedData, null, 2);

// Write the JSON string to a file
fs.writeFileSync("groupedData.json", jsonContent);

console.log("Grouped data has been written to groupedData.json");
