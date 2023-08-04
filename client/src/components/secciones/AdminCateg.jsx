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
import { Link /* , useNavigate */ } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import { HiOutlinePencil } from "react-icons/hi2";
import Filtros from "../recursos/Filtros";
import Alerta from "../recursos/Alerta";

export default function AdminCateg() {
  const dispatch = useDispatch();
  const categsBusq = useSelector((state) => state.categsBusq);
  const token = useSelector((state) => state.userActual.tokenSession);
  let productosState = useSelector((state) => state.home);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const navigate = useNavigate();
  const [alertaError, setAlertaError] = useState(false);
  const [alertaExito, setAlertaExito] = useState(false);
  const [alertaPregunta, setAlertaPregunta] = useState(false);

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
      setAlertaError({
        estadoActualizado: true,
        texto: `No se puede eliminar una categoría que tenga productos asociados. Primero debes editar o eliminar los productos asociados a "${categDel.nombre}".`,
      });
    } else {
      setAlertaPregunta({
        estadoActualizado: true,
        id,
        texto: `¿Estás seguro que quiere eliminar la categoria "${categDel.nombre}"?`,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCateg(input, token)).then(() => {
      dispatch(getCategorias());
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

    // Check if there's already a subcategory with the same name across all categories
    const existingSubcategory = categsBusq.some((categ) =>
      categ.subcategorias.some((subC) => subC.nombre === inputSubcateg.nombre)
    );

    if (existingSubcategory) {
      setAlertaError({
        estadoActualizado: true,
        texto: `Error: La SubCategoría "${inputSubcateg.nombre}" ya existe en una categoría. Por favor, elija un nombre diferente.`,
      });
      return;
    }

    // If the subcategory name is unique, proceed with the creation
    dispatch(postSubcateg(inputSubcateg, token)).then(() => {
      dispatch(getSubcategorias());
      setInputSubcateg({ nombre: "", categID: "" });
      window.location.reload();
    });
  };

  return (
    <>
      <Header />

      <div className="categContainer">
        <h1 className="categTitle">Administrar Categorías</h1>
        <Filtros searchType="categorias" searchWord={"categorías"} />
        <form
          onSubmit={(e) => {
            setAlertaExito(true);
            handleSubmit(e);
          }}
          className="formulario"
        >
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
                  {categ.subcategorias
                    .sort((a, b) => a.id - b.id) // Sort subcategories by ID
                    .map((subC, index) => (
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
              <header>
                <h1 className="subCategTitle">
                  SubCategoría para "{selectedCategory.nombre}"
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
        {alertaError && (
          <Alerta
            tipo={"error"}
            titulo={"Error"}
            texto={alertaError.texto}
            estado={alertaError}
            setEstado={setAlertaError}
            callback={() => {}}
          />
        )}
        {alertaExito && (
          <Alerta
            tipo={"exito"}
            titulo={"Éxito"}
            texto={`Categoría creada con éxito.`}
            estado={alertaExito}
            setEstado={setAlertaExito}
            callback={() => {}}
          />
        )}
        {alertaPregunta && (
          <Alerta
            tipo={"pregunta"}
            titulo={"Eliminar categoría"}
            texto={alertaPregunta.texto}
            estado={alertaPregunta}
            setEstado={setAlertaPregunta}
            callback={() => {
              dispatch(deleteCateg(alertaPregunta.id, token));
              window.location.reload();
            }}
            aceptar={"Eliminar"}
          />
        )}
      </div>
    </>
  );
}
