import { FlatList, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FormateDate from "../functions/format_date";
import styles from "../styles/weather_list";
import WeatherIcons from "../functions/weather_icons";

interface ResultData {
	time: Date;
	temperature2m: number;
	windSpeed10m: number;
	weatherCode: number;
}

export default function WeatherList(props: { data: ResultData[] }) {
	const today = new Date().toLocaleDateString();
	const currentDate = props.data.filter(
		(element) => new Date(element.time).toLocaleDateString() === today
	);

	return (
		<View style={styles.containerList}>
			{currentDate.length === 0 ? (
				<View style={styles.containerError}>
					<Text style={styles.textErro}>No search items here</Text>
				</View>
			) : (
				<FlatList
					data={currentDate}
					keyExtractor={(index) => index.toString()}
					horizontal
					renderItem={({ item }) => (
						<View style={styles.itemList}>
							<Text style={styles.midText}>{FormateDate(item.time).time}</Text>
							<Text>
								<MaterialCommunityIcons
									name={WeatherIcons(item.weatherCode)}
									size={32}
									color="#40c2ff"
								/>
							</Text>
							<Text style={[styles.midText, { color: "#fc9700" }]}>
								{item.temperature2m.toFixed(1)}°C
							</Text>
							<Text style={styles.midText}>
								<MaterialCommunityIcons
									name="weather-windy"
									size={16}
									color="#fff"
								/>{" "}
								{item.windSpeed10m.toFixed(1)}km/h
							</Text>
						</View>
					)}
				/>
			)}
		</View>
	);
}
