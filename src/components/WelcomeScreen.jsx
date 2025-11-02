import React from "react";

const WelcomeScreen = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 animate-fade-in">
    <div className="text-center animate-scale-in">
      <h1 className="text-7xl font-light text-white mb-4 animate-float tracking-wider">
        Weather of Prithvi
      </h1>
      <div className="w-64 h-1 bg-white/30 mx-auto rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full animate-slide-right"></div>
      </div>
    </div>
  </div>
);

export default WelcomeScreen;
