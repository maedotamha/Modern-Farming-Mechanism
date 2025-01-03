"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import StatusCard from "@/components/StatusCard";
import { Thermometer, Droplets, Sun } from "lucide-react";

interface FarmStatus {
  current: number;
  ideal: number;
  pump: boolean;
}

interface EnvironmentStatus {
  temperature: number;
  humidity: number;
  isRaining: boolean;
}

interface SystemStatus {
  farmA: FarmStatus;
  farmB: FarmStatus;
  environment: EnvironmentStatus;
}

export default function StatusPage() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Restore from local storage on mount
    const savedStatus = localStorage.getItem("systemStatus");
    if (savedStatus) {
      setSystemStatus(JSON.parse(savedStatus));
      setLoading(false);
    } else {
      fetchSystemStatus(true); // Pass true for the initial load
    }

    // Periodically fetch system status
    const interval = setInterval(fetchSystemStatus, 900000); // Every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const generateMockData = (): SystemStatus => {
    const randomTemperatureChange = parseFloat(
      (Math.random() * 0.8 - 0.4).toFixed(1) // Variation of ±0.4°C
    );
    const randomHumidityChange = Math.floor(Math.random() * 3 - 1);

    return {
      farmA: {
        current: Math.floor(Math.random() * 100),
        ideal: 60,
        pump: Math.random() < 0.5,
      },
      farmB: {
        current: Math.floor(Math.random() * 100),
        ideal: 70,
        pump: Math.random() < 0.5,
      },
      environment: {
        temperature: parseFloat(
          Math.min(
            30,
            Math.max(
              20,
              (systemStatus?.environment.temperature || 25) + randomTemperatureChange
            )
          ).toFixed(1)
        ),
        humidity: Math.min(
          70,
          Math.max(60, (systemStatus?.environment.humidity || 65) + randomHumidityChange)
        ),
        isRaining: false, // Always Clear
      },
    };
  };

  const fetchSystemStatus = async (isInitialLoad = false) => {
    setError(null); // Clear previous errors
    setLoading(true);

    try {
      console.log("Fetching system status...");

      // Simulated API call or mock data
      const mockData = generateMockData();

      // Simulate network delay
      const delay = isInitialLoad ? 9000000 : 500; // Longer delay for the first load
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Save to local storage
      localStorage.setItem("systemStatus", JSON.stringify(mockData));
      console.log("System status saved to local storage:", mockData);

      // Update state
      setSystemStatus(mockData);
    } catch (error) {
      setError("Failed to fetch system status. Please try again.");
      console.error("Error fetching system status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchStatus = async () => {
    await fetchSystemStatus();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">System Status</h1>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleFetchStatus}
        className={`px-4 py-2 rounded ${
          loading ? "bg-gray-300" : "bg-blue-600 text-white"
        } hover:bg-blue-700`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch System Status"}
      </button>

      {loading ? (
        <p>Loading system status...</p>
      ) : (
        systemStatus && (
          <>
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
                value="Clear" // Always Clear
                icon={Sun}
                color="bg-yellow-100 text-yellow-600"
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
          </>
        )
      )}
    </div>
  );
}
