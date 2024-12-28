"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import StatusCard from "@/components/StatusCard";
import { Thermometer, Droplets, Sun } from "lucide-react";

export default function StatusPage() {
  const [systemStatus, setSystemStatus] = useState({
    farmA: { current: 0, ideal: 60, pump: false },
    farmB: { current: 0, ideal: 70, pump: false },
    environment: { temperature: 0, humidity: 0, isRaining: false },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Restore from local storage on mount
    const savedStatus = localStorage.getItem("systemStatus");
    if (savedStatus) {
      setSystemStatus(JSON.parse(savedStatus));
    }

    // Periodically fetch system status
    const interval = setInterval(fetchSystemStatus, 10000); // Every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSystemStatus = async () => {
    setError(null); // Clear previous errors
    setLoading(true);

    try {
      console.log("Fetching system status...");

      // Request connection to the Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["serial"],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("serial");
      const characteristic = await service.getCharacteristic("serial_characteristic");

      // Send a request to fetch the status
      const encoder = new TextEncoder();
      await characteristic.writeValue(encoder.encode("STATUS"));

      // Read and decode the response
      const response = await characteristic.readValue();
      const decoder = new TextDecoder();
      const statusData = decoder.decode(response);
      console.log("Received system status:", statusData);

      // Parse the response
      const parsedStatus = parseStatusData(statusData);
      if (parsedStatus) {
        // Save to local storage
        localStorage.setItem("systemStatus", JSON.stringify(parsedStatus));
        console.log("System status saved to local storage:", parsedStatus);

        // Update state
        setSystemStatus(parsedStatus);
      }
    } catch (error) {
      setError("Failed to fetch system status. Please try again.");
      console.error("Error fetching system status:", error);
    } finally {
      setLoading(false);
    }
  };

  const parseStatusData = (data: string) => {
    // Parsing multiple farm data and environmental details
    const statusRegex = /<STATUS:A:(\d+):(\d+):(\d+):B:(\d+):(\d+):(\d+):(\d+):(\d+):(\d+)>/;
    const match = data.match(statusRegex);

    if (!match) {
      console.error("Invalid data format:", data);
      return null;
    }

    return {
      farmA: {
        current: parseInt(match[1], 10),
        ideal: parseInt(match[2], 10),
        pump: Boolean(parseInt(match[3], 10)),
      },
      farmB: {
        current: parseInt(match[4], 10),
        ideal: parseInt(match[5], 10),
        pump: Boolean(parseInt(match[6], 10)),
      },
      environment: {
        temperature: parseFloat(match[7]),
        humidity: parseFloat(match[8]),
        isRaining: Boolean(parseInt(match[9], 10)),
      },
    };
  };

  const handleFetchStatus = async () => {
    setLoading(true);
    await fetchSystemStatus();
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">System Status</h1>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleFetchStatus}
        className={`px-4 py-2 rounded ${loading ? "bg-gray-300" : "bg-blue-600 text-white"} hover:bg-blue-700`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch System Status"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <StatusCard
          title="Temperature"
          value={`${systemStatus.environment.temperature}°C`}
          icon={Thermometer}
          color="bg-blue-100 text-blue-600"
        />
        <StatusCard
          title="Humidity"
          value={`${systemStatus.environment.humidity}%`}
          icon={Droplets}
          color="bg-green-100 text-green-600"
        />
        <StatusCard
          title="Rain Status"
          value={systemStatus.environment.isRaining ? "Raining" : "Clear"}
          icon={Sun}
          color={systemStatus.environment.isRaining ? "bg-gray-100 text-gray-600" : "bg-yellow-100 text-yellow-600"}
        />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Farm Status</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Farm A</h3>
            <p>Current Moisture: {systemStatus.farmA.current}%</p>
            <p>Ideal Moisture: {systemStatus.farmA.ideal}%</p>
            <p>Pump Status: {systemStatus.farmA.pump ? "On" : "Off"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Farm B</h3>
            <p>Current Moisture: {systemStatus.farmB.current}%</p>
            <p>Ideal Moisture: {systemStatus.farmB.ideal}%</p>
            <p>Pump Status: {systemStatus.farmB.pump ? "On" : "Off"}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
