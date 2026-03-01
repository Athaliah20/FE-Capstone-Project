import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8 group">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search for a city..."
                className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 placeholder:text-white/60 text-white shadow-xl group-hover:bg-white/15"
            />
            <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors duration-300 text-white shadow-lg shadow-blue-500/30"
            >
                <Search size={24} />
            </button>
        </form>
    );
};

export default SearchBar;
