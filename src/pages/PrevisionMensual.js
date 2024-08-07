import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PrevisionMensual.scss';

const API_KEY = '38b285c8729ce9a1fc257c89fff83084';

const fetchWeatherData = async (startDate, endDate) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: 'Formosa', // Cambia por la ciudad deseada
                appid: API_KEY,
                units: 'metric',
                start: startDate,
                end: endDate,
                cnt: 30 // Para obtener datos del mes
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const PrevisionMensual = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [year] = useState(new Date().getFullYear());
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const getWeatherData = async () => {
            const startDate = `${year}-${(selectedMonth + 1).toString().padStart(2, '0')}-01`;
            const endDate = `${year}-${(selectedMonth + 1).toString().padStart(2, '0')}-${new Date(year, selectedMonth + 1, 0).getDate()}`;

            const data = await fetchWeatherData(startDate, endDate);
            if (data) {
                // Procesa los datos para mostrar temperaturas diarias
                setWeatherData(data.list);
            }
        };

        getWeatherData();
    }, [selectedMonth, year]);

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        // Update year if needed
    };

    const renderMonthCards = () => {
        const months = [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ];
        return months.map((month, index) => (
            <div
                key={index}
                className={`month-card ${index === selectedMonth ? 'active' : ''}`}
                onClick={() => handleMonthChange(index)}
            >
                {month}
            </div>
        ));
    };

    const renderCalendar = () => {
        const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, selectedMonth, 1).getDay();
        const calendarDays = Array.from({ length: firstDayOfMonth }, (_, i) => null)
            .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

        return (
            <div className="calendar">
                {calendarDays.map((day, index) => {
                    const dateKey = `${year}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day ? day.toString().padStart(2, '0') : '01'}`;
                    const weather = weatherData.find(item => item.dt_txt.startsWith(dateKey));
                    const temperature = weather ? weather.main.temp : 'N/A';

                    return (
                        <div key={index} className="day-card">
                            {day ? (
                                <>
                                    <div className="day-number">{day}</div>
                                    <div className="temperature">
                                        {temperature}°C
                                    </div>
                                </>
                            ) : (
                                <div className="empty-day"></div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="prevision-mensual">
            <h1 className="title">Previsión Mensual</h1>
            <div className="month-selector">
                {renderMonthCards()}
            </div>
            <div className="calendar-container">
                {renderCalendar()}
            </div>
        </div>
    );
};

export default PrevisionMensual;
