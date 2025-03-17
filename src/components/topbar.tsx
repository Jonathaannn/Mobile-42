import { View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Appbar, Searchbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import useGetWeather from "../hooks/get_weather_hook";
import useSearchbar from "../hooks/searchbar_hook";
import useLocation from "../hooks/geolocation_hook";
import styles from "../styles/topbar_style";
import useListLocation from "../hooks/list_location_hook";
import { useEffect } from "react";

export default function Topbar(props: { setList: Function }) {
	const { searchQuery, setSearchQuery } = useSearchbar();
	const { currentLocation, city, handleRequestLocation } = useLocation();
	const { data } = useListLocation();
	const { handleGeolocation } = useGetWeather();

	useEffect(() => {
		if (!currentLocation) handleRequestLocation();
	}, [currentLocation]);

	const handleSearch = () => {
		if (data && data.length > 0) {
			handleGeolocation({ currentLocation: undefined, city: data[0] });
		}
	};

	const handleGeo = () => {
		setSearchQuery("");
		props.setList(false);
		if (currentLocation) {
			handleGeolocation({ currentLocation, city });
		}
	};

	return (
		<Appbar.Header style={styles.container}>
			<StatusBar
				style="light"
				backgroundColor="#111"
			/>
			<View style={styles.searchbarContainer}>
				<Searchbar
					placeholder="Search location"
					onChangeText={(e) => {
						setSearchQuery(e);
						props.setList(true);
					}}
					onClearIconPress={() => {
						setSearchQuery("");
						props.setList(false);
					}}
					onIconPress={() => {
						handleSearch();
						props.setList(false);
					}}
					onSubmitEditing={() => {
						handleSearch();
						props.setList(false);
					}}
					value={searchQuery}
					mode="bar"
					style={styles.searchbar}
					inputStyle={styles.searchbarColor}
					cursorColor="#afafaf"
					iconColor="#afafaf"
					placeholderTextColor="#afafaf"
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
