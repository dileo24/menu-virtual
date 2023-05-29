import { Routes, Route } from "react-router-dom";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";
import ModalLogin from "./components/ModalLogin";
import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const userActual = useSelector((state) => state.userActual);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Productos />} />
        {userActual &&
        (userActual.data.RolId === 1 || userActual.data.RolId === 2) ? (
          <Route exact path="/nuevoProducto" element={<NuevoProducto />} />
        ) : (
          //hacer una página para cuando no se tiene permiso de ingresar
          ""
        )}
        <Route exact path="/login" element={<ModalLogin />} />
        <Route exact path="/editarProducto" element={<EditarProducto />} />
      </Routes>
    </div>
  );
}

export default App;
