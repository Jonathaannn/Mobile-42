import { useEffect, useState } from "react";
import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync,
	LocationObject,
	reverseGeocodeAsync,
} from "expo-location";

interface CityInterface {
	city: string | undefined;
	region: string | undefined;
	country: string | undefined;
}

export default function useLocation() {
	const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(
		null
	);
	const [city, setCity] = useState<CityInterface | null>(null);
	const [messageError, setMessageError] = useState<string>("");

	async function handleRequestLocation() {
		try {
			const { granted } = await requestForegroundPermissionsAsync();
			
			if (granted) {
				const location = await getCurrentPositionAsync();
				setCurrentLocation(location);
				const cityCode = await reverseGeocodeAsync({latitude: location.coords.latitude, longitude: location.coords.longitude});
				if (cityCode) {
					const { city, country, region } = cityCode[0];
					setCity({
						city: city || undefined,
						region: region || undefined,
						country: country || undefined,
					});
				}
			} else {
				setMessageError(
					"Geolocation is not available, please enable it in your App settings"
				);
			}
		} catch (error) {
			setMessageError("Error getting geolocation");
		}
	}

	// useEffect(() => {
	// 	handleRequestLocation();
	// }, []);

	return { currentLocation, city, messageError, handleRequestLocation };
}
