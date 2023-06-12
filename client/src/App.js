import { Routes, Route } from "react-router-dom";
import Menu from "./components/secciones/Menu";
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

// Local
axios.defaults.baseURL = "http://localhost:3001";

// Deploy
// axios.defaults.baseURL = "https://menu-virtual-production-9dbc.up.railway.app";

function App() {
  const userActual = useSelector((state) => state.userActual);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Menu />} />
        {userActual &&
          (userActual.data.RolId === 1 || userActual.data.RolId === 2) && (
            <>
              <Route path="/nuevoProducto" element={<NuevoProducto />} />
              <Route path="/editarProducto" element={<EditarProducto />} />
              <Route path="/pedidos" element={<Pedidos />} />
            </>
          )}
        {userActual && userActual.data.RolId === 1 && (
          <>
            <Route path="/register" element={<ModalRegister />} />
            <Route path="/Usuarios" element={<Usuarios />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
          </>
        )}
        <Route path="/login" element={<ModalLogin />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </div>
  );
}

export default App;
