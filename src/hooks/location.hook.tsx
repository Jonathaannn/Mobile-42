import { useEffect, useState } from "react";
import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync,
	LocationObject,
} from "expo-location";

export default function useLocation() {
	const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(
		null
	);
	const [messageError, setMessageError] = useState<string>("");

	async function handleRequestLocation() {
		try {
			const { granted } = await requestForegroundPermissionsAsync();

			if (granted) {
				const location = await getCurrentPositionAsync();
				setCurrentLocation(location);
			} else {
				setMessageError(
					"Geolocation is not avaliable, please enable it in your App settings"
				);
			}
		} catch (error) {
			setMessageError("Error getting geolocation");
		}
	}

	useEffect(() => {
		handleRequestLocation();
	}, []);

	return { currentLocation, messageError };
}
