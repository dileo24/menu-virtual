import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos, searchXcategoria, searchXname } from "../redux/actions";
export default function Filtros() {
  const categorias = useSelector((state) => state.categorias);
  const [state, setState] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const dispatch = useDispatch();

  const handlerRecargar = (e) => {
    dispatch(getProductos());
    setFiltroCategoria("todas");
  };

  const handlerFilterCateg = (e) => {
    const categoria = e.target.value;
    setFiltroCategoria(categoria);
    dispatch(searchXcategoria(categoria));
  };

  const handleState = (e) => {
    setState(e.target.value);
  };

  const limpiarState = () => {
    dispatch(searchXname(state));
    setState("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      limpiarState();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Buscar ..."
          onChange={handleState}
          onKeyDown={handleKeyDown}
          value={state}
        />
        <button style={{ backgroundColor: "grey" }} onClick={limpiarState}>
          Buscar...
        </button>
      </div>
      <button style={{ backgroundColor: "grey" }} onClick={handlerRecargar}>
        Limpiar filtros/búsquedas
      </button>
      <select value={filtroCategoria} onChange={(e) => handlerFilterCateg(e)}>
        <option value="todas" hidden>
          Todos los Productos
        </option>
        {categorias.map((categ) => (
          <option key={categ.id} value={categ.nombre}>
            {categ.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
