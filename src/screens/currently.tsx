import { useEffect, useState } from "react";
import { View, Text } from "react-native";

import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import WeatherConditions from "../functions/weather_conditions";
import styles from "../styles/screens_style";
import getClima from "../functions/get_weather";

interface WeatherData {
	current?: {
		time: Date;
		temperature2m: number;
		weatherCode: number;
		windSpeed10m: number;
	};
	hourly?: {
		time: Date[];
		temperature2m: Float32Array;
		windSpeed10m: Float32Array;
		weatherCode: Float32Array;
	};
	daily?: {
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

export default function Currently() {
	const [requestWeather, setRequestWeather] = useState<StateWeather | null>(
		null
	);
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const { searchQuery } = useSearchbar();
	const { messageError } = useLocation();
	const { geolocation } = useGetWeather();

	const handle = async () => {
		if (requestWeather) {
			const data = await getClima(
				requestWeather.longitude,
				requestWeather.latitude
			);
			console.log(data);
			setWeatherData(data.data);
		}
	};

	useEffect(() => {
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
		if (requestWeather) handle();
	}, [requestWeather]);

	return (
		<View style={styles.container}>
			{messageError ? (
				<Text style={styles.textError}>{messageError}</Text>
			) : (
				<View>
					{geolocation && (
						<View>
							{geolocation.city ? (
								<Text style={styles.text}>
									{geolocation.city.city || geolocation.city.admin1}
								</Text>
							) : (
								""
							)}
							{geolocation.city ? (
								<Text style={styles.text}>
									{geolocation.city.region || geolocation.city.admin2}
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
				</View>
			)}
		</View>
	);
}
