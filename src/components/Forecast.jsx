import React from 'react';

const Forecast = ({ data }) => {
    if (!data) return null;

    // Filter for 12:00 PM each day to get a consistent daily forecast
    const dailyForecast = data.list.filter((item) => item.dt_txt.includes('12:00:00')).slice(0, 5);

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 px-4 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-white mb-6 pl-2">5-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {dailyForecast.map((item, index) => {
                    const date = new Date(item.dt * 1000);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

                    return (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 border-b-4 border-b-blue-500/30"
                        >
                            <span className="text-lg font-bold text-white mb-2">{dayName}</span>
                            <img src={iconUrl} alt={item.weather[0].description} className="w-16 h-16 drop-shadow-lg" />
                            <div className="flex flex-col items-center mt-2">
                                <span className="text-2xl font-black text-white">{Math.round(item.main.temp)}°</span>
                                <span className="text-xs text-white/50 capitalize text-center mt-1">{item.weather[0].description}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Forecast;
