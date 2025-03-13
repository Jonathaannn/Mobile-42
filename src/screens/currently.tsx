import { useEffect, useState } from "react";
import { View, Text } from "react-native";

import useListLocation from "../hooks/list_location_hook";
import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import WeatherConditions from "../functions/weather_conditions";
import getClima from "../functions/get_weather";
import styles from "../styles/screens_style";

interface ResultData {
	current?: {
		time: Date;
		temperature2m: number;
		weatherCode: number;
		windSpeed10m: number;
	};
}

interface StateWeather {
	longitude: number;
	latitude: number;
}

export default function Currently() {
	const [requestWeather, setRequestWeather] = useState<StateWeather | null>(
		null
	);
	const [weatherData, setWeatherData] = useState<ResultData | null>(null);
	const { data, error } = useListLocation();
	const { searchQuery } = useSearchbar();
	const { handleRequestLocation, messageError } = useLocation();
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
			{data.length === 0 && error ? (
				<Text style={styles.textError}>{error}</Text>
			) : geolocation ? (
				<>
					{geolocation && (
						<View>
							{geolocation.city ? (
								<Text style={styles.text}>
									{geolocation.city.city || geolocation.city.admin2}
								</Text>
							) : (
								""
							)}
							{geolocation.city ? (
								<Text style={styles.text}>
									{geolocation.city.region || geolocation.city.admin1}
								</Text>
							) : (
								""
							)}
							{geolocation.city ? (
								<Text style={styles.text}>{geolocation.city.country}</Text>
							) : (
								""
							)}
						</View>
					)}
					{weatherData && weatherData.current && (
						<View>
							<Text style={styles.text}>
								{weatherData.current?.temperature2m.toFixed(1)} c°
							</Text>
							<Text style={styles.text}>
								{weatherData.current?.windSpeed10m.toFixed(1)} km/h
							</Text>
							<Text style={styles.text}>
								{WeatherConditions(weatherData.current?.weatherCode)}
							</Text>
						</View>
					)}
				</>
			) : (
				<Text style={styles.textError}>{messageError}</Text>
			)}
		</View>
	);
}

// {messageError ? (
// 	<Text style={styles.textError}>{messageError}</Text>
// ) : (

// )}
