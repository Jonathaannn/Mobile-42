import { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import useListLocation from "../hooks/list_location_hook";
import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import WeatherConditions from "../functions/weather_conditions";
import getClima from "../functions/get_weather";
import styles from "../styles/screens_style";
import WeatherIcons from "../functions/weather_icons";

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
					{weatherData && weatherData.current && (
						<>
							<Text
								style={{
									color: "#fff",
									fontWeight: 500,
									fontSize: 20,
									marginBottom: 10,
									textAlign: "center",
								}}
							>
								Cunrrntly temperature
							</Text>
							<View style={styles.containerWidgetLarge}>
								<Text style={[styles.text, { fontSize: 60, color: "#fc9700" }]}>
									{weatherData.current?.temperature2m.toFixed(1)} c°
								</Text>
								<View>
									<Text style={styles.text}>
										{WeatherConditions(weatherData.current?.weatherCode)}
									</Text>
									<MaterialCommunityIcons
										name={WeatherIcons(weatherData.current.weatherCode)}
										style={{
											color: "#40c2ff",
											fontSize: 64,
											textAlign: "center",
										}}
									/>
								</View>
								<Text style={styles.text}>
									<MaterialCommunityIcons
										name="weather-windy"
										style={{
											fontSize: 24,
											color: "#40c2ff",
										}}
									/>{" "}
									{weatherData.current?.windSpeed10m.toFixed(1)} km/h
								</Text>
							</View>
						</>
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
