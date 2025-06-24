import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { token } = useContext(AuthContext);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    if (token) cargarCarrito();
  }, [token]);

  const cargarCarrito = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/carrito`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        setCarrito(res.data);

        const totalCalculado = res.data.reduce((sum, item) => {
          const precio = item.Producto?.precio || 0;
          return sum + precio * item.cantidad;
        }, 0);

        setTotal(totalCalculado);
      }
    } catch (error) {
      console.error('❌ Error al cargar el carrito:', error);
    }
  };

  const confirmarCompra = async () => {
    try {
      const productos = carrito.map((item) => ({
        productoId: item.Producto.id,
        cantidad: item.cantidad,
      }));

      const orden = { productos, total };

      // Crear la orden
      await axios.post(`${API_URL}/api/ordenes`, orden, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Vaciar el carrito en el backend
      await axios.delete(`${API_URL}/api/carrito`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Vaciar el carrito en el frontend
      setCarrito([]);
      setTotal(0);

      alert('✅ Compra realizada con éxito');
      navigate('/mis-ordenes');
    } catch (error) {
      console.error('❌ Error al confirmar compra:', error.response?.data || error);
      alert('❌ Error al realizar la compra');
    }
  };

  return (
    <div>
      <h2>Resumen de Compra</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div>
          <ul>
            {carrito.map((item) => (
              <li key={item.id}>
                {item.Producto?.nombre} - Cantidad: {item.cantidad} - Precio: ${item.Producto?.precio}
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={confirmarCompra}>Confirmar compra</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;



