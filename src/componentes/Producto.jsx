import React from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const styles = {
  card: {
    width: "18rem",
    margin: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  body: {
    padding: "1rem",
    textAlign: "center",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  price: {
    color: "#28a745",
    fontWeight: "bold",
  },
};

function Producto({ producto }) {
  if (!producto) return null;

  const imagenUrl = producto.imagen && !producto.imagen.startsWith('http')
    ? `${BASE_URL}${producto.imagen}`
    : producto.imagen;

  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(producto.precio);

  return (
    <div style={styles.card}>
      {imagenUrl && (
        <img
          src={imagenUrl}
          alt={producto.nombre}
          style={styles.image}
        />
      )}
      <div style={styles.body}>
        <h5 style={styles.title}>{producto.nombre}</h5>
        <p>{producto.descripcion}</p>
        <p style={styles.price}>{precioFormateado}</p>
      </div>
    </div>
  );
}

export default Producto;










