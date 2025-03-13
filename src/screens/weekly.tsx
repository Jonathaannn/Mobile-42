import { useState, useEffect } from "react";
import { View, Text } from "react-native";

import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import getClima from "../functions/get_weather";
import styles from "../styles/screens_style";
import WeeklyList from "../components/weekly_list";
import useListLocation from "../hooks/list_location_hook";

interface ResultData {
	time: Date;
	temperature2mmax: number;
	temperature2mmin: number;
	weatherCode: number;
}

interface StateWeather {
	longitude: number;
	latitude: number;
}

export default function Weekly() {
	const [requestWeather, setRequestWeather] = useState<StateWeather | null>(
		null
	);
	const [weatherData, setWeatherData] = useState<ResultData[] | null>(null);
	const { searchQuery } = useSearchbar();
	const { handleRequestLocation, messageError } = useLocation();
	const { data, error } = useListLocation();
	const { geolocation } = useGetWeather();

	const handle = async () => {
		if (requestWeather) {
			const { data } = await getClima(
				requestWeather.longitude,
				requestWeather.latitude
			);
			if (data && data.daily) {
				const timeArray = Array.from(data.daily.time).map(
					(time) => new Date(time)
				);
				const temperatureMaxArray = Array.from(data.daily.temperature2mmax);
				const temperatureMinArray = Array.from(data.daily.temperature2mmin);
				const weatherCodeArray = Array.from(data.daily.weatherCode);

				const result: ResultData[] = temperatureMaxArray.map(
					(element, index) => ({
						temperature2mmax: parseFloat(element.toFixed(1)),
						temperature2mmin: temperatureMinArray[index],
						weatherCode: weatherCodeArray[index],
						time: timeArray[index],
					})
				);
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
					{weatherData && <WeeklyList data={weatherData} />}
				</>
			) : (
				<Text style={styles.textError}>{messageError}</Text>
			)}
		</View>
	);
}
