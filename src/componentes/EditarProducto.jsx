import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/productos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducto(res.data);
        setCargando(false);
      } catch (err) {
        console.error('Error al cargar el producto', err);
        setCargando(false);
      }
    };

    fetchProducto();
  }, [id, token]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/productos/${id}`, producto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/perfil');
    } catch (err) {
      console.error('Error al actualizar producto', err);
    }
  };

  if (cargando) return <p>Cargando producto...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br />
          <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} />
        </div>
        <div>
          <label>Descripción:</label><br />
          <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} />
        </div>
        <div>
          <label>Precio:</label><br />
          <input type="number" name="precio" value={producto.precio} onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
