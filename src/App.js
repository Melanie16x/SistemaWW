import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';
import NavbarNav from './components/NavbarNav';
import Sidebar from './components/Sidebar';
import Asistente from './pages/Asistente';
import Configuracion from './pages/Configuracion';
import Favoritos from './pages/Favoritos';
import Mapa from './pages/Mapa';
import PrevisionHoraria from './pages/PrevisionHoraria';
import PrevisionMensual from './pages/PrevisionMensual';
import Vida from './pages/Vida';
import Home from './pages/Home';
import { useState } from 'react';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Formosa'); // Valor inicial de búsqueda

  const handleSidebarToggle = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <NavbarNav onSidebarToggle={handleSidebarToggle} onSearch={handleSearch} />
      <div className="flex">
        <Sidebar isSidebarExpanded={isSidebarExpanded} />
        <div className={`content ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/prevHoraria" element={<PrevisionHoraria />} />
            <Route path="/prevMensual" element={<PrevisionMensual />} />
            <Route path="/vida" element={<Vida />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/asistente" element={<Asistente />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
