import { View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Appbar, Searchbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import { useSearchbar } from "../contexts/searchbar.context";
import styles from "../styles/topbar.style";

export default function Topbar() {
	const { searchQuery, setSearchQuery } = useSearchbar();

	return (
		<Appbar.Header style={styles.container}>
			<StatusBar
				style="light"
				backgroundColor="#5c5e73"
			/>
			<View style={styles.searchbarContainer}>
				<Searchbar
					placeholder="Search location"
					onChangeText={(e) => setSearchQuery(e)}
					value={searchQuery}
					mode="bar"
					style={styles.searchbar}
					inputStyle={styles.searchbarColor}
					iconColor="#ddd"
					placeholderTextColor="#ddd"
				/>
			</View>
			<View style={styles.iconContainer}>
				<TouchableOpacity onPress={() => setSearchQuery("Geolocation")}>
					<MaterialIcons
						name="map"
						style={styles.icon}
					/>
				</TouchableOpacity>
			</View>
		</Appbar.Header>
	);
}
