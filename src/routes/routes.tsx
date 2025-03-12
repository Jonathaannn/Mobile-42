import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import Currently from "../screens/currently";
import Today from "../screens/today";
import Weekly from "../screens/weekly";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
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
