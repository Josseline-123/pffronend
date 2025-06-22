import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthBackground.css'; // Reutilizamos el mismo estilo que el login

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        nombre,
        email,
        password,
      });

      const { token, user } = response.data;
      login({ token, user });
      setError('');
    } catch (err) {
      console.error('Error en el registro:', err);

      if (err.response?.status === 400) {
        const mensaje = err.response.data?.message || 'Error desconocido';
        if (mensaje === 'El email ya está registrado') {
          setError('Ya existe una cuenta con este correo electrónico');
        } else {
          setError(mensaje);
        }
      } else {
        setError('Hubo un problema al registrarse. Intenta nuevamente.');
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/perfil');
    }
  }, [user, navigate]);

  return (
    <div className="auth-background">
      <div className="auth-form-container">
        <h2>Registro</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;




