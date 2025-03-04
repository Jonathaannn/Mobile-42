import { useContext } from "react";
import { SearchbarContext } from "../contexts/searchbar.context";

export default function useSearchbar() {
	const context = useContext(SearchbarContext);

	if (!context)
		throw new Error("useSearchbar must be used within a SearchbarProvider!");

	return context;
}
