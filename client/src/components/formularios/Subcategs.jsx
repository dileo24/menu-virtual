import React, { useEffect, useState } from "react";
import {
  getCategorias,
  getSubcategorias,
  postSubcateg,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Subcategs() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  // const subcategs = useSelector((state) => state.subcategorias);
  const categs = useSelector((state) => state.categorias);
  const pathArray = window.location.pathname.split("/");
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // State to hold the selected category name

  const lastAttribute = pathArray[pathArray.length - 1];

  const [input, setInput] = useState({
    nombre: "",
    categID: "",
  });

  useEffect(() => {
    const matchingCategory = categs.find(
      (categ) => Number(categ.id) === Number(lastAttribute)
    );

    if (matchingCategory) {
      setSelectedCategoryName(matchingCategory.nombre);
      setInput({ ...input, categID: matchingCategory.id });
    }

    dispatch(getCategorias());
    dispatch(getSubcategorias());
  }, [dispatch]);

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
      <div className="subCategContainer">
        <header className="header1">
          <Link className="ocultarBtn" to={"/adminCateg"}>
            <span className="arrow-left"></span>
          </Link>

          <h1 className="categTitle">
            Crear nueva SubCategoría para "{selectedCategoryName}"
          </h1>
        </header>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Nombre de SubCategoría nueva</label>
              <input
                type="text"
                name="nombre"
                placeholder="Escribe el nombre"
                value={input.nombre}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            {/* {Number(lastAttribute) === 0 && (
              <select value={input.categID} onChange={handleCateg}>
                <option hidden>Selecciona categorías..</option>
                {categs.map((categ) => (
                  <option key={categ.id} value={categ.id}>
                    {categ.nombre}
                  </option>
                ))}
              </select>
            )} */}

            <div>
              <button type="submit">Crear</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
