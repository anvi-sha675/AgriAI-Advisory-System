import { useEffect, useState } from "react";
import {
  AlertTriangle,
  MapPin,
  RefreshCw,
  Search,
  LocateFixed,
} from "lucide-react";
import WeatherCard, { ForecastRow } from "../components/feature/WeatherCard";
import { CardSkeleton } from "../components/ui/Skeleton";
import { Alert } from "../components/ui/EmptyState";
import { getWeather } from "../services/aiService";
import { useToast } from "../context/ToastContext";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { addToast } = useToast();

  const [activeQuery, setActiveQuery] = useState(undefined);

  const fetchWeather = async (query) => {
    setIsLoading(true);
    try {
      const data = await getWeather(query);
      setWeather(data);
    } catch {
      addToast("Couldn't load weather right now.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(activeQuery);
  }, []);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      addToast("Your browser doesn't support location detection.", "error");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setActiveQuery(coords);
        setIsLocating(false);
        fetchWeather(coords);
      },
      (err) => {
        setIsLocating(false);
        const message =
          err.code === err.PERMISSION_DENIED
            ? "Location access was denied — you can search for a city instead."
            : "Couldn't detect your location. Please search for a city instead.";
        addToast(message, "error");
      },
      { timeout: 10000 },
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setActiveQuery(searchInput.trim());
    fetchWeather(searchInput.trim());
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="h-4 w-4" />{" "}
          {weather?.location || "Loading location..."}
        </div>
        <button
          onClick={() => fetchWeather(activeQuery)}
          className="flex items-center gap-1.5 text-sm font-medium text-primary-700 dark:text-secondary-400 hover:underline shrink-0"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      <div className="card p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              className="input-field pl-10"
              placeholder="Search for a city (e.g. Pune, Jaipur, Ludhiana)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
          <button
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="btn-outline whitespace-nowrap disabled:opacity-60"
          >
            <LocateFixed className="h-4 w-4" />{" "}
            {isLocating ? "Detecting..." : "Use my location"}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2.5">
          By default this shows the location saved in your profile. Search a
          city, or use your device's location, to check somewhere else.
        </p>
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
