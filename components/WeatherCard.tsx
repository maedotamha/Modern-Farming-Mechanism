"use client";

import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import { WeatherData } from '@/lib/types';
import { getWeatherData } from '@/lib/api';

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherData();
      setWeather(data);
    };
    fetchWeather();
  }, []);

  if (!weather) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Weather Conditions</h3>
          <p className="text-3xl font-bold mt-2">{weather.temperature}°C</p>
          <p className="text-sm text-muted-foreground capitalize">{weather.description}</p>
        </div>
        <div className="text-blue-500">
          {weather.description.includes('rain') ? (
            <CloudRain className="h-12 w-12" />
          ) : weather.description.includes('cloud') ? (
            <Cloud className="h-12 w-12" />
          ) : (
            <Sun className="h-12 w-12" />
          )}
        </div>
      </div>
    </Card>
  );
}