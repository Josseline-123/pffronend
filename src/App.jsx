import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './componentes/PrivateRoute';
import Navbar from './componentes/Navbar';
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
import ProtectedLayout from './componentes/ProtectedLayout'; // nuevo layout
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './componentes/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
           <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          



          {/* Rutas protegidas con layout lateral */}
          <Route element={<PrivateRoute><ProtectedLayout /></PrivateRoute>}>
            <Route path="/subir-producto" element={<SubirProducto />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/editar-producto/:id" element={<EditarProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/mis-ordenes" element={<MisOrdenes />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



