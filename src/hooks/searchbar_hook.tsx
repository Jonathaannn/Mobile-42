import { useContext } from "react";
import { SearchbarContext } from "../contexts/searchbar_context";

export default function useSearchbar() {
	const context = useContext(SearchbarContext);

	if (!context)
		throw new Error("useSearchbar must be used within a SearchbarProvider!");

	return context;
}
