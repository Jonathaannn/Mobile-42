import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#5c5e73",
	},
	searchbarContainer: {
		flex: 10,
		flexDirection: "column",
	},
	searchbar: {
		backgroundColor: "#00000000",
	},
	searchbarColor: {
		color: "#ddd",
	},
	searchbarList: {
		elevation: 5,
		shadowOpacity: 0.9,
		shadowOffset: { width: 0, height: 2 },
	},
	listItem: {
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	iconContainer: {
		flex: 2,
	},
	icon: {
		textAlign: "center",
		fontSize: 24,
		color: "#fff",
		paddingVertical: 10,
		borderLeftColor: "#fff",
		borderLeftWidth: 1,
	},
});

export default styles;
