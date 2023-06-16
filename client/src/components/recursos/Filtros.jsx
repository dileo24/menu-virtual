import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategorias,
  getProductos,
  searchXcategoria,
  searchXname,
} from "../../redux/actions";
// import { FaSistrix } from "react-icons/fa";

export default function Filtros() {
  const categorias = useSelector((state) => state.categorias);
  const [state, setState] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const handleRecargar = () => {
    dispatch(getProductos());
    setFiltroCategoria("todas");
  };

  const handleFilterCateg = (e) => {
    const selectedCategoria = e.target.value;
    setFiltroCategoria(selectedCategoria);
    if (selectedCategoria === "todas") {
      dispatch(getProductos());
    } else {
      dispatch(searchXcategoria(selectedCategoria));
    }
  };

  const handleState = (e) => {
    setState(e.target.value);
  };

  const limpiarState = () => {
    if (state !== "") {
      dispatch(searchXname(state));
      setState("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      limpiarState();
    }
  };

  return (
    <div className="filtro">
      <div>
        <input
          className="searchBar"
          type="text"
          placeholder="Buscar productos"
          onChange={handleState}
          onKeyDown={handleKeyDown}
          value={state}
        />
        {/* <button onClick={limpiarState}>
          <FaSistrix className="lupa" />
        </button> */}
      </div>
      {/* <button style={{ backgroundColor: "grey" }} onClick={handleRecargar}>
        Limpiar filtros/búsquedas
      </button>
      <select value={filtroCategoria} onChange={(e) => handleFilterCateg(e)}>
        <option value="todas" hidden>
          Todos los Productos
        </option>
        {categorias.map((categ) => (
          <option key={categ.id} value={categ.nombre}>
            {categ.nombre}
          </option>
        ))}
      </select> */}
    </div>
  );
}
