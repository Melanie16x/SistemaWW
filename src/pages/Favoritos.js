import React from 'react';
import '../styles/Favoritos.scss';
import { FaPlus } from 'react-icons/fa';

const Favoritos = () => {
  const favoriteCities = [
    { name: 'Formosa', temperature: '25°C' },
    { name: 'Madrid', temperature: '30°C' },
    // Puedes agregar más ciudades aquí
  ];

  return (
    <div className="favoritos">
      <h1 className="title">Favoritos</h1>
      <div className="favorites-list">
        {favoriteCities.map((city, index) => (
          <div key={index} className="favorite-card">
            <h3>{city.name}</h3>
            <p>Temperatura: {city.temperature}</p>
          </div>
        ))}
        <div className="add-favorite-card">
          <FaPlus size={24} />
          <p>Añadir nuevo favorito</p>
        </div>
      </div>
    </div>
  );
};

export default Favoritos;
