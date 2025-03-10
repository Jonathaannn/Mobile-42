import { View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Appbar, Searchbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import styles from "../styles/topbar_style";

export default function Topbar() {
	const { searchQuery, setSearchQuery } = useSearchbar();
	const { currentLocation, city } = useLocation();
	const { handleGeolocation } = useGetWeather();

	const handleGeo = () => {
		if (currentLocation && city) {
			handleGeolocation({ currentLocation, city });
		}
	};

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
					onClearIconPress={() => setSearchQuery("")}
					onIconPress={handleGeo}
					onSubmitEditing={handleGeo}
					value={searchQuery}
					mode="bar"
					style={styles.searchbar}
					inputStyle={styles.searchbarColor}
					iconColor="#ddd"
					placeholderTextColor="#ddd"
				/>
			</View>
			<View style={styles.iconContainer}>
				<TouchableOpacity onPress={handleGeo}>
					<MaterialIcons
						name="map"
						style={styles.icon}
					/>
				</TouchableOpacity>
			</View>
		</Appbar.Header>
	);
}
