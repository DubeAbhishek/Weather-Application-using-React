import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ErrorBanner from "./ErrorBanner";
import WeatherParticles from "./WeatherParticles";
import WelcomeScreen from "./WelcomeScreen";
import Footer from "./Footer";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../utils/api";
import { getWeatherBackground } from "../utils/weatherUtils";
import { MapPin } from "lucide-react";

const WeatherApp = () => {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [error, setError] = useState("");
  const [currentWeatherBg, setCurrentWeatherBg] = useState("clear");

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      const mainWeather = locations[0].weather[0].main.toLowerCase();
      setCurrentWeatherBg(mainWeather);
    }
  }, [locations]);

  const addLocation = (weatherData) => {
    const exists = locations.find((loc) => loc.id === weatherData.id);
    if (!exists) {
      setLocations((prev) => [...prev, weatherData]);
      setError("");
    } else {
      setError("Location already added");
      setTimeout(() => setError(""), 3000);
    }
  };

  const removeLocation = (id) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const data = await fetchWeatherByCoords(latitude, longitude, setError);
        if (data) addLocation(data);
        setLoading(false);
      },
      () => {
        setError("Location permission denied. Please search manually.");
        setLoading(false);
      }
    );
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLoading(true);
      const data = await fetchWeatherByCity(searchQuery, setError);
      if (data) addLocation(data);
      setSearchQuery("");
      setLoading(false);
    } else {
      requestLocation();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-all duration-1000"
      style={{ background: getWeatherBackground(currentWeatherBg) }}
    >
      <WeatherParticles weather={currentWeatherBg} />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

      {showWelcome && <WelcomeScreen />}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-light text-white mb-2 tracking-wide drop-shadow-lg">
            Weather of Prithvi
          </h1>
          <p className="text-white/90 drop-shadow">
            Your comprehensive weather companion
          </p>
        </header>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleKeyPress={handleKeyPress}
          loading={loading}
        />

        {error && <ErrorBanner message={error} />}

        {locations.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-600 animate-bounce" />
              <h3 className="text-2xl font-light text-gray-800 mb-2">
                No locations added
              </h3>
              <p className="text-gray-600">
                Search for a city or use your current location
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <WeatherCard
                key={location.id}
                location={location}
                index={index}
                removeLocation={removeLocation}
              />
            ))}
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default WeatherApp;
