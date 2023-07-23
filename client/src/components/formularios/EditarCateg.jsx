import React, { useEffect, useState } from "react";
import {
  getCategorias,
  getSubcategorias,
  /* updateCateg, */
  deleteSubcateg,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";

export default function EditarCateg() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  const navigate = useNavigate();
  let { id } = useParams();
  const categ = useSelector((state) => state.categorias[id - 1]);
  const subcategs = useSelector((state) => state.subcategorias);
  const [subcategsToRemove, setSubcategsToRemove] = useState([]);

  const [input, setInput] = useState({
    nombre: "",
  });

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   /*  const updatedSubcategs = subcategs.filter(
  //     (subC) =>
  //       Number(subC.categoria.id) !== Number(id) &&
  //       !subcategsToRemove.includes(subC.id)
  //   ); */

  //   subcategsToRemove.map((subC) => {
  //     dispatch(deleteSubcateg(subC, token));
  //   });
  //   setSubcategsToRemove([]);
  //   alert("Categoria actualizada con éxito!");
  //   navigate("/adminCateg");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    subcategsToRemove.forEach((subC) => {
      dispatch(deleteSubcateg(subC, token));
    });

    setSubcategsToRemove([]);
    alert("Categoria actualizada con éxito!");
    navigate("/adminCateg");
  };

  return (
    categ && (
      <div className="crearCategContainer">
        <header className="header1">
          <Link className="ocultarBtn" to={"/adminCateg"}>
            <span className="arrow-left"></span>
          </Link>
          <h1 className="categTitle">Editando la categoría {categ.nombre}</h1>
        </header>
        <div>
          <form onSubmit={handleSubmit} className="formulario">
            <div className="nombre">
              <label htmlFor="nombre" className="nombreTitle">
                Nombre Categoría
              </label>
              <input
                className="nombreInput"
                type="text"
                name="nombre"
                placeholder="Escribe el nombre"
                value={input.nombre || categ.nombre}
                onChange={handleChange}
                required
              />
            </div>
            {subcategs.some(
              (subC) => Number(subC.categoria.id) === Number(id)
            ) && (
              <div className="subcategorias">
                <p className="subcategTitle">SubCategorías</p>
                {subcategs
                  .filter((subC) => Number(subC.categoria.id) === Number(id))
                  .map((subC) => (
                    <div
                      key={subC.id}
                      className="subcateg"
                      style={
                        subcategsToRemove.includes(subC.id)
                          ? { display: "none" }
                          : {}
                      }
                    >
                      <input
                        className="subcategInput"
                        type="text"
                        name="subcateg"
                        placeholder="Escribe el nombre"
                        value={subC.nombre}
                        /* onChange={handleChangeSubcategs} */
                        required
                      />
                      <div
                        onClick={() => handleRemoveSubcateg(subC.id)}
                        className="iconContainer2"
                      >
                        <VscTrash className="eliminarIcon" />
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="footer">
              <button type="submit" className="botonFooter">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
