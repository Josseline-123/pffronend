const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function Producto({ producto }) {
  if (!producto) return null;

  // Asegurarse que la URL de la imagen sea absoluta
  const imagenUrl = producto.imagen && !producto.imagen.startsWith('http')
    ? `${BASE_URL}${producto.imagen}`
    : producto.imagen;

  // Formatear precio a moneda local (CLP)
  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(producto.precio);

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      {imagenUrl && (
        <img
          src={imagenUrl}
          alt={producto.nombre}
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{producto.descripcion}</p>
        <p className="card-text"><strong>{precioFormateado}</strong></p>
      </div>
    </div>
  );
}

export default Producto;










