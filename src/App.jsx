// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import PrivateRoute from './componentes/PrivateRoute';
import Navbar from './componentes/Navbar';
import Home from './componentes/Home';
import Productos from './componentes/Productos';
import Login from './componentes/Login';
import Register from './componentes/Register';
import SubirProducto from './componentes/SubirProducto';
import Perfil from './componentes/Perfil';
import EditarProducto from './componentes/EditarProducto';
import Carrito from './componentes/Carrito';
import Checkout from './componentes/Checkout';
import MisOrdenes from './componentes/MisOrdenes';
import Sidebar from './componentes/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

// Wrapper para mostrar Sidebar solo en /productos si hay token
function ProductosWrapper() {
  const { token } = useContext(AuthContext);

  return (
    <div style={{ display: 'flex' }}>
      {token && <Sidebar />}
      <div style={{ flex: 1, padding: '1rem' }}>
        <Productos />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas */}
          <Route path="/subir-producto" element={<PrivateRoute><SubirProducto /></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
          <Route path="/editar-producto/:id" element={<PrivateRoute><EditarProducto /></PrivateRoute>} />
          <Route path="/carrito" element={<PrivateRoute><Carrito /></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/mis-ordenes" element={<PrivateRoute><MisOrdenes /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
