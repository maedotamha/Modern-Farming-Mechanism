"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Umbrella, Cpu, MapPin, Sprout } from 'lucide-react';
import type { PlantConfig } from '@/lib/types';

export default function ConfigPage() {
  const [config, setConfig] = useState<PlantConfig>({
    name: '',
    location: '',
    portNumber: '',
    coverSchedule: {
      startDelay: 30,
      duration: 2
    },
    pumpSchedule: {
      startDelay: 30,
      duration: 2
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle config submission
    console.log('Config submitted:', config);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="relative h-48 rounded-xl overflow-hidden mb-8">
        <img 
          src="https://images.unsplash.com/photo-1595074475099-3d0066f7fc86?auto=format&fit=crop&q=80"
          alt="Hydroponic Setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent flex items-center">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-2">System Configuration</h1>
            <p className="text-green-50">Manage your hydroponic system settings</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Umbrella className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold">Cover Control</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Start Delay (minutes)</Label>
                <Input
                  type="number"
                  value={config.coverSchedule.startDelay}
                  onChange={(e) => setConfig({
                    ...config,
                    coverSchedule: {
                      ...config.coverSchedule,
                      startDelay: parseInt(e.target.value)
                    }
                  })}
                />
              </div>
              <div>
                <Label>Duration (hours)</Label>
                <Input
                  type="number"
                  value={config.coverSchedule.duration}
                  onChange={(e) => setConfig({
                    ...config,
                    coverSchedule: {
                      ...config.coverSchedule,
                      duration: parseInt(e.target.value)
                    }
                  })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Cpu className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold">Pump Control</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Start Delay (minutes)</Label>
                <Input
                  type="number"
                  value={config.pumpSchedule.startDelay}
                  onChange={(e) => setConfig({
                    ...config,
                    pumpSchedule: {
                      ...config.pumpSchedule,
                      startDelay: parseInt(e.target.value)
                    }
                  })}
                />
              </div>
              <div>
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  value={config.pumpSchedule.duration}
                  onChange={(e) => setConfig({
                    ...config,
                    pumpSchedule: {
                      ...config.pumpSchedule,
                      duration: parseInt(e.target.value)
                    }
                  })}
                />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sprout className="h-5 w-5 text-green-600" />
                <Label>Plant Name</Label>
              </div>
              <Input
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                placeholder="e.g., Tomatoes"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-green-600" />
                <Label>Location</Label>
              </div>
              <Input
                value={config.location}
                onChange={(e) => setConfig({ ...config, location: e.target.value })}
                placeholder="e.g., Greenhouse 1"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Cpu className="h-5 w-5 text-green-600" />
                <Label>Port Number</Label>
              </div>
              <Input
                value={config.portNumber}
                onChange={(e) => setConfig({ ...config, portNumber: e.target.value })}
                placeholder="e.g., COM3"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}