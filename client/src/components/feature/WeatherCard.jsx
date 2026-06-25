import { Cloud, CloudRain, Sun, Droplets, Wind } from "lucide-react";

const conditionIcons = {
  Sunny: Sun,
  "Partly Cloudy": Cloud,
  Rain: CloudRain,
};

export default function WeatherCard({ weather, compact = false }) {
  if (!weather) return null;
  const { current, location } = weather;
  const Icon = conditionIcons[current.condition] || Cloud;

  if (compact) {
    return (
      <div className="card p-5 bg-gradient-to-br from-accent-500 to-accent-600 text-white border-none">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-accent-100">{location}</p>
            <p className="text-3xl font-bold mt-1">{current.temp}°C</p>
            <p className="text-sm text-accent-100 mt-0.5">
              {current.condition}
            </p>
          </div>
          <Icon className="h-12 w-12 text-white/90" />
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20 text-xs text-accent-100">
          <span className="flex items-center gap-1">
            <Droplets className="h-3.5 w-3.5" /> {current.humidity}%
          </span>
          <span className="flex items-center gap-1">
            <Wind className="h-3.5 w-3.5" /> {current.windSpeed} km/h
          </span>
          <span className="flex items-center gap-1">
            <CloudRain className="h-3.5 w-3.5" /> {current.rainChance}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
          <p className="text-4xl font-bold text-ink dark:text-gray-100 mt-1">
            {current.temp}°C
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            {current.condition}
          </p>
        </div>
        <div className="h-20 w-20 rounded-2xl bg-accent-50 dark:bg-accent-950/40 flex items-center justify-center">
          <Icon className="h-10 w-10 text-accent-500" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
          <Droplets className="h-4 w-4 text-accent-500 mx-auto mb-1" />
          <p className="text-sm font-semibold text-ink dark:text-gray-100">
            {current.humidity}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Humidity</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
          <Wind className="h-4 w-4 text-accent-500 mx-auto mb-1" />
          <p className="text-sm font-semibold text-ink dark:text-gray-100">
            {current.windSpeed} km/h
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Wind</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
          <CloudRain className="h-4 w-4 text-accent-500 mx-auto mb-1" />
          <p className="text-sm font-semibold text-ink dark:text-gray-100">
            {current.rainChance}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Rain chance
          </p>
        </div>
      </div>
    </div>
  );
}

export function ForecastRow({ day }) {
  const Icon = conditionIcons[day.condition] || Cloud;
  return (
    <div className="flex items-center justify-between py-3 px-1 border-b border-gray-100 dark:border-gray-800 last:border-none">
      <span className="text-sm font-medium text-ink dark:text-gray-100 w-20">
        {day.day}
      </span>
      <Icon className="h-5 w-5 text-accent-500" />
      <span className="text-xs text-gray-500 dark:text-gray-400 w-16 text-right">
        {day.rain}% rain
      </span>
      <span className="text-sm font-semibold text-ink dark:text-gray-100 w-20 text-right">
        {day.high}°{" "}
        <span className="text-gray-400 font-normal">{day.low}°</span>
      </span>
    </div>
  );
}
