"use client";
import React, { useEffect, useState } from "react";
import { WeatherData } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
const WeatherCard = ({ weatherData }: { weatherData: WeatherData | null }) => {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (weatherData && weatherData.cod === 200) {
      const weatherDate = weatherData.timezone * 1000;

      const updateFormattedTime = () => {
        const currentDate = Date.now();
        const date = new Date(currentDate + weatherDate);
        setFormattedTime(date.toISOString().slice(11, 19));
      };

      updateFormattedTime(); 

      intervalId = setInterval(updateFormattedTime, 1000);
    }

    return () => clearInterval(intervalId);
  }, [weatherData]);

  return weatherData && weatherData.cod === 200 ? (
    <div className="p-24">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="flex justify-center">
            {weatherData.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div>
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather"
              height={100}
              width={100}
              className="inline-block"
            />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {weatherData.weather[0].description.charAt(0).toUpperCase() +
                weatherData.weather[0].description.slice(1)}
            </p>
            <p className="text-lg">
              <b>Current Temperature</b> : {weatherData.main.temp} &deg; C
            </p>
            <p className="text-lg">
              <b>Min Temperature</b> : {weatherData.main.temp_min} &deg; C
            </p>
            <p className="text-lg">
              <b>Max Temperature</b> : {weatherData.main.temp_max} &deg; C
            </p>
            <p className="text-lg">
              <b>Current Time in {weatherData.name}</b> : {formattedTime}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  ) : (
    <div className="p-24">No country entered.</div>
  );
};

export default WeatherCard;
