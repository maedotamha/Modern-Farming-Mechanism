"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Umbrella, Cpu } from 'lucide-react';

export default function ControlPage() {
  const [pumpStatus, setPumpStatus] = useState('off');

  // Function to send pump status to Bluetooth module
  const sendPumpStatusToBluetooth = async (status) => {
    try {
      // Replace with your Bluetooth logic to send the status
      console.log(`Sending pump status: ${status} to Bluetooth module`);

      // Example Bluetooth API integration logic
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["serial"], // Replace with your service UUID
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("serial"); // Replace UUID
      const characteristic = await service.getCharacteristic("serial_characteristic"); // Replace UUID

      const encoder = new TextEncoder();
      await characteristic.writeValue(encoder.encode(status));

      console.log("Pump status sent successfully!");
    } catch (error) {
      console.error("Error sending pump status to Bluetooth:", error);
    }
  };

  const togglePump = () => {
    const newStatus = pumpStatus === 'on' ? 'off' : 'on';
    setPumpStatus(newStatus);
    sendPumpStatusToBluetooth(newStatus);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Banner */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1587486913048-3292d317b25e?auto=format&fit=crop&q=80"
          alt="Hydroponic System Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent flex items-center">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white">System Control</h1>
            <p className="text-green-50">Manage your farm's operations with ease</p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Cpu className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold">Pump Control</h3>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                pumpStatus === 'on' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {pumpStatus.toUpperCase()}
            </span>
          </div>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={togglePump}
          >
            {pumpStatus === 'on' ? 'Turn Pump Off' : 'Turn Pump On'}
          </Button>
        </Card>
      </div>
    </div>
  );
}
