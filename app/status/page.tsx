"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import StatusCard from '@/components/StatusCard';
import { Thermometer, Droplets, Sun } from 'lucide-react';
import { SystemStatus } from '@/lib/types';

export default function StatusPage() {
  const [status] = useState<SystemStatus>({
    temperature: 25,
    humidity: 60,
    sunlight: 75,
    waterLevel: 80,
    coverStatus: 'closed',
    pumpStatus: 'off'
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">System Status</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Detailed Readings</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Temperature History</label>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Humidity History</label>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Sunlight History</label>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}