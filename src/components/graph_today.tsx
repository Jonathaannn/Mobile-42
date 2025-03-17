import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import styles from "../styles/graph_styles";
import FormateDate from "../functions/format_date";

interface ResultData {
	time: Date;
	temperature2m: number;
	windSpeed10m: number;
	weatherCode: number;
}

export default function GraphToday(props: { data: ResultData[] }) {
	const font = useFont(require("../../assets/fonts/Roboto-Regular.ttf"));
	const today = new Date().toISOString().split("T")[0];
	const currentDate = props.data
		.filter(
			(element) => new Date(element.time).toISOString().split("T")[0] === today
		)
		.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

	const newDate = currentDate.map((element) => ({
		x: FormateDate(element.time).time,
		y: element.temperature2m,
	}));

	return (
		<View style={styles.container}>
			<CartesianChart
				data={newDate}
				xKey="x"
				yKeys={["y"]}
				axisOptions={{
					labelColor: "#fff",
					tickCount: 5,
					labelPosition: "outset",
					labelOffset: { x: 3, y: 3 },
					font: font,
					formatYLabel: (value) => `${value}`,
					formatXLabel: (vlaue) => `${vlaue}`,
				}}
			>
				{({ points }) => (
					<>
						<Line
							points={points.y}
							color={"#fff"}
							strokeWidth={2}
						/>
					</>
				)}
			</CartesianChart>
		</View>
	);
}
