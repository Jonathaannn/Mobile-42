import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { SearchbarPovider } from "./src/contexts/searchbar.context";
import Routes from "./src/routes";
import Topbar from "./src/components/topbar";

export default function App() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<SearchbarPovider>
					<Topbar />
					<Routes />
				</SearchbarPovider>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
