import { useState, useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import useListLocation from "../hooks/list_location_hook";
import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import getClima from "../functions/get_weather";
import WeatherList from "../components/today_list";
import styles from "../styles/screens_style";
import GraphToday from "../components/graph_today";

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
					{weatherData && (
						<View style={{ flex: 1 }}>
							<GraphToday data={weatherData} />
							<WeatherList data={weatherData} />
						</View>
					)}
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
