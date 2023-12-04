import { useState, createContext } from "react";

export const StatsContext = createContext();

export function StatsProvider({ children }) {
	const [selectedStats, setSelectedStats] = useState("total");

	return (
		<StatsContext.Provider value={[selectedStats, setSelectedStats]}>
			{children}
		</StatsContext.Provider>
	);
}
