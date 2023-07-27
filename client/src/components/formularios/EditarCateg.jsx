import React, { useEffect, useState } from "react";
import {
  getCategorias,
  getSubcategorias,
  updateCateg,
  deleteSubcateg,
  updateSubcateg,
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

  const [input, setInput] = useState();

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
                value={input === undefined ? categ.nombre : input.nombre}
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
