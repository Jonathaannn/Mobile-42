import { FlatList, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FormateDate from "../functions/format_date";
import WeatherIcons from "../functions/weather_icons";
import styles from "../styles/weather_list";

interface ResultData {
	time: Date;
	temperature2mmax: number;
	temperature2mmin: number;
	weatherCode: number;
}

export default function WeeklyList(props: { data: ResultData[] }) {
	return (
		<View style={styles.containerList}>
			{!props.data ? (
				<View style={styles.containerError}>
					<Text style={styles.textErro}>Não tem nada aqui</Text>
				</View>
			) : (
				<FlatList
					data={props.data}
					keyExtractor={(index) => index.toString()}
					horizontal
					renderItem={({ item }) => (
						<View style={styles.itemList}>
							<Text style={styles.midText}>
								{FormateDate(item.time).minDate}
							</Text>
							<Text>
								<MaterialCommunityIcons
									name={WeatherIcons(item.weatherCode)}
									size={32}
									color="#fff"
								/>
							</Text>
							<Text style={[styles.midText, { color: "#62b3f5" }]}>
								{item.temperature2mmin.toFixed(1)}°C min
							</Text>
							<Text style={[styles.midText, { color: "#cc6866" }]}>
								{item.temperature2mmax.toFixed(1)}°C max
							</Text>
						</View>
					)}
				/>
			)}
		</View>
	);
}
