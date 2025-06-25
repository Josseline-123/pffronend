import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const SubirProducto = () => {
  const { token, user } = useContext(AuthContext); // Asegúrate de tener user en el contexto
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenFile, setImagenFile] = useState(null);

  const [productoCreado, setProductoCreado] = useState(null);
  const [verInfo, setVerInfo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Debes iniciar sesión para subir productos");
      return;
    }

    const precioNumero = parseFloat(precio);
    if (isNaN(precioNumero) || precioNumero <= 0) {
      alert("Por favor ingresa un precio válido mayor a 0");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("descripcion", descripcion);
      formData.append("precio", precioNumero);
      formData.append("categoria", categoria);
      if (imagenFile) formData.append("imagen", imagenFile);

      const response = await axios.post(`${BASE_URL}/api/productos`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Producto creado con éxito");

      // Guardamos el producto en estado
      setProductoCreado(response.data);

      // Limpiar campos
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoria("");
      setImagenFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("❌ Error creando producto:", error.response?.data || error);
      alert("Error al crear producto");
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px" }}>
      <form onSubmit={handleSubmit}>
        <h2>Subir producto</h2>

        <label>Nombre:</label><br />
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        /><br /><br />

        <label>Descripción:</label><br />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        /><br /><br />

        <label>Precio:</label><br />
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          min="0.01"
          step="0.01"
          required
        /><br /><br />

        <label>Categoría:</label><br />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="perros">Perros</option>
          <option value="gatos">Gatos</option>
          <option value="otras-mascotas">Otras mascotas</option>
        </select><br /><br />

        <label>Imagen:</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagenFile(e.target.files[0])}
          ref={fileInputRef}
          required
        /><br /><br />

        <button type="submit">Crear producto</button>
      </form>

      {/* Mostrar mensaje si se creó un producto */}
      {productoCreado && (
        <div style={{ marginTop: "2rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
          <p>🎉 Producto "<strong>{productoCreado.nombre}</strong>" creado correctamente.</p>
          <button onClick={() => setVerInfo(!verInfo)}>
            {verInfo ? "Ocultar datos del vendedor" : "Ver más"}
          </button>

          {verInfo && user && (
            <div style={{ marginTop: "1rem", backgroundColor: "#f0f0f0", padding: "1rem" }}>
              <p><strong>📧 Correo:</strong> {user.email}</p>
          
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubirProducto;
