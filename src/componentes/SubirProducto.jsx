import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SubirProducto = () => {
  const { token } = useContext(AuthContext);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenFile, setImagenFile] = useState(null); // Guardar archivo (antes imagen como string)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Debes iniciar sesión para subir productos");
      return;
    }

    try {
      // Crear FormData para enviar texto + archivo
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("descripcion", descripcion);
      formData.append("precio", precio);
      formData.append("categoria", categoria);
      if (imagenFile) formData.append("imagen", imagenFile);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Importante para enviar archivo
        },
      };

      await axios.post("http://localhost:5000/api/productos", formData, config);
      alert("Producto creado con éxito");

      // Limpiar formulario
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoria("");
      setImagenFile(null);

      // Opcional: limpiar input file
      e.target.reset();
    } catch (error) {
      alert("Error creando producto");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      />
      <br />
      <button type="submit">Crear producto</button>
    </form>
  );
};

export default SubirProducto;


