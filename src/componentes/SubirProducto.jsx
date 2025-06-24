import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const SubirProducto = () => {
  const { token } = useContext(AuthContext);
  const fileInputRef = useRef(null);

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

      alert("Producto creado con éxito");

      // Limpiar estado
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoria("");
      setImagenFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("❌ Error creando producto:", error);
      alert("Error creando producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem", maxWidth: "400px" }}>
      <h2>Subir producto</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <br />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <br />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <br />

      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        required
      >
        <option value="">Selecciona una categoría</option>
        <option value="perros">Perros</option>
        <option value="gatos">Gatos</option>
      </select>
      <br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagenFile(e.target.files[0])}
        ref={fileInputRef}
      />
      <br />

      <button type="submit">Crear producto</button>
    </form>
  );
};

export default SubirProducto;



