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
import Estadisticas from "./components/secciones/Estadisticas";
import Carrito from "./components/secciones/Carrito";
import Items from "./components/secciones/Items";
import NuevaCateg from "./components/formularios/NuevaCateg";

// Local
/* axios.defaults.baseURL = "http://localhost:3001"; */

// Deploy
axios.defaults.baseURL = "https://menu-virtual-production-9dbc.up.railway.app";

function App() {
  const userActual = useSelector((state) => state.userActual);

  return (
    <div className="App">
      <Routes>
        {/* cualquiera */}
        <Route exact path="/" element={<Carrusel />} />
        <Route path="/login" element={<ModalLogin />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/items/:id" element={<Items />} />
        {/* empleados */}
        {userActual && userActual.data.RolId === 3 && (
          <Route path="/pedidos" element={<Pedidos />} />
        )}
        {/* admins */}
        {userActual && userActual.data.RolId === 1 && (
          <>
            <Route path="/nuevoProducto" element={<NuevoProducto />} />
            <Route path="/editarProducto" element={<EditarProducto />} />
            <Route path="/register" element={<ModalRegister />} />
            <Route path="/Usuarios" element={<Usuarios />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/nuevaCateg" element={<NuevaCateg />} />
            <Route path="/pedidos" element={<Pedidos />} />
          </>
        )}
        {/* admins */}
        {userActual && userActual.data.RolId === 2 && (
          <>
            <Route path="/nuevoProducto" element={<NuevoProducto />} />
            <Route path="/editarProducto" element={<EditarProducto />} />
            <Route path="/nuevaCateg" element={<NuevaCateg />} />
            <Route path="/pedidos" element={<Pedidos />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
