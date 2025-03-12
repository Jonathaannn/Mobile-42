import { useState, useEffect } from "react";
import { View, Text } from "react-native";

import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import getClima from "../functions/get_weather";
import styles from "../styles/screens_style";

interface WeatherData {
	hourly?: {
		time: Date[];
		temperature2m: Float32Array;
		windSpeed10m: Float32Array;
		weatherCode: Float32Array;
	};
}

interface StateWeather {
	longitude: number;
	latitude: number;
}

export default function Today() {
	const [requestWeather, setRequestWeather] = useState<StateWeather | null>(
		null
	);
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const { searchQuery } = useSearchbar();
	const { handleRequestLocation } = useLocation();
	const { geolocation } = useGetWeather();

	const handle = async () => {
		if (requestWeather) {
			const data = await getClima(
				requestWeather.longitude,
				requestWeather.latitude
			);
			setWeatherData(data.data);
		}
	};

	useEffect(() => {
		handleRequestLocation();
		if (geolocation && geolocation.currentLocation) {
			const { coords } = geolocation.currentLocation;
			setRequestWeather({
				longitude: coords.longitude,
				latitude: coords.latitude,
			});
		} else if (geolocation && geolocation.city) {
			const coords = geolocation.city;
			setRequestWeather({
				longitude: coords.longitude,
				latitude: coords.latitude,
			});
		}
	}, [geolocation, searchQuery]);

	useEffect(() => {
		handle();
	}, [requestWeather]);

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.text}>Today</Text>
				<Text style={styles.text}>{searchQuery}</Text>
			</View>
		</View>
	);
}
