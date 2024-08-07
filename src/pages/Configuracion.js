import React, { useState } from 'react';
import '../styles/Configuracion.scss';

const Configuracion = () => {
  const [temperatureUnit, setTemperatureUnit] = useState('metric'); // metric o imperial
  const [language, setLanguage] = useState('es'); // es o en

  const handleTemperatureUnitChange = (event) => {
    setTemperatureUnit(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="configuracion">
      <h1 className='title'>Configuración</h1>
      <div className="settings-section">
        <h2 className='Subtitle'>Unidad de Temperatura</h2>
        <select value={temperatureUnit} onChange={handleTemperatureUnitChange}>
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </div>
      <div className="settings-section">
        <h2 className='subtitle'>Idioma</h2>
        <select value={language} onChange={handleLanguageChange}>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
      {/* Aquí puedes agregar más configuraciones según sea necesario */}
    </div>
  );
};

export default Configuracion;
