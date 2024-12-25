export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
}

export interface PlantConfig {
  name: string;
  location: string;
  rowNumber: string;
  pumpSchedule: {
    startDelay: number;
    duration: number;
  };
}

export interface SystemStatus {
  temperature: number;
  humidity: number;
  waterLevel: number;
  pumpStatus: 'on' | 'off';
}