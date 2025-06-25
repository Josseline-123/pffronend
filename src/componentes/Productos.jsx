import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';
import './Productos.css';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function Productos() {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  // Función para obtener productos desde backend
  const obtenerProductos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/productos`);
      setProductos(response.data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError('No se pudieron cargar los productos');
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div className="productos-page">
      {token && <Sidebar />}

      <div className="productos-content">
        <h2 className="text-center mb-4">Productos</h2>

        {error && <p className="error">{error}</p>}

        <div className="productos-list">
          {productos.length === 0 && !error && <p>No hay productos para mostrar.</p>}
          {productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              {producto.imagen && (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-imagen"
                />
              )}
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p><strong>Precio:</strong> ${producto.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productos;



