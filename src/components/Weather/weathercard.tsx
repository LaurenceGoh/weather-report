import React from "react";
import { WeatherData } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import Image from "next/image";
const WeatherCard = ({ weatherData }: { weatherData: WeatherData | null }) => {
  let weatherDate, currentDate, date, formattedTime;
  if (weatherData) {
    weatherDate = weatherData?.timezone * 1000;
    currentDate = Date.now();
    date = new Date(currentDate + weatherDate);
    formattedTime = date.toISOString().slice(11, 19);
  }

  return weatherData && weatherData.cod != 404 ? (
    <div className="p-24">
      <Card className="w-[500px] bg-gray-700">
        <CardHeader>
          <CardTitle className="flex justify-center text-white">
            {weatherData.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div>
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather"
              height={200}
              width={200}
              className="inline-block"
            />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {weatherData.weather[0].description.charAt(0).toUpperCase() +
                weatherData.weather[0].description.slice(1)}
            </p>
            <p className="text-lg">
              Current Temperature : {weatherData.main.temp}
            </p>
            <p className="text-lg">
              Min Temperature : {weatherData.main.temp_min}
            </p>
            <p className="text-lg">
              Max Temperature : {weatherData.main.temp_max}
            </p>
            <p className="text-lg">
              Current Time in Singapore : {formattedTime}
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
