"use client";

import { Card } from '@/components/ui/card';
import { Bell, AlertTriangle, CheckCircle } from 'lucide-react';

export default function NotificationPage() {
  const notifications = [
    {
      id: 1,
      type: 'warning',
      message: 'Temperature above optimal range',
      time: '2 hours ago',
      icon: AlertTriangle,
      color: 'text-yellow-500',
    },
    {
      id: 2,
      type: 'success',
      message: 'Water level restored to normal',
      time: '3 hours ago',
      icon: CheckCircle,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            System Alerts
          </span>
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