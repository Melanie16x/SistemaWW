import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useWeatherData = (city) => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = '38b285c8729ce9a1fc257c89fff83084';

    // Función para obtener datos del clima actual
    const fetchWeatherData = useCallback(async () => {
        try {
            const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'es' // Añade el parámetro para obtener descripciones en español
                }
            });
            setWeatherData(weatherResponse.data);
        } catch (error) {
            setError(error);
        }
    }, [city]);

    // Función para obtener datos de pronóstico
    const fetchForecastData = useCallback(async () => {
        try {
            const forecastResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'es' // Añade el parámetro para obtener descripciones en español
                }
            });
            const forecastList = forecastResponse.data.list.filter(item => item.dt_txt.endsWith("12:00:00"));
            setForecastData(forecastList.slice(0, 5));
        } catch (error) {
            setError(error);
        }
    }, [city]);

    // Función para obtener datos horarias
    const fetchHourlyForecast = useCallback(async (date) => {
        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'es' // Añade el parámetro para obtener descripciones en español
                }
            });
            // Filtra para obtener datos de las próximas 24 horas
            const filteredData = response.data.list.filter(item => {
                const itemDate = new Date(item.dt * 1000);
                return itemDate.toDateString() === date.toDateString();
            });
            setHourlyForecast(filteredData);
        } catch (error) {
            setError(error);
        }
    }, [city]);

    // Nueva función para obtener la temperatura basada en coordenadas
    const fetchTemperatureByCoords = useCallback(async (lat, lon) => {
        try {
            const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat,
                    lon,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'es' // Añade el parámetro para obtener descripciones en español
                }
            });
            const { name, main, weather, wind, dt } = weatherResponse.data;
            return {
                name,
                temp: main.temp,
                description: weather[0].description,
                humidity: main.humidity,
                pressure: main.pressure,
                windSpeed: wind.speed
            };
        } catch (error) {
            setError(error);
            return null;
        }
    }, []);
    

    // useEffect para cargar datos al iniciar
    useEffect(() => {
        setLoading(true);
        fetchWeatherData();
        fetchForecastData();
        fetchHourlyForecast(new Date()); // Fetch default hourly forecast
        setLoading(false);
    }, [fetchWeatherData, fetchForecastData, fetchHourlyForecast]);

    return { weatherData, forecastData, hourlyForecast, loading, error, fetchHourlyForecast, fetchTemperatureByCoords };
};

export default useWeatherData;
