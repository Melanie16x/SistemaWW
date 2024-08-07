import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useWeatherData from '../hooks/useWeatherData';
import '../styles/Mapa.scss';

const Mapa = () => {
    const [temperature, setTemperature] = useState(null);
    const [position, setPosition] = useState([0, 0]);

    const { fetchTemperatureByCoords } = useWeatherData();

    const MapEvents = () => {
        useMapEvents({
            mousemove: async (event) => {
                const { lat, lng } = event.latlng;
                console.log(`Lat: ${lat}, Lng: ${lng}`);
                setPosition([lat, lng]);
                const temp = await fetchTemperatureByCoords(lat, lng);
                console.log(`Temperature: ${temp}`);
                setTemperature(temp);
            },
        });
        return null;
    };

    return (
        <div className="map-container">
            <MapContainer
                center={[0, 0]}
                zoom={3}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapEvents />
            </MapContainer>
            {temperature !== null && (
                <div className="temperature-card">
                    Temperatura: {temperature}°C
                </div>
            )}
        </div>
    );
};

export default Mapa;
