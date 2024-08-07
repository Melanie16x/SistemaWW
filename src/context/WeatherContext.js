import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = '38b285c8729ce9a1fc257c89fff83084';

    const fetchWeatherData = useCallback(async () => {
        try {
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                }
            });
            setWeatherData(weatherResponse.data);
        } catch (error) {
            setError(error);
        }
    }, [city, API_KEY]);

    const fetchForecastData = useCallback(async () => {
        try {
            const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                }
            });
            const forecastList = forecastResponse.data.list.filter(item => item.dt_txt.endsWith("12:00:00"));
            setForecastData(forecastList.slice(0, 5));
        } catch (error) {
            setError(error);
        }
    }, [city, API_KEY]);

    const fetchHourlyForecast = useCallback(async (city, date) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                }
            });
            const filteredData = response.data.list.filter(item => {
                const itemDate = new Date(item.dt * 1000);
                return itemDate.toDateString() === date.toDateString();
            });
            setHourlyForecast(filteredData);
        } catch (error) {
            setError(error);
        }
    }, [API_KEY]);

    useEffect(() => {
        setLoading(true);
        fetchWeatherData();
        fetchForecastData();
        fetchHourlyForecast(city, new Date());
        setLoading(false);
    }, [fetchWeatherData, fetchForecastData, fetchHourlyForecast, city]);

    return (
        <WeatherContext.Provider value={{ city, setCity, weatherData, setWeatherData, forecastData, setForecastData, hourlyForecast, setHourlyForecast, fetchHourlyForecast, loading, error }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeatherContext = () => useContext(WeatherContext);
