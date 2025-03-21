import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

import styles from "../styles/graph_styles";
import FormateDate from "../functions/format_date";

interface ResultData {
	time: Date;
	temperature2m: number;
	windSpeed10m: number;
	weatherCode: number;
}

export default function GraphToday(props: { data: ResultData[] }) {
	const today = new Date().toLocaleDateString();
	const currentDate = props.data.filter(
		(element) => new Date(element.time).toLocaleDateString() === today
	);
	const newDate = {
		labels: currentDate.map((element, index) =>
			index % 4 === 0 ? FormateDate(element.time).time : ""
		),
		datasets: [
			{
				data: currentDate.map((element) => element.temperature2m),
				color: () => "#fc9700",
			},
		],
	};
	return (
		<View>
			<Text style={styles.title}>Today temperatures</Text>
			<LineChart
				data={newDate}
				width={Dimensions.get("window").width}
				height={300}
				chartConfig={{
					backgroundColor: "#0009",
					decimalPlaces: 1, // optional, defaults to 2dp
					color: () => "#fff",
					style: {
						borderRadius: 15,
						padding: 0,
						margin: 0,
					},
					propsForDots: {
						r: "4",
						strokeWidth: "1",
						stroke: "#fff",
					},
				}}
				withInnerLines={false}
				bezier
				style={styles.chart}
			/>
		</View>
	);
}
