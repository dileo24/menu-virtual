import { Routes, Route } from "react-router-dom";
import Productos from "./components/secciones/Menu";
import NuevoProducto from "./components/formularios/NuevoProducto";
import EditarProducto from "./components/formularios/EditarProducto";
import ModalLogin from "./components/formularios/ModalLogin";
import axios from "axios";
import { useSelector } from "react-redux";
import ModalRegister from "./components/formularios/ModalRegister";
import Usuarios from "./components/secciones/Usuarios";
import Carrito from "./components/formularios/Carrito";
import Pedidos from "./components/secciones/Pedidos";

// Local
axios.defaults.baseURL = "http://localhost:3001";

// Deploy
//axios.defaults.baseURL = "https://menu-virtual-production-9dbc.up.railway.app";

function App() {
  const userActual = useSelector((state) => state.userActual);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Productos />} />
        {userActual &&
          (userActual.data.RolId === 1 || userActual.data.RolId === 2) ? (
          <>
            <Route path="/nuevoProducto" element={<NuevoProducto />} />
            <Route path="/editarProducto" element={<EditarProducto />} />
            <Route path="/pedidos" element={<Pedidos />} />
          </>
        ) : (
          <Route path="/carrito" element={<Carrito />} />
        )}
        {userActual && userActual.data.RolId === 1 && (
          <>
            <Route path="/register" element={<ModalRegister />} />
            <Route path="/Usuarios" element={<Usuarios />} />
          </>
        )}
        <Route path="/login" element={<ModalLogin />} />
      </Routes>
    </div>
  );
}

export default App;
