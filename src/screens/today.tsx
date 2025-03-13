import { useState, useEffect } from "react";
import { View, Text } from "react-native";

import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import getClima from "../functions/get_weather";
import WeatherList from "../components/today_list";
import styles from "../styles/screens_style";
import useListLocation from "../hooks/list_location_hook";

interface ResultData {
	time: Date;
	temperature2m: number;
	windSpeed10m: number;
	weatherCode: number;
}

interface StateWeather {
	longitude: number;
	latitude: number;
}

export default function Today() {
	const [requestWeather, setRequestWeather] = useState<StateWeather | null>(
		null
	);
	const [weatherData, setWeatherData] = useState<ResultData[] | null>(null);
	const { searchQuery } = useSearchbar();
	const { handleRequestLocation, messageError } = useLocation();
	const { geolocation } = useGetWeather();
	const { data, error } = useListLocation();

	const handle = async () => {
		if (requestWeather) {
			const { data } = await getClima(
				requestWeather.longitude,
				requestWeather.latitude
			);
			if (data && data.hourly) {
				const timeArray = Array.from(data.hourly.time).map(
					(time) => new Date(time)
				);
				const temperatureArray = Array.from(data.hourly.temperature2m);
				const windSpeedArray = Array.from(data.hourly.windSpeed10m);
				const weatherCodeArray = Array.from(data.hourly.weatherCode);

				const result: ResultData[] = temperatureArray.map((element, index) => ({
					temperature2m: parseFloat(element.toFixed(1)),
					windSpeed10m: windSpeedArray[index],
					weatherCode: weatherCodeArray[index],
					time: timeArray[index],
				}));

				setWeatherData(result);
			}
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
					<View style={styles.title}>
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
					{weatherData && <WeatherList data={weatherData} />}
				</>
			) : (
				<Text style={styles.textError}>{messageError}</Text>
			)}
		</View>
	);
}
