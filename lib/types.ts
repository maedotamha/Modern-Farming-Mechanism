export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
}

export interface PlantConfig {
  name: string;
  location: string;
  portNumber: string;
  coverSchedule: {
    startDelay: number;
    duration: number;
  };
  pumpSchedule: {
    startDelay: number;
    duration: number;
  };
}

export interface SystemStatus {
  temperature: number;
  humidity: number;
  sunlight: number;
  waterLevel: number;
  coverStatus: 'open' | 'closed';
  pumpStatus: 'on' | 'off';
}