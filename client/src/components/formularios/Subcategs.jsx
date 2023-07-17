import React, { useEffect, useState } from "react";
import {
  getCategorias,
  getSubcategorias,
  postSubcateg,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../secciones/Header";

export default function Subcategs() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  const subcategs = useSelector((state) => state.subcategorias);
  const categs = useSelector((state) => state.categorias);

  useEffect(() => {
    dispatch(getCategorias());
    dispatch(getSubcategorias());
  }, [dispatch]);

  const [input, setInput] = useState({
    nombre: "",
    categID: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCateg = (e) => {
    setInput({ ...input, categID: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(input);
    e.preventDefault();
    dispatch(postSubcateg(input, token)).then(() => {
      dispatch(getSubcategorias());
      alert("Subcategoría creada con éxito!");
      setInput({ nombre: "", categID: "" });
    });
  };

  return (
    <>
      <Header />
      <div className="categContainer">
        <h1 className="categTitle">Crear nueva Subcategoría</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Nombre de subcategoría nueva</label>
              <input
                type="text"
                name="nombre"
                placeholder="Escribe el nombre"
                value={input.nombre}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <select value={input.categID} onChange={handleCateg}>
              <option hidden>Selecciona categorías..</option>
              {categs.map((categ) => (
                <option key={categ.id} value={categ.id}>
                  {categ.nombre}
                </option>
              ))}
            </select>
            <div>
              <button type="submit">Crear</button>
            </div>
          </form>
        </div>
        <br />
        <br />
        <p>subcategs existentes</p>
        {subcategs.map((subC) => (
          <div key={subC.id}>
            <p>{subC.nombre} X</p>
          </div>
        ))}
      </div>
    </>
  );
}
