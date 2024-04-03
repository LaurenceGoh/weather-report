"use client";
import React, { useState } from "react";
import Search from "@/components/Search/search";
import WeatherCard from "@/components/Weather/weathercard";
import { WeatherData } from "@/types/types";
export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Search setWeatherData={setWeatherData} />
      <WeatherCard weatherData={weatherData} />
    </main>
  );
}
