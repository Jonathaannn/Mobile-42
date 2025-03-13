import { fetchWeatherApi } from "openmeteo";

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
		weatherCode: Float32Array;
	};
	daily?: {
		time: Date[];
		temperature2mmax: Float32Array;
		temperature2mmin: Float32Array;
		weatherCode: Float32Array;
	};
}

export default async function getClima(longitude: number, latitude: number) {
	try {
		const params = {
			latitude: latitude,
			longitude: longitude,
			current: ["temperature_2m", "weather_code", "wind_speed_10m"],
			hourly: ["temperature_2m", "wind_speed_10m", "weather_code"],
			daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
			past_days: 7,
			forecast_days: 0,
		};
		const url = "https://api.open-meteo.com/v1/forecast";
		const responses = await fetchWeatherApi(url, params);
		const range = (start: number, stop: number, step: number) =>
			Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
		const response = responses[0];
		const utcOffsetSeconds = response.utcOffsetSeconds();
		const data: WeatherData = {};
		const current = response.current();
		const hourly = response.hourly();
		const daily = response.daily();
		if (current) {
			data.current = {
				time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
				temperature2m: current.variables(0)!.value() ?? 0,
				weatherCode: current.variables(1)!.value() ?? 0,
				windSpeed10m: current.variables(2)!.value() ?? 0,
			};
		}
		if (hourly && hourly.time() && hourly.timeEnd()) {
			const temperatureArray = hourly.variables(0)!.valuesArray();
			const windSpeedArray = hourly.variables(1)!.valuesArray();
			const weatherArray = hourly.variables(2)!.valuesArray();

			if (temperatureArray && windSpeedArray && weatherArray) {
				data.hourly = {
					time: range(
						Number(hourly.time()),
						Number(hourly.timeEnd()),
						hourly.interval()
					).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
					temperature2m: temperatureArray,
					windSpeed10m: windSpeedArray,
					weatherCode: weatherArray,
				};
			}
		}
		if (daily && daily.time() && daily.timeEnd()) {
			const temperatureArrayMax = daily.variables(0)!.valuesArray();
			const temperatureArrayMin = daily.variables(1)!.valuesArray();
			const weatherArray = daily.variables(2)!.valuesArray();

			if (temperatureArrayMax && temperatureArrayMin && weatherArray) {
				data.daily = {
					time: range(
						Number(daily.time()),
						Number(daily.timeEnd()),
						daily.interval()
					).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
					temperature2mmax: temperatureArrayMax,
					temperature2mmin: temperatureArrayMin,
					weatherCode: weatherArray,
				};
			}
		}
		return { data: data };
	} catch (error) {
		console.error(error);
		throw new Error("erro nessa bagaça!");
	}
}
