import React, { useState } from 'react';
import "../styles/Navbar.scss";
import * as FaIcons from "react-icons/fa6";
import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  Input,
  Button
} from 'reactstrap';

const NavbarNav = ({ onSidebarToggle, onSearch }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    const newState = !isSidebarExpanded;
    setIsSidebarExpanded(newState);
    onSidebarToggle(newState);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery('');  // Limpiar el campo de búsqueda después de la búsqueda
  };

  return (
    <div>
      <Navbar>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <FaIcons.FaBurger />
        </div>
        <NavbarBrand href="/">WeatherWatch</NavbarBrand>
        <Nav className="ms-auto" navbar>
          <div className="nav-item-container">
            <div className="search-container">
              <Input
                type="search"
                placeholder="Buscar ciudad o país"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <Button color="primary" onClick={handleSearch}>Buscar</Button>
            </div>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav className="user-dropdown">
                Acuña Melanie
              </DropdownToggle>
            </UncontrolledDropdown>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarNav;
