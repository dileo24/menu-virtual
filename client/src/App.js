import { Routes, Route } from "react-router-dom";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";
import ModalLogin from "./components/ModalLogin";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Productos />} />
        <Route exact path="/nuevoProducto" element={<NuevoProducto />} />
        <Route exact path="/login" element={<ModalLogin />} />
        <Route exact path="/editarProducto" element={<EditarProducto />} />
      </Routes>
    </div>
  );
}

export default App;
