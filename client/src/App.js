import { Routes, Route } from "react-router-dom";
import Platillos from "./components/Platillos";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Platillos />} />
      </Routes>
    </div>
  );
}

export default App;
