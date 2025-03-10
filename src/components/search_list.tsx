import { FlatList, View } from "react-native";
import { List } from "react-native-paper";

import useListLocation from "../hooks/list_location_hook";
import styles from "../styles/topbar_style";

export default function SearchList() {
	const { data } = useListLocation();

	const items = ({ item }: { item: any }) => {
		const { country, admin1, admin2 } = item;
		return (
			<List.Item
				style={styles.listItem}
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
		data.length > 0 && (
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
