import React from "react";

function Producto({ producto }) {
  if (!producto) return null;
  
  console.log("Producto completo:", producto);
  console.log("Imagen del producto:", producto.imagen);

  

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      {producto.imagen && (
        <img
          src={`http://localhost:5000/uploads/${producto.imagen}`}
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








