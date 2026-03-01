import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import RecentSearches from './components/RecentSearches';
import { getWeatherData, getForecastData, getWeatherByCoords } from './services/weatherApi';
import { Loader2, CloudLightning, RefreshCcw, MapPin, AlertCircle } from 'lucide-react';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Geolocation on load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          handleSearchByCoords(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Default city if geolocation fails
          handleSearch("London");
        }
      );
    } else {
      handleSearch("London");
    }
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (weather) {
        handleSearch(weather.name, false); // Refresh current city without loader
      }
    }, 300000);
    return () => clearInterval(interval);
  }, [weather]);

  const saveSearch = (city) => {
    if (!recentSearches.includes(city)) {
      const updated = [city, ...recentSearches].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  const handleSearch = async (city, showLoader = true) => {
    if (showLoader) setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherData(city);
      setWeather(weatherData);
      saveSearch(weatherData.name);

      const forecastData = await getForecastData(weatherData.coord.lat, weatherData.coord.lon);
      setForecast(forecastData);
    } catch (err) {
      setError(err.response?.data?.message || "City not found. Please try again.");
      setWeather(null);
      setForecast(null);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const handleSearchByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherByCoords(lat, lon);
      setWeather(weatherData);
      saveSearch(weatherData.name);

      const forecastData = await getForecastData(lat, lon);
      setForecast(forecastData);
    } catch (err) {
      setError("Unable to fetch weather for your location.");
    } finally {
      setLoading(false);
    }
  };

  const clearOneSearch = (city) => {
    const updated = recentSearches.filter(c => c !== city);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearAllSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#581c87] py-12 px-4 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 backdrop-blur-md rounded-2xl border border-blue-400/30">
              <CloudLightning className="text-blue-400" size={32} />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight">
              Sky<span className="text-blue-400">Cast</span>
            </h1>
          </div>
          <p className="text-white/60 font-medium text-lg">Your Premium Real-Time Weather Dashboard</p>
        </header>

        {/* Search Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <SearchBar onSearch={handleSearch} />
          <RecentSearches
            searches={recentSearches}
            onSelect={handleSearch}
            onClearOne={clearOneSearch}
            onClearAll={clearAllSearches}
          />
        </div>

        {/* Status Messages */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-400" size={48} />
            <p className="text-white/60 font-bold animate-pulse">Fetching Atmospheric Data...</p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto mt-8 p-6 bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-[2rem] flex items-center gap-4 text-red-400 animate-shake">
            <AlertCircle size={28} />
            <p className="font-semibold text-lg">{error}</p>
          </div>
        )}

        {/* Weather Display */}
        {!loading && weather && (
          <main className="space-y-8 animate-fade-in">
            <div className="flex justify-center">
              <button
                onClick={() => handleSearch(weather.name)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/60 hover:text-white transition-all text-sm font-bold active:rotate-180"
              >
                <RefreshCcw size={16} />
                Refresh Data
              </button>
            </div>
            <WeatherCard data={weather} />
            <Forecast data={forecast} />
          </main>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-white/30 text-sm font-medium">
        <p>© 2026 SkyCast Dashboard • Powered by OpenWeatherMap</p>
      </footer>
    </div>
  );
};

export default App;
