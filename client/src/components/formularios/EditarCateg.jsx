import React, { Component, useEffect, useState } from "react";
import {
  getCategorias,
  getSubcategorias,
  updateCateg,
  deleteSubcateg,
  updateSubcateg,
  postSubcateg,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import Alerta from "../recursos/Alerta";

export default function EditarCateg() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  const navigate = useNavigate();
  let { id } = useParams();
  const categ = useSelector((state) => state.categorias[id - 1]);
  const subcategs = useSelector((state) => state.subcategorias);
  const [subcategsToRemove, setSubcategsToRemove] = useState([]);
  const categsBusq = useSelector((state) => state.categsBusq);
  const [newSubcategories, setNewSubcategories] = useState([]);
  const [newSubcategoriesID, setNewSubcategoriesID] = useState([]);
  const [alertaError, setAlertaError] = useState(false);
  const [alertaExito, setAlertaExito] = useState(false);

  const [input, setInput] = useState({
    nombre: "",
  });

  useEffect(() => {
    if (categ) {
      setInput({
        nombre: categ ? categ.nombre : "",
      });
    }
  }, [categ]);

  const [inputSubc, setInputSubc] = useState({});

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChangeSubcategs = (e, subcId) => {
    setInputSubc((prevInputSubc) => ({
      ...prevInputSubc,
      [subcId]: e.target.value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (input.nombre !== categ.nombre) {
        dispatch(updateCateg(input, id, token));
      }

      for (const subC of subcategsToRemove) {
        await dispatch(deleteSubcateg(subC, token));
      }
      for (const subcId of Object.keys(inputSubc)) {
        const subcategNombre = inputSubc[subcId];
        if (
          subcategNombre !==
          subcategs.find((subC) => subC.id === parseInt(subcId))?.nombre
        ) {
          await dispatch(
            updateSubcateg(subcId, { nombre: subcategNombre }, token)
          );
        }
      }
      setSubcategsToRemove([]);
    } catch (error) {
      console.error("Error al actualizar categ:", error);
    }
  };

  // Crear subcategs
  const [inputSubcateg, setInputSubcateg] = useState({
    nombre: "",
    categID: Number(id),
  });

  const handleChangeSubcateg = (e) => {
    setInputSubcateg({ ...inputSubcateg, [e.target.name]: e.target.value });
  };

  const handleSubmitSubcateg = async (e) => {
    e.preventDefault();

    // Check if the subcategory with the same name already exists across all categories
    const subcategoryExists = subcategs.some((subC) => {
      const matchingCategory = categsBusq.find(
        (categ) => categ.id === subC.categoria.id
      );
      return matchingCategory && subC.nombre === inputSubcateg.nombre;
    });

    if (subcategoryExists) {
      setAlertaError({
        estadoActualizado: true,
        texto: `Error: Ya exise otra SubCategoría con ese nombre. Por favor, elija un nombre diferente.`,
      });
      return;
    }

    // If the subcategory is unique, proceed with creation
    dispatch(postSubcateg(inputSubcateg, token)).then(() => {
      dispatch(getSubcategorias());
      setInputSubcateg({ nombre: "", categID: Number(id) });
    });

    // crear array con las nuevas subcategs
    setNewSubcategories((prevSubcategories) => [
      ...prevSubcategories,
      inputSubcateg.nombre,
    ]);
  };

  // Si hay un array con subcategs nuevas, almacena el id de la nueva subcateg en otro id (recién cuando se haya actualizado el array de subcategs generales)
  useEffect(() => {
    newSubcategories.length &&
      setNewSubcategoriesID((prevSubcategoriesID) => [
        ...prevSubcategoriesID,
        subcategs[subcategs.length - 1].id,
      ]);
  }, [subcategs]);

  // Al descartar los cambios, se eliminan las subcategs nuevas creadas que no se guardaron
  const discardChanges = async (e) => {
    try {
      for (const subC of newSubcategoriesID) {
        await dispatch(deleteSubcateg(subC, token));
        setNewSubcategoriesID([]);
        setNewSubcategories([]);
      }
      navigate("/adminCateg");
    } catch (error) {
      console.error("Error al actualizar categ:", error);
    }
  };

  return (
    categ && (
      <div className="crearCategContainer">
        <header className="header1">
          <div className="ocultarBtn" onClick={discardChanges}>
            <span className="arrow-left"></span>
          </div>
          <div className="titulo">
            <h1 className="title">{`Editando la categoría "${categ.nombre}"`}</h1>
          </div>
        </header>

        <div className="formulario">
          <form
            onSubmit={(e) => {
              setAlertaExito({
                estado: true,
                texto: "Categoría actualizada con éxito",
              });
              handleSubmit(e);
            }}
          >
            <div className="nombre">
              <label htmlFor="nombre" className="nombreTitle">
                Nombre Categoría
              </label>
              <input
                className="nombreInput"
                type="text"
                name="nombre"
                placeholder="Escribe el nombre"
                value={input.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="subcategorias">
              <p className="subcategTitle">SubCategorías</p>
              {subcategs.some(
                (subC) => Number(subC.categoria.id) === Number(id)
              ) && (
                <div>
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
                          value={
                            inputSubc[subC.id] !== undefined
                              ? inputSubc[subC.id]
                              : subC.nombre
                          }
                          onChange={(e) => handleChangeSubcategs(e, subC.id)}
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
            </div>

            <div className="footer">
              <div
                to={"/adminCateg"}
                className="botonDescartar"
                onClick={discardChanges}
              >
                {/* <VscTrash className="eliminarIcon" /> */} Descartar cambios
              </div>

              <button type="submit" className="botonFooter">
                Guardar cambios
              </button>
            </div>
          </form>
          <form onSubmit={handleSubmitSubcateg} className="crearSubCateg">
            <div>
              <input
                className="nombreInput"
                type="text"
                name="nombre"
                placeholder="Nueva subcategoría..."
                value={inputSubcateg.nombre}
                onChange={handleChangeSubcateg}
                required
              />
            </div>
            <button type="submit" className="agregarBtn">
              Agregar
            </button>
          </form>
        </div>
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
            texto={alertaExito.texto}
            estado={alertaExito}
            setEstado={setAlertaExito}
            callback={() => navigate("/adminCateg")}
          />
        )}
      </div>
    )
  );
}
