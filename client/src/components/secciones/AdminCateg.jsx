import React, { useEffect, useState } from "react";
import { deleteCateg, getCategorias, postCateg } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../secciones/Header";
import { Link } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import { HiOutlinePencil } from "react-icons/hi2";

export default function AdminCateg() {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias);
  const token = useSelector((state) => state.userActual.tokenSession);

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const [input, setInput] = useState({
    nombre: "",
  });

  const handleDelete = (id) => {
    const categDel = categorias.find((categ) => categ.id === id);
    window.confirm(
      `¿Seguro de querer borrar la categoría ${categDel && categDel.nombre}?`
    ) && dispatch(deleteCateg(id, token));
  };

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
  };

  console.log(categorias);

  return (
    <>
      <Header />
      <div className="categContainer">
        <h1 className="categTitle">Administrar Categorías</h1>

        <div>
          {categorias &&
            categorias.map((categ) => (
              <div key={categ.id} className="cardCateg">
                <p className="categName">{categ.nombre}</p>
                <div className="administrarCateg">
                  <div className="editCrearSubcateg">
                    <div className="iconContainer1">
                      <Link
                        //   to={`/updateItems/${prod.id}/${index}`}
                        className="editarItems"
                      >
                        <HiOutlinePencil className="editarIcon" />
                      </Link>
                    </div>
                    <div className="btnContainer">
                      <Link
                        //   to={`/updateItems/${prod.id}/${index}`}
                        className="crearSubcateg"
                      >
                        <div className="signoMas1">
                          <div className="signoMas2"></div>
                        </div>
                        Subcategoría
                      </Link>
                    </div>
                  </div>
                  <div className="iconContainer2">
                    <VscTrash
                      className="eliminarIcon"
                      onClick={() => {
                        handleDelete(categ.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <footer>
          <Link to="/nuevaCateg" className="botonFooter">
            <div className="signoMas1">
              <div className="signoMas2"></div>
            </div>
            Crear Nueva Categoría
          </Link>
        </footer>
      </div>
    </>
  );
}
