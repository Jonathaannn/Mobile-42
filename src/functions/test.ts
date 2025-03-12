export default async function TesteFetch() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code,wind_speed_10m&current=temperature_2m,wind_speed_10m,weather_code&forecast_days=1"
    );
	const data = response.json()
	return data
  } catch (error) {
    console.log(error);
    throw new Error("Erro in fetch to api!");
  }
}
