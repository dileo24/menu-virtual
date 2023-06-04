import { Routes, Route } from "react-router-dom";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";
import ModalLogin from "./components/ModalLogin";
import axios from "axios";
import { useSelector } from "react-redux";
import ModalRegister from "./components/ModalRegister";
import Usuarios from "./components/Usuarios";
import Carrito from "./components/Carrito";
import Pedidos from "./components/Pedidos";

// Local
//axios.defaults.baseURL = "http://localhost:3001";

// Deploy
axios.defaults.baseURL = "https://menu-virtual-production-9dbc.up.railway.app";

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
