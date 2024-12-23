import { WeatherData } from './types';

// Fallback mock data for development
const mockWeatherData: WeatherData = {
  temperature: 25,
  humidity: 65,
  description: 'partly cloudy',
  icon: '02d',
};

export async function getWeatherData(city: string = 'London'): Promise<WeatherData> {
  // Check if we're in development mode or API key is missing
  if (!process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY) {
    console.warn('Weather API key not found, using mock data');
    return mockWeatherData;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();
    
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return mockWeatherData;
  }
}