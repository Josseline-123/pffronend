import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirige al login tras cerrar sesión
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default LogoutButton;




