import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// URL base para el backend
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const Perfil = () => {
  const { user, token } = useContext(AuthContext);
  const [misProductos, setMisProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Si no hay token ni usuario, no hace la petición
    if (!token || !user) {
      setLoading(false);
      return;
    }

    const fetchMisProductos = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/productos/mios`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMisProductos(res.data);
      } catch (err) {
        console.error('Error al obtener tus productos:', err);
        setError('No se pudieron cargar tus productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchMisProductos();
  }, [token, user]);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;

    try {
      await axios.delete(`${BASE_URL}/api/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMisProductos(misProductos.filter(p => p.id !== id));
      alert('Producto eliminado exitosamente');
    } catch (err) {
      alert('Error eliminando el producto');
      console.error(err);
    }
  };

  const handleEditar = (id) => {
    navigate(`/editar-producto/${id}`);
  };

  if (!user || !token) return <p>Debes iniciar sesión para ver tu perfil.</p>;
  if (loading) return <p>Cargando tus productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="perfil-container" style={{ padding: '2rem' }}>
      <h2>Mi perfil</h2>
      <p><strong>Nombre:</strong> {user?.nombre || user?.name || 'Sin nombre'}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3 style={{ marginTop: '2rem' }}>Mis productos</h3>
      {misProductos.length === 0 ? (
        <p>No has subido productos todavía.</p>
      ) : (
        <ul>
          {misProductos.map((producto) => (
            <li key={producto.id} style={{ marginBottom: '1rem' }}>
              <strong>{producto.nombre}</strong> - ${producto.precio}<br />
              <em>{producto.descripcion}</em><br />
              <button style={{ marginRight: '0.5rem' }} onClick={() => handleEditar(producto.id)}>Editar</button>
              <button onClick={() => handleEliminar(producto.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Perfil;


