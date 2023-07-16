import React, { useEffect, useState } from "react";
import { getCategorias, postCateg } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../secciones/Header";
import { useNavigate } from "react-router-dom";

export default function NuevaCateg() {
  const dispatch = useDispatch();
  // const categorias = useSelector((state) => state.categorias);
  const token = useSelector((state) => state.userActual.tokenSession);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const [input, setInput] = useState({
    nombre: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCateg(input, token)).then(() => {
      dispatch(getCategorias());
      alert("Categoria creada con éxito!");
      setInput({ nombre: "" });
    });
    navigate("/adminCateg");
  };

  return (
    <>
      <Header />
      <div className="categContainer">
        <h1 className="categTitle">Crear nueva Categoría</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Nombre de categoría nueva</label>
              <input
                type="text"
                name="nombre"
                placeholder="Escribe el nombre"
                value={input.nombre}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <button type="submit">Crear</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
