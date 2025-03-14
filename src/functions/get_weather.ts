import { fetchWeatherApi } from "openmeteo";

export default async function getClima(longitude: number, latitude: number) {
	const params = {
		latitude: latitude,
		longitude: longitude,
		daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
		hourly: ["temperature_2m", "weather_code", "wind_speed_10m"],
		current: ["temperature_2m", "wind_speed_10m", "weather_code"],
	};
	const url = "https://api.open-meteo.com/v1/forecast";
	const responses = await fetchWeatherApi(url, params);

	const range = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

	const response = responses[0];
	const utcOffsetSeconds = response.utcOffsetSeconds();

	const current = response.current()!;
	const hourly = response.hourly()!;
	const daily = response.daily()!;

	const weatherData = {
		current: {
			time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
			temperature2m: current.variables(0)!.value(),
			windSpeed10m: current.variables(1)!.value(),
			weatherCode: current.variables(2)!.value(),
		},
		hourly: {
			time: range(
				Number(hourly.time()),
				Number(hourly.timeEnd()),
				hourly.interval()
			).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
			temperature2m: hourly.variables(0)!.valuesArray()!,
			weatherCode: hourly.variables(1)!.valuesArray()!,
			windSpeed10m: hourly.variables(2)!.valuesArray()!,
		},

		daily: {
			time: range(
				Number(daily.time()),
				Number(daily.timeEnd()),
				daily.interval()
			).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
			weatherCode: daily.variables(0)!.valuesArray()!,
			temperature2mMax: daily.variables(1)!.valuesArray()!,
			temperature2mMin: daily.variables(2)!.valuesArray()!,
		},
	};

	return { data: weatherData };
}
