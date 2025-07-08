import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const styles = {
  page: {
    display: 'flex',
    padding: '2rem',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: '1rem',
  },
  card: {
    width: '250px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  description: {
    fontSize: '0.9rem',
    color: '#555',
    margin: '0.5rem 0',
  },
  price: {
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: '0.5rem',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

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
    <div style={styles.page}>
      {token && <Sidebar />}

      <div style={styles.content}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Productos</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
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
              <div key={producto.id} style={styles.card}>
                <img
                  src={imagenUrl}
                  alt={producto.nombre || 'Producto'}
                  style={styles.image}
                />
                <h5 style={styles.title}>{producto.nombre}</h5>
                <p style={styles.description}>{producto.descripcion}</p>
                <p style={styles.price}>{precioFormateado}</p>
                <button
                  style={styles.button}
                  onClick={() => agregarAlCarrito(producto.id)}
                >
                  Agregar al carrito
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Productos;









