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

// Wrapper para /productos que añade sidebar solo si hay token
function ProductosWrapper() {
  const { token } = useContext(AuthContext);
  return (
    <div style={{ display: 'flex' }}>
      {token && <Sidebar />}
      <div style={{ flexGrow: 1 }}>
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

          {/* Rutas protegidas */}
          <Route path="/subir-producto" element={
            <PrivateRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flexGrow: 1 }}><SubirProducto /></div>
              </div>
            </PrivateRoute>
          }/>
          <Route path="/perfil" element={
            <PrivateRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flexGrow: 1 }}><Perfil /></div>
              </div>
            </PrivateRoute>
          }/>
          <Route path="/editar-producto/:id" element={
            <PrivateRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flexGrow: 1 }}><EditarProducto /></div>
              </div>
            </PrivateRoute>
          }/>
          <Route path="/carrito" element={
            <PrivateRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flexGrow: 1 }}><Carrito /></div>
              </div>
            </PrivateRoute>
          }/>
          <Route path="/checkout" element={
            <PrivateRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flexGrow: 1 }}><Checkout /></div>
              </div>
            </PrivateRoute>
          }/>
          <Route path="/mis-ordenes" element={
            <PrivateRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flexGrow: 1 }}><MisOrdenes /></div>
              </div>
            </PrivateRoute>
          }/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
