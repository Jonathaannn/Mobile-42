import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		resizeMode: "cover",
	},
	containerWidget: {
		paddingVertical: 20,
		paddingHorizontal: 10,
		margin: 10,
		borderRadius: 15,
		backgroundColor: "#111b",
	},
	containerWidgetLarge: {
		paddingVertical: 20,
		paddingHorizontal: 10,
		margin: 10,
		borderRadius: 15,
		backgroundColor: "#111b",
		gap: 48,
	},
	local: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 5,
	},
	title: {
		fontSize: 32,
		fontWeight: 600,
		color: "#40c2ff",
		textAlign: "center",
	},
	subTitle: {
		fontSize: 24,
		fontWeight: 500,
		color: "#fff",
	},
	text: {
		fontSize: 22,
		fontWeight: 600,
		color: "#fff",
		textAlign: "center",
	},
	containerError: {
		alignItems: "center",
		padding: 10,
		margin: 10,
		borderRadius: 15,
		backgroundColor: "#111b",
	},
	textError: {
		fontSize: 22,
		fontWeight: 500,
		color: "#b00",
		textAlign: "center",
	},
	iconError: {
		fontSize: 48,
		color: "#b00",
		paddingBottom: 10,
	},
	containerCurrent: {
		justifyContent: "flex-start",
		marginTop: 60,
		gap: 48,
	},
});

export default styles;
