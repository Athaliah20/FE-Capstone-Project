import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = axios.create({
    baseURL: BASE_URL,
    params: {
        appid: API_KEY,
        units: 'metric', // Use metric for Celsius
    },
});

export const getWeatherData = async (city) => {
    try {
        const response = await weatherApi.get('/weather', {
            params: { q: city },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getForecastData = async (lat, lon) => {
    try {
        const response = await weatherApi.get('/forecast', {
            params: { lat, lon },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getWeatherByCoords = async (lat, lon) => {
    try {
        const response = await weatherApi.get('/weather', {
            params: { lat, lon },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default weatherApi;
