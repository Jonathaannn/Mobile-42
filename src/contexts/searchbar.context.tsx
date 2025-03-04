import React, { createContext, useState, ReactNode, useContext } from "react";

interface SearchbarContextType {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchbarContext = createContext<SearchbarContextType | undefined>(
	undefined
);

interface SearchbarProviderProps {
	children: ReactNode;
}

export function SearchbarPovider({ children }: SearchbarProviderProps) {
	const [searchQuery, setSearchQuery] = useState<string>("");

	return (
		<SearchbarContext.Provider value={{ searchQuery, setSearchQuery }}>
			{children}
		</SearchbarContext.Provider>
	);
}
