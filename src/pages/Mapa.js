import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useWeatherData from '../hooks/useWeatherData';
import '../styles/Mapa.scss';

const Mapa = () => {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [position, setPosition] = useState([0, 0]);

    const { fetchTemperatureByCoords } = useWeatherData();

    const MapEvents = () => {
        useMapEvents({
            mousemove: async (event) => {
                const { lat, lng } = event.latlng;
                console.log(`Lat: ${lat}, Lng: ${lng}`);
                setPosition([lat, lng]);
                const weatherData = await fetchTemperatureByCoords(lat, lng);
                console.log(`Weather Data: ${JSON.stringify(weatherData)}`);
                setWeatherInfo(weatherData);
            },
        });
        return null;
    };

    return (
        <div className="map-mapa">
            <MapContainer
                center={[0, 0]}
                zoom={3}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents />
            </MapContainer>
            {weatherInfo && (
                <div className="temperature-card">
                    <h3>{weatherInfo.name}</h3>
                    <p>Temperatura: {weatherInfo.temp}°C</p>
                    <p>Descripción: {weatherInfo.description}</p>
                    <p>Humedad: {weatherInfo.humidity}%</p>
                    <p>Presión: {weatherInfo.pressure} hPa</p>
                    <p>Velocidad del viento: {weatherInfo.windSpeed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Mapa;
