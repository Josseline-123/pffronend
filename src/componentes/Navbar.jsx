import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const { token, user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success px-4">
      <Link to="/" className="navbar-brand d-flex align-items-center text-white">
       <img
  src="/img/logo.png"
  alt="Logo"
  style={{
    width: "40px",
    height: "40px",
    marginRight: "10px",
    borderRadius: "50%", // <-- Esto lo hace redondo
    objectFit: "cover",   // Asegura que no se distorsione
    backgroundColor: "white" // Opcional: fondo blanco si tu logo tiene fondo transparente
  }}
/>

        <span className="fs-4 fw-bold">BestPet</span>
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">
        <Link className="text-white text-decoration-none" to="/">Inicio</Link>
        {!token ? (
          <>
            <Link className="text-white text-decoration-none" to="/login">Login</Link>
            <Link className="text-white text-decoration-none" to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link className="text-white text-decoration-none" to="/productos">Productos</Link>
            <Link className="text-white text-decoration-none" to="/carrito">Carrito</Link>
            <span className="text-white">Hola, {user?.nombre || "Usuario"}</span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
