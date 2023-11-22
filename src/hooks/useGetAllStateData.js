import axios from "axios";

const useGetAllStateData = async (covidData, setCovidData) => {
	if (!covidData) {
		try {
			const res = await axios.get(
				"https://api.covidtracking.com/v1/states/current.json"
			);
			console.log(res.data);
			setCovidData(res.data);
		} catch (err) {
			console.log(err);
		}
	}
};

export default useGetAllStateData;
