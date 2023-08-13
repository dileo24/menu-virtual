import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategorias, searchXname } from "../../redux/actions";

export default function Filtros({
  handleSearch = () => {},
  searchType,
  searchWord,
  setBusqueda,
  setCheckAlertaError,
  busqueda,
}) {
  const [state, setState] = useState("");
  const [busq, setBusq] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const handleState = (e) => {
    setState(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (state !== "") {
        dispatch(searchXname(state, searchType));
        handleSearch();
        // if (window.location.pathname === "/") {
        setBusqueda(state);
        setCheckAlertaError(true);
        // }
      }
    }
  };

  return (
    <div className="filtro">
      {busqueda && (
        <div className="ocultarBtn" onClick={() => window.location.reload()}>
          <span className="arrow-left"></span>
        </div>
      )}
      <input
        className={busqueda ? "search" : "searchBar"}
        type="text"
        placeholder={`Buscar ${searchWord}`}
        onChange={handleState}
        onKeyDown={handleKeyDown}
        value={state}
      />
    </div>
  );
}
