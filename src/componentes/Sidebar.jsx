import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Sidebar.css'; // Creamos este archivo más abajo

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h3>Menú</h3>
      <ul>
         
        <li><Link to="/subir-producto">🛒 Subir producto</Link></li>
        <li><Link to="/perfil">👤 Perfil</Link></li>
        <li><button onClick={handleLogout}>🚪 Cerrar sesión</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
