import { View, Text } from "react-native";

import useSearchbar from "../hooks/searchbar.hook";
import useLocation from "../hooks/location.hook";
import styles from "../styles/screens.style";

export default function Weekly() {
	const { searchQuery } = useSearchbar();
	const { messageError } = useLocation();

	return (
		<View style={styles.container}>
			{messageError ? (
				<Text style={styles.textError}>{messageError}</Text>
			) : (
				<View>
					<Text style={styles.text}>Currently</Text>
					<Text style={styles.text}>{searchQuery}</Text>
				</View>
			)}
		</View>
	);
}
