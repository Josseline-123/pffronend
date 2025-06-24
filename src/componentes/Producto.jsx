const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function Producto({ producto }) {
  if (!producto) return null;

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      {producto.imagen && (
        <img
          src={`${BASE_URL}/uploads/${producto.imagen}`}
          alt={producto.nombre}
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{producto.descripcion}</p>
        <p className="card-text"><strong>${producto.precio}</strong></p>
      </div>
    </div>
  );
}

export default Producto;








