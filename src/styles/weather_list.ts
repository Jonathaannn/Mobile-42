import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	textErro: {
		fontSize: 18,
		fontWeight: 500,
		color: "#d00",
		textAlign: "center"
	},
	containerError: {
		flex: 1,
		justifyContent: "center",
	},
	containerList: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 15,
	},
	itemList: {
		flexDirection: "row",
		justifyContent: "space-around"
	}
})

export default styles