import React, { useEffect, useState } from "react";
import {
  getCategorias,
  getSubcategorias,
  updateCateg,
  deleteSubcateg,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditarCateg() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  const navigate = useNavigate();
  let { id } = useParams();
  const categ = useSelector((state) => state.categorias[id - 1]);
  const subcategs = useSelector((state) => state.subcategorias);
  const [input, setInput] = useState({
    nombre: "",
  });
  const [subcategsToRemove, setSubcategsToRemove] = useState([]);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getCategorias());
    dispatch(getSubcategorias());
  }, [dispatch]);

  const handleRemoveSubcateg = (subcategId) => {
    setSubcategsToRemove((prevSubcategsToRemove) => [
      ...prevSubcategsToRemove,
      subcategId,
    ]);
  };

  console.log(subcategsToRemove);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(subcategsToRemove);

    /*  const updatedSubcategs = subcategs.filter(
      (subC) =>
        Number(subC.categoria.id) !== Number(id) &&
        !subcategsToRemove.includes(subC.id)
    ); */
    subcategsToRemove.map((subC) => {
      console.log(subC);
      dispatch(deleteSubcateg(subC, token));
    });

    setSubcategsToRemove([]);
    alert("Categoria actualizada con éxito!");
    console.log(subcategs);
    // navigate("/adminCateg");
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
            <p>
              <br />
              Subcategorias (opcional)
            </p>
            <ul>
              {subcategs
                .filter((subC) => Number(subC.categoria.id) === Number(id))
                .map((subC) => (
                  <li key={subC.id}>
                    {subC.nombre}
                    <span
                      className="removeSubcateg"
                      onClick={() => handleRemoveSubcateg(subC.id)}
                    >
                      X
                    </span>
                  </li>
                ))}
            </ul>
            <div>
              <button type="submit">Terminar edición</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
