"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import StatusCard from '@/components/StatusCard';
import WeatherCard from '@/components/WeatherCard';
import { Thermometer, Droplets, Sun, Waves, Umbrella, Cpu } from 'lucide-react';
import { SystemStatus } from '@/lib/types';

const mockSystemStatus: SystemStatus = {
  temperature: 25,
  humidity: 60,
  sunlight: 75,
  waterLevel: 80,
  coverStatus: 'closed',
  pumpStatus: 'off'
};

export default function Dashboard() {
  const [status, setStatus] = useState<SystemStatus>(mockSystemStatus);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          System Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherCard />
        <Card className="p-6 col-span-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition">
              <Umbrella className="h-6 w-6 mb-2" />
              Toggle Cover
            </button>
            <button className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition">
              <Cpu className="h-6 w-6 mb-2" />
              Toggle Pump
            </button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatusCard
          title="Temperature"
          value={`${status.temperature}°C`}
          icon={Thermometer}
          color="bg-blue-100 text-blue-600"
        />
        <StatusCard
          title="Humidity"
          value={`${status.humidity}%`}
          icon={Droplets}
          color="bg-green-100 text-green-600"
        />
        <StatusCard
          title="Sunlight"
          value={`${status.sunlight}%`}
          icon={Sun}
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Cover Status</span>
              <span className={status.coverStatus === 'closed' ? 'text-red-500' : 'text-green-500'}>
                {status.coverStatus.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pump Status</span>
              <span className={status.pumpStatus === 'off' ? 'text-red-500' : 'text-green-500'}>
                {status.pumpStatus.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Water Level</span>
              <span>{status.waterLevel}%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Plant Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Current Plant</span>
              <span>Tomatoes</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Growth Stage</span>
              <span>Vegetative</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Days Active</span>
              <span>15 days</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}