import { FlatList, Text, View } from "react-native";

import WeatherConditions from "../functions/weather_conditions";
import FormateDate from "../functions/format_date";
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
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<View style={styles.itemList}>
							<Text>{FormateDate(item.time).date}</Text>
							<Text>{item.temperature2mmin.toFixed(1)} c°</Text>
							<Text>{item.temperature2mmax.toFixed(1)} c°</Text>
							<Text>{WeatherConditions(item.weatherCode)}</Text>
						</View>
					)}
				/>
			)}
		</View>
	);
}
