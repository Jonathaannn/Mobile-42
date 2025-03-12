import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { SearchbarProvider } from "./src/contexts/searchbar_context";
import { GeolocationProvider } from "./src/contexts/weather_context";
import SearchList from "./src/components/search_list";
import Routes from "./src/routes";
import Topbar from "./src/components/topbar";
import { useState } from "react";

export default function App() {
	const [showList, setShowList] = useState(false)

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<SearchbarProvider>
					<GeolocationProvider>
						<Topbar setList={setShowList} />
						<SearchList show={showList} />
						<Routes />
					</GeolocationProvider>
				</SearchbarProvider>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
