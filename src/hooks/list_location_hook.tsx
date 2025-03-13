import { useEffect, useState } from "react";
import useSearchbar from "./searchbar_hook";

export default function useListLocation() {
	const { searchQuery } = useSearchbar();
	const [data, setData] = useState([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const requestLocals = async () => {
			try {
				if (!searchQuery) {
					setData([]);
					return;
				}
				const response = await fetch(
					`https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=5&language=en&format=json`
				);
				const data = await response.json();
				if (data.results) {
					setData(data.results);
				} else {
					setData([]);
					setError(
						"Could not find result for the supplied address or coordinates"
					);
				}
			} catch (error) {
				console.log("Erro na requisição:", error);
				setError(
					"The service connection is lost, please check your internet connection or try again later"
				);
			}
		};
		requestLocals();
	}, [searchQuery]);

	return { data, error };
}
