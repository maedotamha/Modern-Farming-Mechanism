"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle } from "lucide-react";

interface EnvironmentData {
  temperature: number;
  humidity: number;
  isRaining: boolean;
}

interface FarmData {
  current: number; // Current soil moisture
  ideal: number; // Ideal soil moisture
  pump: boolean; // Pump status
}

interface SystemStatus {
  farmA: FarmData;
  farmB: FarmData;
  environment: EnvironmentData;
}

interface Notification {
  id: string;
  type: "warning" | "success";
  message: string;
  time: string;
  icon: React.ElementType;
  color: string;
}

const MAX_VALUES = {
  temperature: 30,
  humidity: 70,
  moisture: 80,
};

const MIN_VALUES = {
  temperature: 10,
  humidity: 30,
  moisture: 40,
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  let notificationId = 0; // Counter to ensure unique IDs

  useEffect(() => {
    // Retrieve system status from local storage
    const savedStatus = localStorage.getItem("systemStatus");
    if (savedStatus) {
      setSystemStatus(JSON.parse(savedStatus));
    }
  }, []);

  useEffect(() => {
    if (systemStatus) {
      const newNotifications: Notification[] = [];
      const generateId = () => `notification-${notificationId++}`;

      const checkFarm = (farm: "farmA" | "farmB", farmName: string) => {
        const farmData = systemStatus[farm];
        if (farmData.current > MAX_VALUES.moisture) {
          newNotifications.push({
            id: generateId(),
            type: "warning",
            message: `${farmName} moisture exceeded max value (${farmData.current}% > ${MAX_VALUES.moisture}%).`,
            time: "Just now",
            icon: AlertTriangle,
            color: "text-yellow-500",
          });
        } else if (farmData.current < MIN_VALUES.moisture) {
          newNotifications.push({
            id: generateId(),
            type: "warning",
            message: `${farmName} moisture below min value (${farmData.current}% < ${MIN_VALUES.moisture}%).`,
            time: "Just now",
            icon: AlertTriangle,
            color: "text-yellow-500",
          });
        }

        if (farmData.pump) {
          newNotifications.push({
            id: generateId(),
            type: "success",
            message: `${farmName} pump is currently ON.`,
            time: "Just now",
            icon: CheckCircle,
            color: "text-green-500",
          });
        }
      };

      // Check farms
      checkFarm("farmA", "Farm A");
      checkFarm("farmB", "Farm B");

      // Check environment
      const { temperature, humidity, isRaining } = systemStatus.environment;
      if (temperature > MAX_VALUES.temperature) {
        newNotifications.push({
          id: generateId(),
          type: "warning",
          message: `Temperature exceeded max value (${temperature}°C > ${MAX_VALUES.temperature}°C).`,
          time: "Just now",
          icon: AlertTriangle,
          color: "text-yellow-500",
        });
      } else if (temperature < MIN_VALUES.temperature) {
        newNotifications.push({
          id: generateId(),
          type: "warning",
          message: `Temperature below min value (${temperature}°C < ${MIN_VALUES.temperature}°C).`,
          time: "Just now",
          icon: AlertTriangle,
          color: "text-yellow-500",
        });
      }

      if (humidity > MAX_VALUES.humidity) {
        newNotifications.push({
          id: generateId(),
          type: "warning",
          message: `Humidity exceeded max value (${humidity}% > ${MAX_VALUES.humidity}%).`,
          time: "Just now",
          icon: AlertTriangle,
          color: "text-yellow-500",
        });
      } else if (humidity < MIN_VALUES.humidity) {
        newNotifications.push({
          id: generateId(),
          type: "warning",
          message: `Humidity below min value (${humidity}% < ${MIN_VALUES.humidity}%).`,
          time: "Just now",
          icon: AlertTriangle,
          color: "text-yellow-500",
        });
      }

      if (isRaining) {
        newNotifications.push({
          id: generateId(),
          type: "warning",
          message: "Rain detected! Adjust irrigation settings as needed.",
          time: "Just now",
          icon: AlertTriangle,
          color: "text-blue-500",
        });
      }

      setNotifications((prev) => [...newNotifications, ...prev]);
    }
  }, [systemStatus]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">System Alerts</span>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-4">
            <div className="flex items-start space-x-4">
              <notification.icon className={`h-5 w-5 ${notification.color}`} />
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
