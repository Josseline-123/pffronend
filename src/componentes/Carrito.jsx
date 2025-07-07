import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Carrito.css';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function Carrito() {
  const [items, setItems] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      cargarCarrito();
    }
  }, [token]);

  const cargarCarrito = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/carrito`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al cargar el carrito:', err);
      setItems([]);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/carrito/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarCarrito();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
    }
  };

  const calcularTotal = () => {
    return items.reduce((total, item) => {
      const precio = item.Producto?.precio || 0;
      return total + precio * item.cantidad;
    }, 0);
  };

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>

      {items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div>
          <ul className="carrito-lista">
            {items.map((item) => {
              const producto = item.Producto || {};
              const vendedor = producto.vendedor || {}; // ✅ alias correcto

              return (
                <li key={item.id} className="carrito-item">
                  <strong>{producto.nombre || 'Producto desconocido'}</strong><br />
                  Precio unitario: ${producto.precio?.toFixed(0) || '0'}<br />
                  Cantidad: {item.cantidad}<br />
                  Subtotal: ${(producto.precio * item.cantidad).toFixed(0)}<br /><br />

                  <span><strong>Vendedor:</strong> {vendedor.nombre || 'Sin datos'}</span><br />
                  <span><strong>Email:</strong> {vendedor.email || 'Sin datos'}</span><br /><br />

                  <button className="boton-eliminar" onClick={() => eliminarProducto(item.id)}>
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>
          <hr />
          <h3>Total de la compra: ${calcularTotal().toFixed(0)}</h3>
          <p>Gracias por su compra. Contacte directamente a los vendedores para coordinar el pago y la entrega.</p>
        </div>
      )}
    </div>
  );
}

export default Carrito;

