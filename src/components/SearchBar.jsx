// import React from "react";
// import { Search } from "lucide-react";

// const SearchBar = ({
//   searchQuery,
//   setSearchQuery,
//   handleSearch,
//   handleKeyPress,
//   loading,
// }) => (
//   <div className="max-w-2xl mx-auto mb-8">
//     <div className="relative flex gap-2">
//       <div className="flex-1 relative">
//         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Search for a city or leave empty for current location..."
//           className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/30 focus:border-white focus:outline-none text-gray-800 bg-white/90 backdrop-blur-md transition-all duration-300 placeholder-gray-500"
//         />
//       </div>
//       <button
//         onClick={handleSearch}
//         disabled={loading}
//         className="px-8 py-4 bg-white/90 backdrop-blur-md text-gray-800 rounded-2xl hover:bg-white transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
//       >
//         {loading ? "Loading..." : "Search"}
//       </button>
//     </div>
//   </div>
// );

// export default SearchBar;








import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const GEO_API_URL = "https://api.openweathermap.org/geo/1.0/direct";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // put your key in .env

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleKeyPress,
  loading,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions as the user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `${GEO_API_URL}?q=${searchQuery}&limit=5&appid=${API_KEY}`
        );
        const data = await res.json();
        setSuggestions(data || []);
      } catch (err) {
        console.error("Error fetching city suggestions:", err);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 0); // debounce typing

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSelectSuggestion = (city) => {
    setSearchQuery(city.name);
    setShowSuggestions(false);
    handleSearch(city.name);
  };

  return (
    <div className="max-w-2xl mx-auto mb-8 relative">
      <div className="relative flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Search for a city or leave empty for current location..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/30 focus:border-white focus:outline-none text-gray-800 bg-white/90 backdrop-blur-md transition-all duration-300 placeholder-gray-500"
          />

          {/* Dropdown for suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-50 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 w-full max-h-60 overflow-y-auto">
              {suggestions.map((city, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelectSuggestion(city)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  {city.name}, {city.state ? `${city.state}, ` : ""}
                  {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => handleSearch(searchQuery)}
          disabled={loading}
          className="px-8 py-4 bg-white/90 backdrop-blur-md text-gray-800 rounded-2xl hover:bg-white transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
