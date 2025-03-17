type WeatherIconName =
	| "weather-sunny"
	| "weather-partly-cloudy"
	| "weather-cloudy"
	| "weather-fog"
	| "weather-rainy"
	| "weather-snowy-rainy"
	| "weather-snowy"
	| "weather-snowy-heavy"
	| "weather-hail"
	| "weather-pouring"
	| "weather-lightning-rainy";

export default function WeatherIcons(code: number): WeatherIconName {
	switch (code) {
		case 0:
		case 1:
			return "weather-sunny";
		case 2:
			return "weather-partly-cloudy";
		case 3:
			return "weather-cloudy";
		case 45:
		case 48:
			return "weather-fog";
		case 51:
		case 53:
		case 55:
		case 61:
		case 63:
		case 65:
			return "weather-rainy";
		case 56:
		case 57:
		case 66:
		case 67:
			return "weather-snowy-rainy";
		case 71:
		case 73:
			return "weather-snowy";
		case 75:
			return "weather-snowy-heavy";
		case 77:
			return "weather-hail";
		case 80:
		case 81:
		case 82:
			return "weather-pouring";
		case 85:
		case 86:
			return "weather-snowy-heavy";
		case 95:
		case 96:
		case 99:
			return "weather-lightning-rainy";
		default:
			return "weather-sunny";
	}
}
