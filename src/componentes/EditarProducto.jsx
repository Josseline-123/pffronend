import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/productos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducto(res.data);
      } catch (err) {
        console.error('❌ Error al cargar el producto:', err);
      } finally {
        setCargando(false);
      }
    };

    fetchProducto();
  }, [id, token, BASE_URL]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('descripcion', producto.descripcion);
      formData.append('precio', producto.precio);
      formData.append('categoria', producto.categoria);
      if (imagenFile) {
        formData.append('imagen', imagenFile); // solo si hay nueva imagen
      }

      await axios.put(`${BASE_URL}/api/productos/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Producto actualizado con éxito');
      navigate('/perfil');
    } catch (err) {
      console.error('❌ Error al actualizar producto:', err.response?.data || err);
      alert('Error al guardar los cambios.');
    }
  };

  if (cargando) return <p>Cargando producto...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Nombre:</label><br />
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label><br />
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio:</label><br />
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label>Categoría:</label><br />
          <input
            type="text"
            name="categoria"
            value={producto.categoria || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nueva imagen (opcional):</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagenFile(e.target.files[0])}
            ref={fileInputRef}
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;

