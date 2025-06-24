import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const SubirProducto = () => {
  const { token } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenFile, setImagenFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Debes iniciar sesión para subir productos");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("descripcion", descripcion);
      formData.append("precio", precio);
      formData.append("categoria", categoria);
      if (imagenFile) formData.append("imagen", imagenFile);

      await axios.post(`${BASE_URL}/api/productos`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Producto creado con éxito");

      // Limpiar campos
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoria("");
      setImagenFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      navigate("/perfil");
    } catch (error) {
      console.error("❌ Error creando producto:", error.response?.data || error);
      alert("Error al crear producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem", maxWidth: "400px" }}>
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
  );
};

export default SubirProducto;


