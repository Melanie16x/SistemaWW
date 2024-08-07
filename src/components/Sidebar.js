import React from 'react';
import { NavLink } from 'react-router-dom';
import * as FaIcons from "react-icons/fa6";
import '../styles/Sidebar.scss'; // Importa el archivo SCSS

const Sidebar = ({ isSidebarExpanded }) => {
  return (
    <div className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
      <ul>
        <li>
          <NavLink to="/" className='rounded py-2 w-100 d-inline-block px-3' >
            <FaIcons.FaHouse className='me-2' />
            {isSidebarExpanded && 'Inicio'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/mapa" className='rounded py-2 w-100 d-inline-block px-3' >
            <FaIcons.FaMap className='me-2' />
            {isSidebarExpanded && 'Mapa'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/prevHoraria" className='rounded py-2 w-100 d-inline-block px-3' >
            <FaIcons.FaClock className='me-2' />
            {isSidebarExpanded && 'Previsión por hora'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/prevMensual" className='rounded py-2 w-100 d-inline-block px-3' >
            <FaIcons.FaCalendarDays  className='me-2' />
            {isSidebarExpanded && 'Previsión mensual'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/vida" className='rounded py-2 w-100 d-inline-block px-3' >
            <FaIcons.FaChild className='me-2' />
            {isSidebarExpanded && 'Vida'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/favoritos" className='rounded py-2 w-100 d-inline-block px-3' >
            <FaIcons.FaHeart className='me-2' />
            {isSidebarExpanded && 'Favoritos'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/asistente" className='rounded py-2 w-100 d-inline-block px-3' >
            <FaIcons.FaFaceGrinWide className='me-2' />
            {isSidebarExpanded && 'Asistente'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/configuracion" className='rounded py-2 w-100 d-inline-block px-3' >
            <FaIcons.FaGear className='me-2' />
            {isSidebarExpanded && 'Configuración'}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
