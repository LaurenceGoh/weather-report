require('dotenv').config()

export const fetchWeatherDataByCountry = async (input: string) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  ).then((res) => res.json());
};
