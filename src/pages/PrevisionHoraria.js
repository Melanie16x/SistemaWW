import React, { useState, useEffect } from 'react';
import useWeatherData from '../hooks/useWeatherData';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { format, addDays, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale'; // Importa la localización en español
import '../styles/PrevisionHoraria.scss';

const PrevisionHoraria = () => {
    const [selectedDate, setSelectedDate] = useState(startOfToday()); // Empieza desde hoy
    const { hourlyForecast, loading, error, fetchHourlyForecast } = useWeatherData('Formosa');

    useEffect(() => {
        fetchHourlyForecast(selectedDate);
    }, [selectedDate, fetchHourlyForecast]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al obtener los datos: {error.message}</div>;

    // Prepara los datos para el gráfico
    const chartData = hourlyForecast.map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: item.main.temp
    }));

    // Genera los próximos 5 días
    const getNext5Days = () => {
        const days = [];
        for (let i = 0; i < 5; i++) {
            const date = addDays(startOfToday(), i);
            days.push(date);
        }
        return days;
    };

    // Función para formatear la fecha en español
    const formatDate = date => {
        const day = format(date, 'EEE', { locale: es }); // Día de la semana en español
        const dayNumber = format(date, 'd'); // Día del mes
        return `${day} ${dayNumber}`;
    };

    return (
        <div className="prevision-horaria">
            <h1 className='title'>Previsión Horaria</h1>
            <div className="days-container">
                {getNext5Days().map((date, index) => (
                    <div
                        key={index}
                        className={`day-card ${selectedDate.toDateString() === date.toDateString() ? 'active' : ''}`}
                        onClick={() => setSelectedDate(date)}
                    >
                        {formatDate(date)}
                    </div>
                ))}
            </div>
            <div className="chart-container">
                <LineChart width={800} height={400} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#06D6A0" dot={false} />
                </LineChart>
            </div>
        </div>
    );
};

export default PrevisionHoraria;
