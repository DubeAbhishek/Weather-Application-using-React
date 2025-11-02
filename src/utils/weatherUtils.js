export const getWeatherBackground = (weather) => {
  const main = weather.toLowerCase();
  const backgrounds = {
    clear: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    clouds: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
    rain: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
    drizzle: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    thunderstorm: "linear-gradient(135deg, #232526 0%, #414345 100%)",
    snow: "linear-gradient(135deg, #e6dada 0%, #274046 100%)",
    mist: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)",
    fog: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)",
    haze: "linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)",
  };
  return backgrounds[main] || backgrounds.clear;
};

export const getWeatherGradient = (weather) => {
  const main = weather?.[0]?.main?.toLowerCase() || "clear";
  const gradients = {
    clear: "from-amber-400 via-orange-400 to-yellow-300",
    clouds: "from-slate-400 via-gray-400 to-zinc-300",
    rain: "from-blue-600 via-blue-500 to-blue-400",
    drizzle: "from-cyan-500 via-blue-400 to-sky-300",
    thunderstorm: "from-gray-800 via-gray-700 to-slate-600",
    snow: "from-blue-100 via-slate-200 to-gray-100",
    mist: "from-gray-500 via-slate-400 to-gray-300",
    fog: "from-gray-500 via-slate-400 to-gray-300",
    haze: "from-orange-300 via-amber-200 to-yellow-100",
  };
  return gradients[main] || gradients.clear;
};

export const getWeatherIcon = (weather) => {
  const main = weather?.[0]?.main?.toLowerCase() || "clear";
  const icons = {
    clear: "☀️",
    clouds: "☁️",
    rain: "🌧️",
    drizzle: "🌦️",
    thunderstorm: "⛈️",
    snow: "❄️",
    mist: "🌫️",
    fog: "🌫️",
    haze: "🌁",
  };
  return icons[main] || "🌤️";
};
