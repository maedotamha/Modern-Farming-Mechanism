"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import StatusCard from "@/components/StatusCard";
import { Thermometer, Droplets, Cpu } from "lucide-react";
import { SystemStatus } from "@/lib/types";

const mockSystemStatus: SystemStatus = {
  farmA: {
    temperature: 22,
    humidity: 65,
    waterLevel: 75,
    pumpStatus: "off",
  },
  farmB: {
    temperature: 24,
    humidity: 70,
    waterLevel: 80,
    pumpStatus: "on",
  },
  temperature: 0,
  humidity: 0,
  waterLevel: 0,
  pumpStatus: "on"
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
        <Card className="p-6 col-span-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition">
              <Cpu className="h-6 w-6 mb-2" />
              Toggle Farm A Pump
            </button>
            <button className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition">
              <Cpu className="h-6 w-6 mb-2" />
              Toggle Farm B Pump
            </button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusCard
          title="Farm A Temperature"
          value={`${status.farmA.temperature}°C`}
          icon={Thermometer}
          color="bg-blue-100 text-blue-600"
        />
        <StatusCard
          title="Farm A Humidity"
          value={`${status.farmA.humidity}%`}
          icon={Droplets}
          color="bg-green-100 text-green-600"
        />
        <StatusCard
          title="Farm A Water Level"
          value={`${status.farmA.waterLevel}%`}
          icon={Droplets}
          color="bg-teal-100 text-teal-600"
        />
        <StatusCard
          title="Farm B Temperature"
          value={`${status.farmB.temperature}°C`}
          icon={Thermometer}
          color="bg-blue-100 text-blue-600"
        />
        <StatusCard
          title="Farm B Humidity"
          value={`${status.farmB.humidity}%`}
          icon={Droplets}
          color="bg-green-100 text-green-600"
        />
        <StatusCard
          title="Farm B Water Level"
          value={`${status.farmB.waterLevel}%`}
          icon={Droplets}
          color="bg-teal-100 text-teal-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Farm A System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Pump Status</span>
              <span
                className={
                  status.farmA.pumpStatus === "off"
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {status.farmA.pumpStatus.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Water Level</span>
              <span>{status.farmA.waterLevel}%</span>
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
                  status.farmB.pumpStatus === "off"
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {status.farmB.pumpStatus.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Water Level</span>
              <span>{status.farmB.waterLevel}%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
