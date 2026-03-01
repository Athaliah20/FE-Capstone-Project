import React from 'react';
import { History, X } from 'lucide-react';

const RecentSearches = ({ searches, onSelect, onClearOne, onClearAll }) => {
    if (searches.length === 0) return null;

    return (
        <div className="w-full max-w-md mx-auto mt-8 px-4">
            <div className="flex justify-between items-center mb-4">
                <h4 className="flex items-center gap-2 text-white/80 font-semibold">
                    <History size={18} />
                    Recent Searches
                </h4>
                <button
                    onClick={onClearAll}
                    className="text-xs text-white/40 hover:text-white/80 transition-colors uppercase tracking-wider font-bold"
                >
                    Clear All
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {searches.map((city, index) => (
                    <div
                        key={index}
                        className="group flex items-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-full pl-4 pr-2 py-1.5 transition-all cursor-pointer"
                    >
                        <span
                            onClick={() => onSelect(city)}
                            className="text-white/80 text-sm font-medium mr-2"
                        >
                            {city}
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClearOne(city);
                            }}
                            className="p-1 hover:bg-white/10 rounded-full text-white/30 hover:text-white/80 transition-all"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentSearches;
