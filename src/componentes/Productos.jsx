import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

// Variable base para la URL del backend
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';



function Productos() {
  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const { token } = useContext(AuthContext);

  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');

  useEffect(() => {
    obtenerProductos();
  }, []);

  // Obtener todos los productos
  const obtenerProductos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/productos`);
      setProductos(res.data);
    } catch (err) {
      console.error('❌ Error al cargar productos:', err);
    }
  };

  // Filtrar productos según filtros
  const filtrarProductos = async () => {
    try {
      const params = {};
      if (categoriaFiltro) params.categoria = categoriaFiltro;
      if (precioMin) params.precioMin = precioMin;
      if (precioMax) params.precioMax = precioMax;

      const res = await axios.get(`${BASE_URL}/api/productos/filtro`, { params });
      setProductos(res.data);
    } catch (err) {
      console.error('❌ Error al filtrar productos:', err);
      alert('No se pudieron filtrar los productos. Verifica la ruta /api/productos/filtro');
    }
  };

  // Manejar cambio en cantidad con mínimo 1
  const handleCantidadChange = (productoId, nuevaCantidad) => {
    const cantidadVal = Number(nuevaCantidad);
    setCantidades(prev => ({
      ...prev,
      [productoId]: cantidadVal > 0 ? cantidadVal : 1,
    }));
  };

  // Agregar producto al carrito
  const agregarAlCarrito = async (productoId) => {
    if (!token) {
      alert('Debes iniciar sesión para agregar al carrito');
      return;
    }

    const cantidad = cantidades[productoId] || 1;

    try {
      await axios.post(`${BASE_URL}/api/carrito`, { productoId, cantidad }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Agregado ${cantidad} al carrito`);
    } catch (err) {
      console.error('❌ Error al agregar al carrito:', err);
      alert('Hubo un error al agregar al carrito');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Productos</h2>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-3">
          <select
            className="form-select"
            value={categoriaFiltro}
            onChange={e => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="perros">Perros</option>
            <option value="gatos">Gatos</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Precio mínimo"
            min="0"
            value={precioMin}
            onChange={e => setPrecioMin(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Precio máximo"
            min="0"
            value={precioMax}
            onChange={e => setPrecioMax(e.target.value)}
          />
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button className="btn btn-success w-50" onClick={filtrarProductos}>Filtrar</button>
          <button
            className="btn btn-secondary w-50"
            onClick={() => {
              setCategoriaFiltro('');
              setPrecioMin('');
              setPrecioMax('');
              obtenerProductos();
            }}
          >
            Ver todos
          </button>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="row">
        {productos.length > 0 ? productos.map(producto => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {producto.imagen && (
                <img
                  src={`${BASE_URL}/uploads/${producto.imagen}`}
                  alt={producto.nombre}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text"><strong>${producto.precio}</strong></p>

                <div className="mt-auto">
                  <label>
                    Cantidad:
                    <input
                      type="number"
                      min="1"
                      value={cantidades[producto.id] || 1}
                      onChange={e => handleCantidadChange(producto.id, e.target.value)}
                      className="form-control"
                      style={{ width: '80px', display: 'inline-block', marginLeft: '8px' }}
                    />
                  </label>

                  <button
                    onClick={() => agregarAlCarrito(producto.id)}
                    className="btn btn-primary mt-3 w-100"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Productos;




