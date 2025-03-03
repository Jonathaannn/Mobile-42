import { View, Text } from "react-native";

import { useSearchbar } from "../contexts/searchbar.context";
import styles from "../styles/screens.style";

export default function Weekly() {
	const { searchQuery } = useSearchbar();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Weekly</Text>
			<Text style={styles.text}>{searchQuery}</Text>
		</View>
	);
}
