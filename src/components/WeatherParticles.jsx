import React from "react";

const WeatherParticles = ({ weather }) => {
  const main = weather.toLowerCase();

  if (["rain", "drizzle"].includes(main)) {
    return (
      <div className="weather-particles rain-particles">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="raindrop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (main === "snow") {
    return (
      <div className="weather-particles snow-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>
    );
  }

  if (main === "clouds") {
    return (
      <div className="weather-particles cloud-particles">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="cloud"
            style={{
              top: `${10 + Math.random() * 40}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default WeatherParticles;
