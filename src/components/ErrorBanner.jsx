import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorBanner = ({ message }) => (
  <div className="max-w-2xl mx-auto mt-4">
    <div className="bg-red-500/90 backdrop-blur-md border-l-4 border-red-700 p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-white" />
        <p className="text-white font-medium">{message}</p>
      </div>
    </div>
  </div>
);

export default ErrorBanner;
