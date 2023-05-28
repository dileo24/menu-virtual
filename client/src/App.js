import { Routes, Route } from "react-router-dom";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Productos />} />
        <Route exact path="/nuevoProducto" element={<NuevoProducto />} />
        <Route exact path="/editarProducto" element={<EditarProducto />} />
      </Routes>
    </div>
  );
}

export default App;
