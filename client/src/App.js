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
import ItemsCliente from "./components/secciones/ItemsCliente";
import UpdateItemsCliente from "./components/secciones/UpdateItemsCliente";
import AdminCateg from "./components/secciones/AdminCateg";
import NuevaCateg from "./components/formularios/NuevaCateg";
import Subcategs from "./components/formularios/Subcategs";
import MiPedido from "./components/secciones/MiPedido";
import HacerPedido from "./components/secciones/HacerPedido";
import EditarCateg from "./components/formularios/EditarCateg";

// Local
// axios.defaults.baseURL = "http://localhost:3001";

// Deploy
axios.defaults.baseURL = "https://menu-virtual-production-9dbc.up.railway.app";

function App() {
  const userActual = useSelector((state) => state.userActual);

  return (
    <div className="App">
      <Routes>
        {/* cualquiera */}
        <Route exact path="/" element={<Carrusel />} />
        <Route exact path="/miPedido" element={<MiPedido />} />
        <Route exact path="/hacerPedido" element={<HacerPedido />} />
        <Route path="/login" element={<ModalLogin />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/items/:id" element={<ItemsCliente />} />
        <Route
          path="/updateItems/:id/:index"
          element={<UpdateItemsCliente />}
        />

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
            <Route path="/subcategs" element={<Subcategs />} />
            <Route path="/adminCateg" element={<AdminCateg />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/editCateg/:id" element={<EditarCateg />} />
          </>
        )}
        {/* admins */}
        {userActual && userActual.data.RolId === 2 && (
          <>
            <Route path="/nuevoProducto" element={<NuevoProducto />} />
            <Route path="/editarProducto" element={<EditarProducto />} />
            <Route path="/nuevaCateg" element={<NuevaCateg />} />
            <Route path="/adminCateg" element={<AdminCateg />} />
            <Route path="/editCateg/:id" element={<EditarCateg />} />
            <Route path="/pedidos" element={<Pedidos />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;