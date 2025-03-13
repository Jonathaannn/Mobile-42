export default function WeatherConditions(code: number) {
	const weatherConditions = [
		{ code: 0, value: "Clear sky" },
		{ code: 1, value: "Mainly clear" },
		{ code: 2, value: "Partly cloudy" },
		{ code: 3, value: "Overcast" },
		{ code: 45, value: "Fog" },
		{ code: 48, value: "Depositing rime fog" },
		{ code: 51, value: "Drizzle: Light intensity" },
		{ code: 53, value: "Drizzle: Moderate intensity" },
		{ code: 55, value: "Drizzle: Dense intensity" },
		{ code: 56, value: "Freezing Drizzle: Light intensity" },
		{ code: 57, value: "Freezing Drizzle: Dense intensity" },
		{ code: 61, value: "Rain: Slight intensity" },
		{ code: 63, value: "Rain: Moderate intensity" },
		{ code: 65, value: "Rain: Heavy intensity" },
		{ code: 66, value: "Freezing Rain: Light intensity" },
		{ code: 67, value: "Freezing Rain: Heavy intensity" },
		{ code: 71, value: "Snow fall: Slight intensity" },
		{ code: 73, value: "Snow fall: Moderate intensity" },
		{ code: 75, value: "Snow fall: Heavy intensity" },
		{ code: 77, value: "Snow grains" },
		{ code: 80, value: "Rain showers: Slight intensity" },
		{ code: 81, value: "Rain showers: Moderate intensity" },
		{ code: 82, value: "Rain showers: Violent intensity" },
		{ code: 85, value: "Snow showers: Slight intensity" },
		{ code: 86, value: "Snow showers: Heavy intensity" },
		{ code: 95, value: "Thunderstorm: Slight or moderate" },
		{ code: 96, value: "Thunderstorm: with slight" },
		{ code: 99, value: "Thunderstorm: heavy hail" },
	];
	const result = weatherConditions.find((e) => e.code === code);
	return result?.value;
}
