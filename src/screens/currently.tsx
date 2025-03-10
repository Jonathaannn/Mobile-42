import { useEffect } from "react";
import { View, Text } from "react-native";

import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import styles from "../styles/screens_style";

export default function Currently() {
	const { searchQuery } = useSearchbar();
	const { messageError } = useLocation();
	const { geolocation } = useGetWeather();

	useEffect(() => {
		if (geolocation) {
			console.log(geolocation);
		}
	}, [geolocation]);

	return (
		<View style={styles.container}>
			{messageError ? (
				<Text style={styles.textError}>{messageError}</Text>
			) : (
				<View>
					<Text style={styles.text}>{searchQuery}</Text>
				</View>
			)}
		</View>
	);
}
