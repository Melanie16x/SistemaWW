import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Vida.scss';

const API_KEY = '38b285c8729ce9a1fc257c89fff83084';

const fetchWeatherData = async (city) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const Vida = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city] = useState('Formosa'); // Puedes cambiar esto por la ciudad deseada

    useEffect(() => {
        const getWeatherData = async () => {
            const data = await fetchWeatherData(city);
            setWeatherData(data);
        };
        getWeatherData();
    }, [city]);

    const getAdvice = () => {
        if (!weatherData) return {};

        const { main, weather } = weatherData;
        const temperature = main.temp;
        const weatherDescription = weather[0].main.toLowerCase();
        const isRainy = weatherDescription.includes('rain');
        const isSunny = weatherDescription.includes('clear') || weatherDescription.includes('sunny');
        const uvIndex = Math.random() * 10; // Simula un índice UV para el ejemplo (debe ser reemplazado por un valor real si está disponible)
        const advice = {
            umbrella: isRainy ? 'Necesario' : 'No es necesario',
            outdoors: isSunny ? 'Perfecto' : 'La peor',
            uvIndex: uvIndex > 5 ? 'Alto: Usa protector solar' : 'Bajo',
            clothing: temperature < 10 ? 'Abrigada' : 'Ligera',
            sunExposure: isSunny ? 'Seguro' : 'Inseguro'
        };

        return advice;
    };

    const advice = getAdvice();

    return (
        <div className="vida">
            <h1 className='title'>Consejos del Clima</h1>
            <div className="advice-container">
                <div className="advice-item">
                    <strong>Paraguas:</strong> {advice.umbrella}
                </div>
                <div className="advice-item">
                    <strong>Al aire libre:</strong> {advice.outdoors}
                </div>
                <div className="advice-item">
                    <strong>Índice UV:</strong> {advice.uvIndex}
                </div>
                <div className="advice-item">
                    <strong>Ropa:</strong> {advice.clothing}
                </div>
                <div className="advice-item">
                    <strong>Exposición al sol:</strong> {advice.sunExposure}
                </div>
            </div>
        </div>
    );
};

export default Vida;
