import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import Carrusel from "./components/secciones/Carrusel";
import NuevoProducto from "./components/formularios/NuevoProducto";
import EditarProducto from "./components/formularios/EditarProducto";
import ModalLogin from "./components/formularios/Login";
import Historial from "./components/secciones/Historial";
import axios from "axios";
import { useSelector } from "react-redux";
import ModalRegister from "./components/formularios/Register";
import Usuarios from "./components/secciones/Usuarios";
import Pedidos from "./components/secciones/Pedidos";
// import Estadisticas from "./components/secciones/Estadisticas";
import Carrito from "./components/secciones/Carrito";
import ItemsCliente from "./components/secciones/ItemsCliente";
import UpdateItemsCliente from "./components/secciones/UpdateItemsCliente";
import AdminCateg from "./components/secciones/AdminCateg";
import MiPedido from "./components/secciones/MiPedido";
import HacerPedido from "./components/formularios/HacerPedido";
import EditarCateg from "./components/formularios/EditarCateg";
import EditarUsuario from "./components/formularios/EditarUsuario";
import { useNavigate } from "react-router-dom";

// Local
axios.defaults.baseURL = "http://localhost:3001";

// Deploy
// axios.defaults.baseURL = "https://menu-virtual-production-9dbc.up.railway.app";

function App() {
  const navigate = useNavigate();
  const userActual = useSelector((state) => state.userActual);

  useEffect(() => {
    // Función que se ejecutará cuando cambie el tamaño del viewport
    if (window.location.pathname === '/' || window.location.pathname === '/historial' || window.location.pathname === '/miPedido' || window.location.pathname === '/hacerPedido') {

      // Función para manejar el cambio de orientación
      const handleOrientationChange = () => {
        // Recargar la página
        window.location.pathname === '/' ? window.location.reload() : navigate('/');
      };
      // Agregar un controlador de eventos al evento orientationchange
      window.addEventListener('orientationchange', handleOrientationChange);
      // Limpieza: Eliminar el controlador de eventos cuando el componente se desmonta
      return () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
      };
    }
  }, []);

  const vertical = window.innerHeight > window.innerWidth;

  return (
    <div className="App">
      <Routes>
        {/* clientes */}
        {!userActual && (
          <><Route exact path="/" element={<Carrusel />} />
            <Route path="/login" element={<ModalLogin />} />
            {vertical && <>
              <Route exact path="/miPedido" element={<MiPedido />} />
              <Route exact path="/hacerPedido" element={<HacerPedido />} />
              <Route path="/historial" element={<Historial />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/items/:id" element={<ItemsCliente />} />
            </>
            }
            <Route
              path="/updateItems/:id/:index"
              element={<UpdateItemsCliente />}
            /></>
        )}


        {/* empleados */}
        {userActual && userActual.data.RolId <= 3 && (
          <Route path="/pedidos" element={<Pedidos />} />
        )}
        {/* admins */}
        {userActual && userActual.data.RolId <= 2 && (
          <>
            <Route exact path="/" element={<Carrusel />} />
            <Route path="/nuevoProducto" element={<NuevoProducto />} />
            <Route path="/editarProducto" element={<EditarProducto />} />
            <Route path="/adminCateg" element={<AdminCateg />} />
            <Route path="/editCateg/:id" element={<EditarCateg />} />
          </>
        )}
        {/* superAdmin */}
        {userActual && userActual.data.RolId === 1 && (
          <>
            <Route path="/register" element={<ModalRegister />} />
            <Route path="/Usuarios" element={<Usuarios />} />
            {/* <Route path="/estadisticas" element={<Estadisticas />} /> */}
            <Route path="/editarUsuario/:id" element={<EditarUsuario />} />
          </>
        )}

      </Routes>
    </div>
  );
}

export default App;
