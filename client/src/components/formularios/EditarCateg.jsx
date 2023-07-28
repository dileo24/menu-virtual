import React, { useEffect, useState } from "react";
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
import HeaderBack from "../recursos/HeaderBack";

export default function EditarCateg() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  const navigate = useNavigate();
  let { id } = useParams();
  const categ = useSelector((state) => state.categorias[id - 1]);
  const subcategs = useSelector((state) => state.subcategorias);
  const [subcategsToRemove, setSubcategsToRemove] = useState([]);
  const categsBusq = useSelector((state) => state.categsBusq);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      alert("Categoría actualizada con éxito!");
      navigate("/adminCateg");
    } catch (error) {
      console.error("Error al actualizar categ:", error);
    }
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
      // window.location.reload();
      setModal(false);
    });
  };

  return (
    categ && (
      <div className="crearCategContainer">
        <HeaderBack
          url={"/adminCateg"}
          arrowType={"left"}
          title={`Editando la categoría ${categ.nombre}`}
        />

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
            <div className="footer">
              <button type="submit" className="botonFooter">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>

        {modal && (
          <div className="fondoModal" /* onClick={() => setModal(false)} */>
            {/* Aquí muestra el formulario/modal para crear subcategorías */}
            <div className="modalContainer">
              <header>
                <h1 className="subCategTitle">
                  Crear SubCategoría para "{selectedCategory.nombre}"
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
    )
  );
}
