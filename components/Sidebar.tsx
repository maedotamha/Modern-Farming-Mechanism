"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Sliders, 
  Activity, 
  Bell, 
  Brain, 
  Settings, 
  LogOut,
  Leaf,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Status", href: "/status", icon: Activity },
    { name: "Notification", href: "/notification", icon: Bell },
    { name: "AI Feed", href: "/ai-feed", icon: Brain },
    { name: "Config", href: "/config", icon: Settings },
    { name: "Information", href: "/control", icon: Sliders },
  ];

  return (
    <div className={cn(
      "flex flex-col h-screen bg-card border-r transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
          <Leaf className="h-8 w-8 text-green-600" />
          {!isCollapsed && <span className="text-xl font-bold">SIHF</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-full"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2 rounded-lg transition-colors",
                isActive 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                  : "hover:bg-muted",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={cn(
        "p-4 border-t flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <ThemeToggle />
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;