import { View, Text } from "react-native";

import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import styles from "../styles/screens_style";

export default function Weekly() {
	const { searchQuery } = useSearchbar();
	const { messageError } = useLocation();

	return (
		<View style={styles.container}>
			{messageError ? (
				<Text style={styles.textError}>{messageError}</Text>
			) : (
				<View>
					<Text style={styles.text}>Weekly</Text>
					<Text style={styles.text}>{searchQuery}</Text>
				</View>
			)}
		</View>
	);
}
