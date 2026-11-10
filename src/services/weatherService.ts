import type { WeatherData } from '@/types';

const weatherCodeMap: Record<number, { condition: string; icon: string }> = {
  0: { condition: 'Despejado', icon: '☀️' },
  1: { condition: 'Mayormente despejado', icon: '🌤️' },
  2: { condition: 'Parcialmente nublado', icon: '⛅' },
  3: { condition: 'Nublado', icon: '☁️' },
  45: { condition: 'Neblina', icon: '🌫️' },
  48: { condition: 'Escarcha', icon: '🌫️' },
  51: { condition: 'Llovizna ligera', icon: '🌦️' },
  53: { condition: 'Llovizna moderada', icon: '🌦️' },
  55: { condition: 'Llovizna intensa', icon: '🌧️' },
  61: { condition: 'Lluvia ligera', icon: '🌦️' },
  63: { condition: 'Lluvia moderada', icon: '🌧️' },
  65: { condition: 'Lluvia fuerte', icon: '🌧️' },
  71: { condition: 'Nieve ligera', icon: '🌨️' },
  73: { condition: 'Nieve moderada', icon: '🌨️' },
  75: { condition: 'Nieve fuerte', icon: '❄️' },
  80: { condition: 'Lluvias localizadas', icon: '🌦️' },
  81: { condition: 'Lluvia intensa', icon: '🌧️' },
  82: { condition: 'Lluvia muy intensa', icon: '⛈️' },
  95: { condition: 'Tormenta', icon: '⛈️' },
};

export async function getCurrentWeather(): Promise<WeatherData> {
  const response = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=-12.0464&longitude=-77.0428&current=temperature_2m,weather_code&timezone=auto',
  );

  if (!response.ok) {
    throw new Error('No se pudo consultar la información meteorológica.');
  }

  const data = await response.json();
  const weatherCode = Number(data?.current?.weather_code ?? 0);
  const weatherData = weatherCodeMap[weatherCode] ?? { condition: 'Despejado', icon: '☀️' };

  return {
    city: 'Lima',
    temperature: Number(data?.current?.temperature_2m ?? 0),
    condition: weatherData.condition,
    icon: weatherData.icon,
    description: `${weatherData.condition} en ${'Lima'}.`,
  };
}
