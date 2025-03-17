import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

import styles from "../styles/graph_styles";
import FormateDate from "../functions/format_date";

interface ResultData {
	time: Date;
	temperature2mmax: number;
	temperature2mmin: number;
	weatherCode: number;
}

export default function GraphWeekly(props: { data: ResultData[] }) {
	const newDate = {
		labels: props.data.map((element) => FormateDate(element.time).minDate),
		datasets: [
			{
				data: props.data.map((element) => element.temperature2mmax),
				color: () => "#cc6866",
			},
			{
				data: props.data.map((element) => element.temperature2mmin),
				color: () => "#62b3f5",
			},
		],
		legend: ["Max temperature", "Min temperature"],
	};
	return (
		<View>
			<Text style={styles.title}>Weekly temperatures</Text>
			<LineChart
				data={newDate}
				width={Dimensions.get("window").width}
				height={300}
				chartConfig={{
					backgroundColor: "#0009",
					decimalPlaces: 1,
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
