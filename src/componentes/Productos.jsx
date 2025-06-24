import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';
import './Productos.css';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function Productos() {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  /* ... resto de estados y lógica ... */

  useEffect(() => {
    obtenerProductos();
  }, []);

  /* ... tus funciones obtenerProductos, filtrarProductos, agregarAlCarrito, etc. ... */

  return (
    <div className="productos-page">
      {/* Solo muestro el sidebar si hay token */}
      {token && <Sidebar />}

      <div className="productos-content">
        <h2 className="text-center mb-4">Productos</h2>
        {/* Aquí va tu JSX de filtros y listado de cards */}
      </div>
    </div>
  );
}

export default Productos;






