import { FlatList, View } from "react-native";
import { List } from "react-native-paper";

import useListLocation from "../hooks/list_location_hook";
import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import styles from "../styles/topbar_style";

export default function SearchList(props: {
	show: boolean;
	handleShow: Function;
}) {
	const { data } = useListLocation();
	const { setSearchQuery } = useSearchbar();
	const { handleGeolocation } = useGetWeather();

	const handleShowList = (index: number) => {
		if (data && data.length > 0) {
			handleGeolocation({ currentLocation: undefined, city: data[index] });
			setSearchQuery("");
			props.handleShow(false);
		}
	};

	const items = ({ item, index }: { item: any; index: number }) => {
		const { country, admin1, admin2 } = item;
		return (
			<List.Item
				style={styles.listItem}
				onPress={() => handleShowList(index)}
				title={
					admin2
						? `${admin2}, ${admin1}, ${country}`
						: admin1
						? `${admin1}, ${country}`
						: country
				}
			/>
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
