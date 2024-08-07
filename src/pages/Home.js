import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer } from 'react-leaflet';
import useWeatherData from '../hooks/useWeatherData'
import 'leaflet/dist/leaflet.css';
import "../styles/Home.scss";

const Home = ({ searchQuery }) => {
    const navigate = useNavigate();
    const { weatherData, forecastData, loading, error } = useWeatherData(searchQuery);
    const { t } = useTranslation();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error al obtener los datos: {error.message}</div>;
    }

    if (!weatherData) {
        return <div>No hay datos disponibles</div>;
    }

    const position = [weatherData.coord.lat, weatherData.coord.lon];

    const handleMapClick = () => {
        navigate('/mapa');
    };

    return (
        <div className="weather-dashboard">
            <div className="weather-dashboard-content">
                <h1 className="city-name">{searchQuery}</h1>
                <Row className="justify-content-start">
                    <Col xs="12" md="6" className='mb-4'>
                        <Card className='weather-card'>
                            <CardBody>
                                <CardTitle tag="h5" className="temperature-title">Temperatura Actual</CardTitle>
                                <CardText className="temperature-value">{weatherData.main.temp}°C</CardText>
                                <CardText>Sensación térmica: {weatherData.main.feels_like}°C</CardText>
                                <CardTitle tag="h5" className="section-title">Detalles del Clima</CardTitle>
                                <CardText>Descripción: {t(weatherData.weather[0].description)}</CardText>
                                <CardText>Humedad: {weatherData.main.humidity}%</CardText>
                                <CardText>Viento: {weatherData.wind.speed} m/s, Dirección: {weatherData.wind.deg}°</CardText>
                                <CardText>Presión: {weatherData.main.pressure} hPa</CardText>
                                <CardText>Visibilidad: {weatherData.visibility / 1000} km</CardText>
                                <CardText>Nubosidad: {weatherData.clouds.all}%</CardText>
                                <CardText>Punto de Rocío: {calculateDewPoint(weatherData.main.temp, weatherData.main.humidity)}°C</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" md="6" className='mb-4'>
                        <div className="map-home" onClick={handleMapClick}>
                            <MapContainer center={position} zoom={4} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </MapContainer>
                        </div>
                    </Col>
                </Row>
                <Row className="forecast-section">
                    <Col xs="12" className="mb-4">
                        <CardTitle tag="h5" className="section-title">Predicción para los próximos 5 días</CardTitle>
                        <Row>
                            {forecastData.map((forecast, index) => (
                                <Col key={index} xs="12" md="2" className='mb-4'>
                                    <Card className='forecast-day-card'>
                                        <CardBody>
                                            <CardText className="forecast-date">{new Date(forecast.dt_txt).toLocaleDateString()}</CardText>
                                            <CardText className="forecast-temp">{forecast.main.temp}°C</CardText>
                                            <CardText className="forecast-desc">{t(forecast.weather[0].description)}</CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

const calculateDewPoint = (temperature, humidity) => {
    // Fórmula para calcular el punto de rocío
    const A = 17.27;
    const B = 237.7;
    const alpha = ((A * temperature) / (B + temperature)) + Math.log(humidity / 100);
    const dewPoint = (B * alpha) / (A - alpha);
    return dewPoint.toFixed(2);
};

export default Home;
