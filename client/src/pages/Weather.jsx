import { useEffect, useState } from "react";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import WeatherCard, { ForecastRow } from "../components/feature/WeatherCard";
import { CardSkeleton } from "../components/ui/Loader";
import { Alert } from "../components/ui/EmptyState";
import { getWeather } from "../services/aiService";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeather = async () => {
    setIsLoading(true);
    const data = await getWeather();
    setWeather(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="h-4 w-4" />{" "}
          {weather?.location || "Loading location..."}
        </div>
        <button
          onClick={fetchWeather}
          className="flex items-center gap-1.5 text-sm font-medium text-primary-700 dark:text-secondary-400 hover:underline"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          {weather?.alerts?.map((alert, i) => (
            <Alert key={i} type="warning" title="Weather Alert">
              {alert.message}
            </Alert>
          ))}

          <WeatherCard weather={weather} />

          <div className="card p-6">
            <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-3">
              5-Day Forecast
            </h3>
            <div>
              {weather?.forecast.map((day) => (
                <ForecastRow key={day.day} day={day} />
              ))}
            </div>
          </div>

          <div className="card p-6 bg-primary-50 dark:bg-primary-950/20 border-primary-100 dark:border-primary-900">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary-700 dark:text-secondary-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-ink dark:text-gray-100">
                  Farming Recommendation
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  With rain expected mid-week, avoid pesticide or fertilizer
                  spraying for the next 2 days as it may wash away before
                  absorption. Good window for irrigation-light tasks like
                  weeding instead.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
