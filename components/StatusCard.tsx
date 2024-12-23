import { Card } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function StatusCard({ title, value, icon: Icon, color }: StatusCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </Card>
  );
}