import React, { useEffect, useState } from "react";
import {
  getCategorias,
  getSubcategorias,
  updateCateg,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditarCateg() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  const navigate = useNavigate();
  let { id } = useParams();
  const categ = useSelector((state) => state.categorias[id - 1]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCateg(input, id, token)).then(() => {
      dispatch(getCategorias());
      alert("Categoria actualizada con éxito!");
      navigate("/adminCateg");
      setInput({ nombre: "", subcategID: [] });
    });
  };

  return (
    categ && (
      <div className="crearCategContainer">
        <header className="header1">
          <Link className="ocultarBtn" to={"/adminCateg"}>
            <span className="arrow-left"></span>
          </Link>
          <h1 className="categTitle">editando la Categoría {categ.nombre}</h1>
        </header>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Nombre de categoría </label>
              <input
                type="text"
                name="nombre"
                placeholder="Escribe el nombre"
                value={input.nombre || categ.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type="submit">Terminar edición</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
