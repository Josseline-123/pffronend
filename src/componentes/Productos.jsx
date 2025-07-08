import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function Productos() {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/productos`);
      setProductos(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError('No se pudieron cargar los productos');
    }
  };

  const agregarAlCarrito = async (productoId) => {
    try {
      await axios.post(
        `${BASE_URL}/api/carrito`,
        { productoId, cantidad: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Producto agregado al carrito');
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      alert('Debes iniciar sesión para agregar al carrito');
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
          {productos.length === 0 && !error && (
            <p>No hay productos para mostrar.</p>
          )}

          {productos.map((producto) => {
            if (!producto) return null;

            const imagenUrl =
              producto.imagen && !producto.imagen.startsWith('http')
                ? `${BASE_URL}${producto.imagen}`
                : producto.imagen || 'https://via.placeholder.com/200';

            const precioFormateado = new Intl.NumberFormat('es-CL', {
              style: 'currency',
              currency: 'CLP',
            }).format(producto.precio || 0);

            return (
              <div key={producto.id} className="producto-card">
                <img
                  src={imagenUrl}
                  alt={producto.nombre || 'Producto'}
                  className="producto-imagen"
                />
                <div className="producto-body">
                  <h5 className="producto-titulo">{producto.nombre}</h5>
                  <p className="producto-descripcion">{producto.descripcion}</p>
                  <p className="producto-precio">{precioFormateado}</p>
                  <button
                    className="boton-agregar-carrito"
                    onClick={() => agregarAlCarrito(producto.id)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Productos;








