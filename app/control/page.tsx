"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Umbrella, Cpu } from 'lucide-react';

export default function ControlPage() {
  const [coverStatus, setCoverStatus] = useState('closed');
  const [pumpStatus, setPumpStatus] = useState('off');

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">System Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Umbrella className="h-6 w-6" />
              <h3 className="text-xl font-semibold">Cover Control</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              coverStatus === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {coverStatus.toUpperCase()}
            </span>
          </div>
          <Button 
            className="w-full"
            onClick={() => setCoverStatus(coverStatus === 'open' ? 'closed' : 'open')}
          >
            Toggle Cover
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Cpu className="h-6 w-6" />
              <h3 className="text-xl font-semibold">Pump Control</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              pumpStatus === 'on' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {pumpStatus.toUpperCase()}
            </span>
          </div>
          <Button 
            className="w-full"
            onClick={() => setPumpStatus(pumpStatus === 'on' ? 'off' : 'on')}
          >
            Toggle Pump
          </Button>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Schedule Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Cover Schedule</h4>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Open Time</label>
              <input type="time" className="w-full rounded-md border p-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Close Time</label>
              <input type="time" className="w-full rounded-md border p-2" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Pump Schedule</h4>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Start Time</label>
              <input type="time" className="w-full rounded-md border p-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Duration (minutes)</label>
              <input type="number" className="w-full rounded-md border p-2" min="1" max="60" />
            </div>
          </div>
        </div>
        <Button className="mt-6 w-full">Save Schedule</Button>
      </Card>
    </div>
  );
}