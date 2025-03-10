import { useGeolocation } from "../contexts/weather_context";

export default function useGetWeather() {
	const { geolocation, setGeolocation } = useGeolocation();

	const handleGeolocation = (newData: { currentLocation: any; city: any }) => {
		setGeolocation(newData);
	};

	return { geolocation, handleGeolocation };
}
