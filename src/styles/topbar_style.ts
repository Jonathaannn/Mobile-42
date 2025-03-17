import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#111",
		elevation: 10,
		shadowColor: "#fff",
	},
	searchbarContainer: {
		flex: 10,
		flexDirection: "column",
	},
	searchbar: {
		backgroundColor: "#00000000",
	},
	searchbarColor: {
		color: "#fff",
		fontSize: 18,
	},
	searchbarList: {
		shadowColor: "#000",
	},
	listItem: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		paddingHorizontal: 10,
	},
	iconContainer: {
		flex: 2,
	},
	icon: {
		textAlign: "center",
		fontSize: 24,
		color: "#afafaf",
		paddingVertical: 10,
		borderLeftColor: "#afafaf",
		borderLeftWidth: 1,
	},
});

export default styles;
