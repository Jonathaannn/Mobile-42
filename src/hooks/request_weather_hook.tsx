import { fetchWeatherApi } from "openmeteo";
import { useState, useEffect } from "react";

// Interface para o tipo de retorno
interface WeatherData {
	current?: {
		time: Date;
		temperature2m: number;
		weatherCode: number;
		windSpeed10m: number;
	};
	hourly?: {
		time: Date[];
		temperature2m: Float32Array;
		windSpeed10m: Float32Array;
	};
}

export default function useRequestWeather(
	longitude: number | undefined,
	latitude: number | undefined
) {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const params = {
					latitude: latitude,
					longitude: longitude,
					current: ["temperature_2m", "weather_code", "wind_speed_10m"],
					hourly: ["temperature_2m", "wind_speed_10m"],
					timezone: "GMT",
					past_minutely_15: 4,
					forecast_days: 1,
					forecast_minutely_15: 4,
				};
				const url = "https://api.open-meteo.com/v1/forecast";
				const responses = await fetchWeatherApi(url, params);
				const range = (start: number, stop: number, step: number) =>
					Array.from(
						{ length: (stop - start) / step },
						(_, i) => start + i * step
					);
				const response = responses[0];
				const utcOffsetSeconds = response.utcOffsetSeconds();
				const data: WeatherData = {};
				const current = response.current();
				const hourly = response.hourly();

				if (current) {
					data.current = {
						time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
						temperature2m: current.variables(0)?.value() ?? 0,
						weatherCode: current.variables(1)?.value() ?? 0,
						windSpeed10m: current.variables(2)?.value() ?? 0,
					};
				}
				if (hourly && hourly.time() && hourly.timeEnd()) {
					const temperatureArray = hourly.variables(0)?.valuesArray();
					const windSpeedArray = hourly.variables(1)?.valuesArray();

					if (temperatureArray && windSpeedArray) {
						data.hourly = {
							time: range(
								Number(hourly.time()),
								Number(hourly.timeEnd()),
								hourly.interval()
							).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
							temperature2m: temperatureArray,
							windSpeed10m: windSpeedArray,
						};
					}
				}

				setWeatherData(data);
			} catch (err) {
				console.error("Error fetching weather data:", err);
				setError(
					err instanceof Error ? err : new Error("An unknown error occurred")
				);
			}
		};

		fetchData();
	}, []);

	return { weatherData, error };
}
