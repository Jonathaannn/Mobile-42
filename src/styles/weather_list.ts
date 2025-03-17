import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	textErro: {
		fontSize: 18,
		fontWeight: 500,
		color: "#d00",
		textAlign: "center",
	},
	containerError: {
		flex: 1,
		justifyContent: "center",
	},
	containerList: {
		margin: 10,
		padding: 10,
		borderRadius: 15,
		backgroundColor: "#000b",
	},
	itemList: {
		justifyContent: "space-around",
		alignItems: "center",
		gap: 10,
		marginHorizontal: 20,
	},
	midText: {
		fontSize: 18,
		fontWeight: 500,
		color: "#fff",
	},
});

export default styles;
