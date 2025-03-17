import { useState, useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
				const temperatureMaxArray = Array.from(data.daily.temperature2mMax);
				const temperatureMinArray = Array.from(data.daily.temperature2mMin);
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
		<ImageBackground
			source={require("../../assets/1084945.jpg")}
			style={styles.container}
		>
			{!data && error ? (
				<View style={styles.containerError}>
					<MaterialIcons
						name="error-outline"
						style={styles.iconError}
					/>
					<Text style={styles.textError}>{error}</Text>
				</View>
			) : geolocation ? (
				<>
					<View style={styles.containerWidget}>
						{geolocation.city.city || geolocation.city.admin2 ? (
							<Text style={styles.title}>
								{geolocation.city.city || geolocation.city.admin2}
							</Text>
						) : (
							""
						)}
						<View style={styles.local}>
							{geolocation.city.region || geolocation.city.admin1 ? (
								<Text style={styles.subTitle}>
									{geolocation.city.region || geolocation.city.admin1},
								</Text>
							) : (
								""
							)}
							{geolocation.city ? (
								<Text style={styles.subTitle}>{geolocation.city.country}</Text>
							) : (
								""
							)}
						</View>
					</View>
					{weatherData && <WeeklyList data={weatherData} />}
				</>
			) : (
				<View style={styles.containerError}>
					<MaterialIcons
						name="error-outline"
						style={styles.iconError}
					/>
					<Text style={styles.textError}>{messageError}</Text>
				</View>
			)}
		</ImageBackground>
	);
}
