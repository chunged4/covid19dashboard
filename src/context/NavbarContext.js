import { useState, createContext } from "react";

export const NavbarContext = createContext();

export function NavbarProvider({ children }) {
	const [selected, setSelected] = useState("world");

	return (
		<NavbarContext.Provider value={[selected, setSelected]}>
			{children}
		</NavbarContext.Provider>
	);
}
