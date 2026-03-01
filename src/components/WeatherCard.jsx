import React from 'react';
import { Thermometer, Droplets, Wind, MapPin } from 'lucide-react';

const WeatherCard = ({ data }) => {
    if (!data) return null;

    const { name, main, weather, wind, sys } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

    return (
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 mt-4 text-white shadow-2xl animate-fade-in transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-4xl font-bold flex items-center gap-2 mb-1">
                        <MapPin className="text-blue-400" size={28} />
                        {name}
                    </h2>
                    <p className="text-white/70 text-lg font-medium">{sys.country}</p>
                </div>
                <div className="text-right">
                    <p className="text-white/60 capitalize font-medium">{weather[0].description}</p>
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div className="relative">
                    <span className="text-8xl font-black bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
                        {Math.round(main.temp)}°
                    </span>
                    <span className="text-3xl font-light text-white/60 absolute top-2 -right-6">C</span>
                </div>
                <img
                    src={iconUrl}
                    alt={weather[0].description}
                    className="w-32 h-32 drop-shadow-2xl animate-bounce-slow"
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-3xl p-4 flex flex-col items-center justify-center backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                    <Thermometer className="text-orange-400 mb-2" size={20} />
                    <span className="text-xs text-white/50 mb-1">Feels Like</span>
                    <span className="font-bold">{Math.round(main.feels_like)}°C</span>
                </div>
                <div className="bg-white/5 rounded-3xl p-4 flex flex-col items-center justify-center backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                    <Droplets className="text-blue-400 mb-2" size={20} />
                    <span className="text-xs text-white/50 mb-1">Humidity</span>
                    <span className="font-bold">{main.humidity}%</span>
                </div>
                <div className="bg-white/5 rounded-3xl p-4 flex flex-col items-center justify-center backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                    <Wind className="text-green-400 mb-2" size={20} />
                    <span className="text-xs text-white/50 mb-1">Wind</span>
                    <span className="font-bold">{Math.round(wind.speed)} km/h</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
