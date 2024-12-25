"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Umbrella, Cpu, MapPin, Sprout } from "lucide-react";
import type { PlantConfig } from "@/lib/types";

export const exportedValues = {
  location: "",
  name: "",
};

async function sendToBluetoothModule(config: PlantConfig) {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ["serial"], // Replace with HC-05's service UUID if available
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService("serial"); // Replace with the correct service UUID
    const characteristic = await service.getCharacteristic("serial_characteristic"); // Replace UUID

    // Convert config object to JSON and send
    const configData = JSON.stringify(config);
    const encoder = new TextEncoder();
    await characteristic.writeValue(encoder.encode(configData));

    console.log("Configuration sent!");
  } catch (error) {
    console.error("Error sending configuration:", error);
  }
}

export default function ConfigPage() {
  const [config, setConfig] = useState<PlantConfig>({
    name: "",
    location: "",
    rowNumber: "",
    pumpSchedule: {
      startDelay: 30,
      duration: 2,
    },
  });

  const [savedConfig, setSavedConfig] = useState<PlantConfig | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const validateConfig = () => {
    const { startDelay, duration } = config.pumpSchedule;
    if (startDelay < 10 || duration < 10 || startDelay > 2880 || duration > 2880) {
      setWarning("Configured time is not correct. Please enter a time between 10 minutes and 2 days.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateConfig()) return;

    setSavedConfig(config);
    setWarning(null);

    exportedValues.location = config.location;
    exportedValues.name = config.name;

    sendToBluetoothModule(config); // Send the configuration to the Bluetooth module.

    console.log("Config submitted:", config);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="relative h-36 md:h-48 rounded-xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1595074475099-3d0066f7fc86?auto=format&fit=crop&q=80"
          alt="Hydroponic Setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent flex items-center">
          <div className="p-4 md:p-8">
            <h1 className="text-xl md:text-3xl font-bold text-white mb-2">
              System Configuration
            </h1>
            <p className="text-green-50 text-sm md:text-base">
              Manage your Farm system settings
            </p>
          </div>
        </div>
      </div>

      {warning && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          <p>{warning}</p>
        </div>
      )}

      {savedConfig && (
        <Card className="p-4 bg-green-50 dark:bg-green-900/20">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Saved Configuration:</h2>
          <ul className="space-y-2 text-sm md:text-base">
            <li>
              <strong>Plant Name:</strong> {savedConfig.name}
            </li>
            <li>
              <strong>Location:</strong> {savedConfig.location}
            </li>
            <li>
              <strong>Row Number:</strong> {savedConfig.rowNumber}
            </li>
            <li>
              <strong>Pump Start Delay:</strong> {savedConfig.pumpSchedule.startDelay} minutes
            </li>
            <li>
              <strong>Pump Duration:</strong> {savedConfig.pumpSchedule.duration} minutes
            </li>
          </ul>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4 md:p-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              <Cpu className="h-5 md:h-6 w-5 md:w-6 text-green-600" />
              <h3 className="text-lg md:text-xl font-semibold">Pump Control</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Start Delay (minutes)</Label>
                <Input
                  type="number"
                  value={config.pumpSchedule.startDelay}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      pumpSchedule: {
                        ...config.pumpSchedule,
                        startDelay: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  value={config.pumpSchedule.duration}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      pumpSchedule: {
                        ...config.pumpSchedule,
                        duration: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                placeholder="e.g., Addis Abeba"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Cpu className="h-5 w-5 text-green-600" />
                <Label>Row Number</Label>
              </div>
              <Input
                value={config.rowNumber}
                onChange={(e) => setConfig({ ...config, rowNumber: e.target.value })}
                placeholder="e.g., row 1"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-sm md:text-base">
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
