import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategorias, searchXname } from "../../redux/actions";
import { RxMagnifyingGlass } from "react-icons/rx";

export default function Filtros({
  setCurrentSlide,
  searchType,
  searchWord,
  setBusqueda,
  setCheckAlertaError,
  busqueda,
}) {
  const [state, setState] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const handleState = (e) => {
    setState(e.target.value);
  };

  const handleSearch = () => {
    if (state !== "") {
      dispatch(searchXname(state, searchType));
      window.location.pathname === "/" && setCurrentSlide(0);
      setBusqueda(state);
      setCheckAlertaError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const vertical = window.innerHeight > window.innerWidth;

  return (
    <div className={vertical ? "filtroMobile" : "filtroPC"}>
      {busqueda && (
        <button className="ocultarBtn" onClick={() => window.location.reload()}>
          <span className="arrow-left"></span>
        </button>
      )}
      <input
        className={busqueda ? "search" : "searchBar"}
        type="text"
        placeholder={`Buscar ${searchWord}`}
        onChange={handleState}
        onKeyDown={handleKeyDown}
        value={state}
      />
      <RxMagnifyingGlass className="lupa" onClick={handleSearch} />
    </div>
  );
}
