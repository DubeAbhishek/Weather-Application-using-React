import React from "react";
import { X, Droplets, Wind, Eye, Gauge } from "lucide-react";
import {
  getWeatherGradient,
  getWeatherIcon,
} from "../utils/weatherUtils";

const WeatherCard = ({ location, index, removeLocation }) => (
  <div
    style={{ animationDelay: `${index * 100}ms` }}
    className="animate-slide-up bg-white/85 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/95"
  >
    <div
      className={`bg-gradient-to-br ${getWeatherGradient(location.weather)} p-6 relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-white/5"></div>
      <button
        onClick={() => removeLocation(location.id)}
        className="absolute top-4 right-4 p-2 bg-white/30 hover:bg-white/50 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
      >
        <X className="w-4 h-4 text-white" />
      </button>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-light text-white mb-1 drop-shadow">
              {location.name}
            </h2>
            <p className="text-white/90 text-sm drop-shadow">
              {location.sys.country}
            </p>
          </div>
          <div className="text-6xl animate-float-slow drop-shadow-lg">
            {getWeatherIcon(location.weather)}
          </div>
        </div>
        <div className="text-6xl font-light text-white mb-2 drop-shadow-lg">
          {Math.round(location.main.temp)}°C
        </div>
        <p className="text-white/95 text-lg capitalize drop-shadow">
          {location.weather[0].description}
        </p>
      </div>
    </div>

    <div className="p-6 grid grid-cols-2 gap-4">
      <WeatherDetail
        icon={<Droplets className="w-5 h-5 text-blue-600" />}
        label="Humidity"
        value={`${location.main.humidity}%`}
      />
      <WeatherDetail
        icon={<Wind className="w-5 h-5 text-purple-600" />}
        label="Wind"
        value={`${location.wind.speed} m/s`}
      />
      <WeatherDetail
        icon={<Eye className="w-5 h-5 text-green-600" />}
        label="Visibility"
        value={`${(location.visibility / 1000).toFixed(1)} km`}
      />
      <WeatherDetail
        icon={<Gauge className="w-5 h-5 text-orange-600" />}
        label="Pressure"
        value={`${location.main.pressure} hPa`}
      />
    </div>

    <div className="px-6 pb-6 pt-2 border-t border-gray-200">
      <div className="flex justify-between text-sm text-gray-700 font-medium">
        <span>Feels like {Math.round(location.main.feels_like)}°C</span>
        <span>
          Min {Math.round(location.main.temp_min)}° / Max{" "}
          {Math.round(location.main.temp_max)}°
        </span>
      </div>
    </div>
  </div>
);

const WeatherDetail = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-blue-100 rounded-xl">{icon}</div>
    <div>
      <p className="text-xs text-gray-600">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default WeatherCard;
