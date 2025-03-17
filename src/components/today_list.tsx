import { FlatList, Text, View } from "react-native";

import FormateDate from "../functions/format_date";
import WeatherConditions from "../functions/weather_conditions";
import styles from "../styles/weather_list";

interface ResultData {
	time: Date;
	temperature2m: number;
	windSpeed10m: number;
	weatherCode: number;
}

export default function WeatherList(props: { data: ResultData[] }) {
	const currentDate = new Date().toISOString().split("T")[0];
	const result = props.data
		.filter(
			(element) =>
				new Date(element.time).toISOString().split("T")[0] === currentDate
		)
		.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

	return (
		<View style={styles.containerList}>
			{result.length === 0 ? (
				<View style={styles.containerError}>
					<Text style={styles.textErro}>Não tem nada aqui</Text>
				</View>
			) : (
				<FlatList
					data={result}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<View style={styles.itemList}>
							<Text>{FormateDate(item.time).time}</Text>
							<Text>{item.temperature2m.toFixed(1)} c°</Text>
							<Text>{item.windSpeed10m.toFixed(1)} km/h</Text>
							<Text>{WeatherConditions(item.weatherCode)}</Text>
						</View>
					)}
				/>
			)}
		</View>
	);
}
