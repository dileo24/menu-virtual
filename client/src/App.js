import { Routes, Route } from "react-router-dom";
import Platillos from "./components/Platillos";
import NuevoPlatillo from "./components/NuevoPlatillo";
import EditarPlatillo from "./components/EditarPlatillo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Platillos />} />
        <Route exact path="/nuevoPlatillo" element={<NuevoPlatillo />} />
        <Route exact path="/editarPlatillo" element={<EditarPlatillo />} />
      </Routes>
    </div>
  );
}

export default App;
