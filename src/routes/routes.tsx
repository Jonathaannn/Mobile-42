import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

import Currently from "../screens/currently";
import Today from "../screens/today";
import Weekly from "../screens/weekly";
import styles from "../styles/bottombar_styles";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: styles.tabBarStyle,
				tabBarActiveTintColor: "#333",
				tabBarInactiveTintColor: "#afafaf",
				tabBarItemStyle: styles.tabBarItemStyle,
				tabBarActiveBackgroundColor: "#fff",
				tabBarBackground: () => (
					<BlurView
						tint="dark"
						intensity={90}
						style={StyleSheet.absoluteFill}
					/>
				),
			}}
		>
			<Tab.Screen
				name="currently"
				component={Currently}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons
							name="brightness-5"
							color={color}
							size={size}
						/>
					),
					tabBarLabel: "Currently",
				}}
			/>
			<Tab.Screen
				name="today"
				component={Today}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons
							name="today"
							color={color}
							size={size}
						/>
					),
					tabBarLabel: "Today",
				}}
			/>
			<Tab.Screen
				name="weekly"
				component={Weekly}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons
							name="calendar-view-week"
							color={color}
							size={size}
						/>
					),
					tabBarLabel: "Weekly",
				}}
			/>
		</Tab.Navigator>
	);
}
