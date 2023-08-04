import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategorias, searchXname } from "../../redux/actions";

export default function Filtros({
  handleSearch = () => {},
  searchType,
  searchWord,
  setBusqueda,
  setCheckAlertaError,
}) {
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
      setBusqueda(state);
      setCheckAlertaError(true);
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
          placeholder={`Buscar ${searchWord}`}
          onChange={handleState}
          onKeyDown={handleKeyDown}
          value={state}
        />
      </div>
    </div>
  );
}
