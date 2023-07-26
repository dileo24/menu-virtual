import React, { useEffect, useState } from "react";
import {
  deleteCateg,
  getCategorias,
  getSubcategorias,
  postCateg,
  postSubcateg,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../recursos/Header";
import { Link, useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import { HiOutlinePencil } from "react-icons/hi2";
import Filtros from "../recursos/Filtros";

export default function AdminCateg() {
  const dispatch = useDispatch();
  const categsBusq = useSelector((state) => state.categsBusq);
  const token = useSelector((state) => state.userActual.tokenSession);
  let productosState = useSelector((state) => state.home);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const handleDelete = (id) => {
    const categDel = categsBusq.find((categ) => categ.id === id);

    const matchingProduct = productosState.find(
      (producto) => producto.categoriaID === id
    );
    if (matchingProduct) {
      alert(
        `Error: No se puede eliminar una categoría que tenga productos asociados. Primero debes editar la Categoría de los productos que pertenezcan a ${categDel.nombre}, o eliminarlos.`
      );
    } else {
      window.confirm(
        `¿Seguro de querer borrar la categoría ${categDel && categDel.nombre}?`
      ) && dispatch(deleteCateg(id, token));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCateg(input, token)).then(() => {
      dispatch(getCategorias());
      alert("Categoria creada con éxito!");
      setInput({ nombre: "", subcategID: [] });
    });
  };

  // Crear subcategs
  const [inputSubcateg, setInputSubcateg] = useState({
    nombre: "",
    categID: "",
  });

  const handleChangeSubcateg = (e) => {
    setInputSubcateg({ ...inputSubcateg, [e.target.name]: e.target.value });
  };

  const abrirModal = (id) => {
    const matchingCategory = categsBusq.find(
      (categ) => Number(categ.id) === Number(id)
    );
    if (matchingCategory) {
      setSelectedCategory(matchingCategory);
      setInputSubcateg({ ...inputSubcateg, categID: matchingCategory.id });
      setModal(true);
    }
  };

  const handleSubmitSubcateg = (e) => {
    e.preventDefault();
    // alert("Subcategoría creada con éxito!");

    dispatch(postSubcateg(inputSubcateg, token)).then(() => {
      // Después de crear la subcategoría, puedes realizar cualquier acción necesaria
      // como actualizar la lista de subcategorías en el estado.
      dispatch(getSubcategorias());
      setInputSubcateg({ nombre: "", categID: "" });
      /* setModal(false); */ // Cierra el modal después de crear la subcategoría
      window.location.reload();
    });
  };

  return (
    <>
      <Header />
      <div className="categContainer">
        <h1 className="categTitle">Administrar Categorías</h1>
        <Filtros searchType="categorias" searchWord={"categorías"} />
        <form onSubmit={handleSubmit} className="formulario">
          <input
            type="text"
            name="nombre"
            placeholder="Nueva categoría..."
            className="nombreInput"
            value={input.nombre}
            onChange={handleChange}
            required
          />
          <button type="submit" className="agregarBtn">
            Agregar
          </button>
        </form>
        <div>
          {categsBusq.map((categ) => (
            <div key={categ.id} className="cardCateg">
              <p className="categName">{categ.nombre}</p>
              {categ.subcategorias && (
                <ul className="subCategs">
                  {categ.subcategorias.map((subC, index) => (
                    <li key={index} className="list-item">
                      <span className="list-item-circle"></span> {subC.nombre}
                    </li>
                  ))}
                </ul>
              )}
              <div className="administrarCateg">
                <div className="editCrearSubcateg">
                  <div className="iconContainer1">
                    <Link to={`/editCateg/${categ.id}`} className="editarItems">
                      <HiOutlinePencil className="editarIcon" />
                    </Link>
                  </div>
                  <div className="btnContainer">
                    <div
                      //   to={`/updateItems/${prod.id}/${index}`}
                      // to={`/subcategs/${categ.id}`}
                      onClick={() => {
                        abrirModal(categ.id);
                      }}
                      className="crearSubcateg"
                    >
                      <div className="signoMas1">
                        <div className="signoMas2"></div>
                      </div>
                      Subcategoría
                    </div>
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
        {modal && (
          <div className="fondoModal" /* onClick={() => setModal(false)} */>
            {/* Aquí muestra el formulario/modal para crear subcategorías */}
            <div className="modalContainer">
              <header className="header1">
                <h1 className="subCategTitle">
                  Nueva SubCategoría para "{selectedCategory.nombre}"
                </h1>
              </header>
              <div>
                <form onSubmit={handleSubmitSubcateg}>
                  <div>
                    <input
                      className="nombreInput"
                      type="text"
                      name="nombre"
                      placeholder="Escribe el nombre"
                      value={inputSubcateg.nombre}
                      onChange={handleChangeSubcateg}
                      required
                    />
                  </div>
                  <button type="submit" className="agregarBtn">
                    Agregar
                  </button>
                </form>
                <div className="btnCont">
                  <button className="descartar" onClick={() => setModal(false)}>
                    Descartar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
