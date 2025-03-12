import { useState, useEffect } from "react";
import { View, Text } from "react-native";

import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import WeatherConditions from "../functions/weather_conditions";
import FormateDate from "../functions/format_date";
import getClima from "../functions/get_weather";
import styles from "../styles/screens_style";

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
	const { handleRequestLocation } = useLocation();
	const { geolocation } = useGetWeather();

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
			<View>
				<Text style={styles.text}>Today</Text>
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
				{weatherData && (
					<View>
						{weatherData.map((element, index) => (
							<View key={index}>
								<Text>{FormateDate(element.time).time}</Text>
								<Text>{element.temperature2m.toFixed(1)}</Text>
								<Text>{element.windSpeed10m.toFixed(1)}</Text>
								<Text>{WeatherConditions(element.weatherCode)}</Text>
							</View>
						))}
					</View>
				)}
			</View>
		</View>
	);
}
