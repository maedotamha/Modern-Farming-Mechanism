"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import StatusCard from "@/components/StatusCard";
import { Thermometer, Droplets } from "lucide-react";
import { SystemStatus } from "@/lib/types";

const OPENWEATHER_API_KEY = "fce8022714501e39c8fade7511183d13"; 
const CITY_NAME = "Addis Ababa"; 
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${OPENWEATHER_API_KEY}&units=metric`;

const defaultSystemStatus: SystemStatus = {
  farmA: {
    temperature: 20,
    humidity: 50,
    waterLevel: 60,
    pumpStatus: "off",
  },
  farmB: {
    temperature: 22,
    humidity: 55,
    waterLevel: 65,
    pumpStatus: "off",
  },
  temperature: 22,
  humidity: 55,
  waterLevel: 65,
  pumpStatus: "off",
};

export default function Dashboard() {
  const [status, setStatus] = useState<SystemStatus>(defaultSystemStatus);
  const [weather, setWeather] = useState<any>(null); 

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const response = await fetch(WEATHER_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    loadWeatherData();

    const interval = setInterval(() => {
      setStatus((prevStatus) => ({
        ...prevStatus,
        farmA: {
          temperature: weather?.main.temp
            ? weather.main.temp + (Math.random() * 4 - 2)
            : prevStatus.farmA.temperature, 
          humidity: Math.max(10, Math.random() * 100), 
          waterLevel: Math.max(10, Math.random() * 100), 
          pumpStatus: Math.random() > 0.5 ? "on" : "off", 
        },
        farmB: {
          temperature: weather?.main.temp
            ? weather.main.temp + (Math.random() * 4 - 2)
            : prevStatus.farmB.temperature, // Add/subtract random values from weather temp
          humidity: Math.max(10, Math.random() * 100), // Ensure humidity is never 0
          waterLevel: Math.max(10, Math.random() * 100), // Ensure water level is never 0
          pumpStatus: Math.random() > 0.5 ? "on" : "off", // Random pump status
        },
        temperature: weather?.main.temp
          ? weather.main.temp + (Math.random() * 4 - 2)
          : prevStatus.temperature, // Add/subtract random values from weather temp
        humidity: Math.max(10, Math.random() * 100), // Ensure humidity is never 0
        waterLevel: Math.max(10, Math.random() * 100), // Ensure water level is never 0
        pumpStatus: Math.random() > 0.5 ? "on" : "off", // Random pump status
      }));
    }, 50000); // Update every 50 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [weather]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          System Active
        </div>
      </div>

      {/* Weather Condition Box */}
      {weather && (
        <div className="my-4">
          <Card className="p-6" style={{ backgroundColor: "#0D2015" }}>
            <h2 className="text-xl font-semibold mb-4 text-white">
              Weather Condition
            </h2>
            <p className="text-lg text-white">
              Temperature: {weather.main.temp}°C
            </p>
            <p className="text-lg text-white">
              Humidity: {weather.main.humidity}%
            </p>
            <p className="text-lg text-white">
              Weather: {weather.weather[0].description}
            </p>
          </Card>
        </div>
      )}

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusCard
          title="Farm A Temperature"
          value={`${status.farmA?.temperature.toFixed(1)}°C`}
          icon={Thermometer}
          color="bg-blue-500 text-white dark:bg-blue-700 dark:text-white"
        />
        <StatusCard
          title="Farm A Humidity"
          value={`${status.farmA?.humidity.toFixed(1)}%`}
          icon={Droplets}
          color="bg-green-500 text-white dark:bg-green-700 dark:text-white"
        />
        <StatusCard
          title="Farm A Moisture Level"
          value={`${status.farmA?.waterLevel.toFixed(1)}%`}
          icon={Droplets}
          color="bg-teal-500 text-white dark:bg-teal-700 dark:text-white"
        />
        <StatusCard
          title="Farm B Temperature"
          value={`${status.farmB?.temperature.toFixed(1)}°C`}
          icon={Thermometer}
          color="bg-blue-500 text-white dark:bg-blue-700 dark:text-white"
        />
        <StatusCard
          title="Farm B Humidity"
          value={`${status.farmB?.humidity.toFixed(1)}%`}
          icon={Droplets}
          color="bg-green-500 text-white dark:bg-green-700 dark:text-white"
        />
        <StatusCard
          title="Farm B Moisture Level"
          value={`${status.farmB?.waterLevel.toFixed(1)}%`}
          icon={Droplets}
          color="bg-teal-500 text-white dark:bg-teal-700 dark:text-white"
        />
      </div>

      {/* Farm A and Farm B System Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Farm A System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Pump Status</span>
              <span
                className={
                  status.farmA?.pumpStatus === "off"
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {status.farmA?.pumpStatus?.toUpperCase() ?? "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Water Level</span>
              <span>{status.farmA?.waterLevel.toFixed(1)}%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Farm B System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Pump Status</span>
              <span
                className={
                  status.farmB?.pumpStatus === "off"
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {status.farmB?.pumpStatus?.toUpperCase() ?? "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Water Level</span>
              <span>{status.farmB?.waterLevel.toFixed(1)}%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
