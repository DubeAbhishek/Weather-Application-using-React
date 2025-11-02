const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


export const fetchWeatherByCity = async (city, setError) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${API_KEY}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) {
      setError(`API Error: ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (data.cod && data.cod !== 200) {
      setError(data.message || "City not found");
      return null;
    }

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    setError("Network error. Please try again.");
    return null;
  }
};

export const fetchWeatherByCoords = async (lat, lon, setError) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) {
      setError(`API Error: ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (data.cod && data.cod !== 200) {
      setError(data.message || "Unable to fetch weather data");
      return null;
    }

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    setError("Connection error. Please check your internet and try again.");
    return null;
  }
};
