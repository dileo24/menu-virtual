import React, { useEffect, useState } from "react";
import {
  getCategorias,
  getSubcategorias,
  postCateg,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import Header from "../secciones/Header";
import { useNavigate, Link } from "react-router-dom";

export default function NuevaCateg() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  /* const subcategs = useSelector((state) => state.subcategorias); */
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategorias());
    dispatch(getSubcategorias());
  }, [dispatch]);

  const [input, setInput] = useState({
    nombre: "",
    subcategID: [],
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  /*  const handleSubcategChange = (e) => {
    const subcategId = parseInt(e.target.value);
    const updatedSubcategIDs = input.subcategID.includes(subcategId)
      ? input.subcategID.filter((id) => id !== subcategId)
      : [...input.subcategID, subcategId];
    setInput({ ...input, subcategID: updatedSubcategIDs });
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCateg(input, token)).then(() => {
      dispatch(getCategorias());
      alert("Categoria creada con éxito!");
      setInput({ nombre: "", subcategID: [] });
    });
    navigate("/adminCateg");
  };

  return (
    <div className="crearCategContainer">
      <header className="header1">
        <Link className="ocultarBtn" to={"/adminCateg"}>
          <span className="arrow-left"></span>
        </Link>
        <h1 className="categTitle">Crear nueva Categoría</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Nombre de categoría nueva</label>
            <input
              type="text"
              name="nombre"
              placeholder="Escribe el nombre"
              value={input.nombre}
              onChange={handleChange}
              required
            />

            {/* <p>
                <br />
                Subcategorias (opcional)
              </p>
              {subcategs.map((subC) => (
                <label key={subC.id}>
                  <input
                    type="checkbox"
                    name={`subcategID-${subC.id}`}
                    value={subC.id}
                    checked={input.subcategID.includes(subC.id)}
                    onChange={handleSubcategChange}
                  />
                  {subC.nombre}
                </label>
              ))} */}
          </div>
          <div>
            <button type="submit">Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
