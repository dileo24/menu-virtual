import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategorias, searchXname } from "../../redux/actions";

export default function Filtros({ handleSearch = () => {}, searchType }) {
  const [state, setState] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const handleState = (e) => {
    setState(e.target.value);
  };

  const limpiarState = () => {
    if (state !== "") {
      dispatch(searchXname(state, searchType));
      handleSearch();
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
      </div>
    </div>
  );
}
