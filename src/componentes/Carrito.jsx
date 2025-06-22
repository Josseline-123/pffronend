import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Carrito() {
  const [items, setItems] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) cargarCarrito();
  }, [token]);

  const cargarCarrito = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/carrito', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error('Error al cargar el carrito:', err);
      setItems([]);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/carrito/${id}`, {
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
      return total + (precio * item.cantidad);
    }, 0);
  };

  const handleCheckout = () => {
    // Aquí puedes dirigir al usuario a la página de checkout
    navigate('/checkout');
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>

      {Array.isArray(items) && items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div>
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: '1rem' }}>
                <strong>{item.Producto?.nombre || 'Producto desconocido'}</strong><br />
                Precio unitario: ${item.Producto?.precio?.toFixed(2) || '0.00'}<br />
                Cantidad: {item.cantidad}<br />
                Subtotal: ${(item.Producto?.precio * item.cantidad).toFixed(2)}<br />
                <button onClick={() => eliminarProducto(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <hr />
          <h3>Total de la compra: ${calcularTotal().toFixed(2)}</h3>
          <button onClick={handleCheckout} style={{ marginTop: '1rem', padding: '10px 20px' }}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Carrito;







