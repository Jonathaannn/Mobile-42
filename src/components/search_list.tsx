import { FlatList, View, Text } from "react-native";
import { List } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import useListLocation from "../hooks/list_location_hook";
import useGetWeather from "../hooks/get_weather_hook";
import styles from "../styles/topbar_style";

export default function SearchList(props: {
	show: boolean;
	handleShow: Function;
}) {
	const { data } = useListLocation();
	const { handleGeolocation } = useGetWeather();

	const handleShowList = (index: number) => {
		if (data && data.length > 0) {
			handleGeolocation({ currentLocation: undefined, city: data[index] });
			props.handleShow(false);
		}
	};

	const items = ({ item, index }: { item: any; index: number }) => {
		const { country, admin1, admin2 } = item;
		return (
			<View style={styles.listItem}>
				<MaterialIcons
					name="location-city"
					size={24}
					color="#afafaf"
				/>
				<List.Item
					onPress={() => handleShowList(index)}
					title={
						<Text>
							{admin2
								? `${admin2}, ${admin1}, ${country}`
								: admin1
								? `${admin1}, ${country}`
								: country}
						</Text>
					}
				/>
			</View>
		);
	};

	return (
		data &&
		data.length > 0 &&
		props.show && (
			<View style={styles.searchbarList}>
				<FlatList
					data={data}
					keyExtractor={(item) => item?.id}
					renderItem={items}
				/>
			</View>
		)
	);
}
