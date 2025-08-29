import React, { useState } from 'react';
import { getWeatherAlertsAndAdvice } from '../services/geminiService';
import type { WeatherAlert } from '../types';

const severityConfig = {
  Low: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  Moderate: 'bg-orange-100 text-orange-800 border-orange-400',
  High: 'bg-red-100 text-red-800 border-red-400',
};

const WeatherResult: React.FC<{ data: WeatherAlert }> = ({ data }) => (
  <div className="mt-8 space-y-8 animate-fade-in">
    {/* Current Weather */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Current Weather in {data.location}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-4xl font-bold text-blue-600">{data.current.temp}°C</p>
          <p className="text-gray-600">{data.current.condition}</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">{data.current.humidity}%</p>
          <p className="text-gray-500">Humidity</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">{data.current.windSpeed} km/h</p>
          <p className="text-gray-500">Wind Speed</p>
        </div>
      </div>
    </div>

    {/* 7-Day Forecast */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">7-Day Forecast</h3>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {data.forecast7Day.map((day, index) => (
            <div key={index} className="flex-shrink-0 w-32 text-center bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">{day.day}</p>
              <p className="text-xl my-2">🌤️</p> {/* Placeholder Icon */}
              <p className="text-sm text-gray-600">{day.condition}</p>
              <p className="mt-2"><span className="font-bold">{day.tempHigh}°</span> / {day.tempLow}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* AI Crop Advisory */}
    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg shadow-md">
       <h3 className="text-2xl font-bold text-green-800 mb-3">💡 AI Crop Advisory</h3>
       <p className="text-gray-700 leading-relaxed">{data.cropAdvisory}</p>
    </div>

    {/* Alerts */}
    {data.alerts.length > 0 && (
       <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Special Alerts</h3>
        <div className="space-y-4">
            {data.alerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${severityConfig[alert.severity]}`}>
                    <p className="font-bold">{alert.title} <span className="text-sm font-medium">({alert.severity})</span></p>
                    <p className="mt-1">{alert.description}</p>
                </div>
            ))}
        </div>
       </div>
    )}
  </div>
);

const WeatherAlertsPage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [crops, setCrops] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherAlert | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !crops) {
      setError("Please fill in both location and crop details.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    setIsSuccess(false);

    try {
      const result = await getWeatherAlertsAndAdvice(location, crops);
      setWeatherData(result);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">AI Weather Alerts & Advisory</h1>
          <p className="text-gray-600 mt-4 text-lg">
            Get hyper-local weather forecasts and personalized advice for your crops.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Your Location *</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g., Anantapur, Andhra Pradesh"
                  className="w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="crops" className="block text-sm font-medium text-gray-700 mb-1">Your Main Crops *</label>
                <input
                  type="text"
                  id="crops"
                  value={crops}
                  onChange={e => setCrops(e.target.value)}
                  placeholder="e.g., Groundnut, Rice"
                  className="w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 text-gray-900"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 transition duration-300 disabled:bg-gray-400"
              >
                {isLoading ? 'Fetching Forecast...' : 'Get Weather Advisory'}
              </button>
            </div>
          </form>
        </div>

        {isLoading && (
          <div className="text-center mt-6">
            <p className="text-lg text-gray-700 animate-pulse">Our AI is consulting the clouds for you...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {isSuccess && !isLoading && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mt-6" role="alert">
                <p className="font-bold">Success!</p>
                <p>Your weather advisory has been generated below.</p>
            </div>
        )}

        {weatherData && <WeatherResult data={weatherData} />}
      </div>
    </div>
  );
};

export default WeatherAlertsPage;