import React, { useEffect, useState } from "react";
import Items from "./Items";
import { useDispatch, useSelector } from "react-redux";
import { getCategorias, getSubcategorias } from "../../redux/actions";
import { Link } from "react-router-dom";
// import { func } from "prop-types";
import Header from "../recursos/Header";

export default function FormProducto({
  titulo,
  nombre,
  cantidadPersonas,
  setCantidadPersonas,
  setNombre,
  descripcion,
  setDescripcion,
  precio,
  setPrecio,
  onSubmit,
  itemsExtra,
  setItemsExtra,
  numItemsExtra,
  setNumItemsExtra,
  categoriaID,
  setCategoriaID,
  subcategoriaID,
  setSubcategoriaID,
  listado,
  setListado,
  mostrarPersonaItem,
  setMostrarPersonaItem,
  mostrarOtroCheckbox,
  setMostrarOtroCheckbox,
  mostrarPrecio,
  setMostrarPrecio,
  item,
  setItem,
  // checkListadoTrue,
  // checkListadoFalse,
}) {
  const dispatch = useDispatch();

  const itemsExtraArray = useSelector((state) => state.itemsExtra);
  const categorias = useSelector((state) => state.categorias);
  const subcategorias = useSelector((state) => state.subcategorias);
  // const categActual = categorias.filter((categ) => categ.id === categoriaID);
  const [crearProducto, setCrearProducto] = useState(false);
  const [crearCombo, setCrearCombo] = useState(false);

  useEffect(() => {
    dispatch(getCategorias());
    dispatch(getSubcategorias());
    setListado(true);
    setMostrarOtroCheckbox(false);
    setMostrarPersonaItem(true);
  }, [
    dispatch,
    categoriaID,
    setListado,
    setMostrarOtroCheckbox,
    setMostrarPersonaItem,
  ]);

  useEffect(() => {
    if (item) {
      setMostrarOtroCheckbox(true);
      setMostrarPersonaItem(false);
      if (!listado) {
        setListado(false);
        setMostrarPrecio(false);
      }
    }
  }, [item]);

  return (
    <>
      <Header />
      <div className="prodContainer">
        {!crearProducto && !crearCombo && (
          <h1 className="prodTitle">Crear Producto o Combo</h1>
        )}
        {crearProducto && <h1 className="prodTitle">Crear Producto</h1>}
        {crearCombo && <h1 className="prodTitle">Crear Combo</h1>}

        <form className="formulario" id="formulario" method="POST">
          <div className="labelInput">
            <label htmlFor="rolID">Cargo</label>
            <div className="checks">
              <div className="checkContainer">
                <input
                  className="check"
                  type="radio"
                  name="rolID"
                  value="3"
                  checked={/* input.rolID ===  */ "3"}
                  /* onChange={(e) => handleChange(e)} */
                  required
                />
                <p>Empleado</p>
              </div>
              <div className="checkContainer">
                <input
                  className="check"
                  type="radio"
                  name="rolID"
                  value="2"
                  checked={/* input.rolID ===  */ "2"}
                  /* onChange={(e) => handleChange(e)} */
                  required
                />
                <p>Administrador</p>
              </div>
            </div>
          </div>
          {/* Categoría */}
          {crearProducto ||
            (crearCombo && (
              <div>
                <label>Categoría</label>
                <select
                  onChange={(e) => {
                    setCategoriaID(e.target.value);
                    setMostrarPrecio(true);
                    setPrecio("");
                  }}
                  value={categoriaID || ""}
                >
                  <option value="" hidden>
                    Elegí una categoría
                  </option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
            ))}

          {/* subcategorias */}
          {(subcategorias && crearProducto) ||
            (crearCombo &&
              subcategorias.some(
                (subC) => Number(subC.categoria.id) === Number(categoriaID)
              ) && (
                <select
                  onChange={(e) => setSubcategoriaID(e.target.value)}
                  value={subcategoriaID}
                >
                  <option hidden>Subcategoria (no obligatorio)</option>
                  {subcategorias.map(
                    (subC) =>
                      Number(subC.categoria.id) === Number(categoriaID) && (
                        <option key={subC.id} value={subC.id}>
                          {subC.nombre}
                        </option>
                      )
                  )}
                </select>
              ))}

          {/* Guardar como ítem */}
          {crearProducto && (
            <div>
              <label htmlFor="nombre">Guardar como ítem</label>
              <p>No</p>
              <input
                type="checkbox"
                checked={mostrarPersonaItem}
                onChange={() => {
                  setMostrarPersonaItem(true);
                  setMostrarOtroCheckbox(false);
                  setListado(true);
                  setItem(false);
                }}
              />
              <p>Sí</p>
              <input
                type="checkbox"
                checked={mostrarOtroCheckbox}
                onChange={() => {
                  setMostrarOtroCheckbox(true);
                  setCantidadPersonas(1);
                  setMostrarPersonaItem(false);
                  setNumItemsExtra(0);
                  setItemsExtra([]);
                  setItem(true);
                }}
              />

              {mostrarOtroCheckbox && (
                <>
                  <label htmlFor="nombre">Mostrar en el Menú</label>
                  <p>No</p>
                  <input
                    type="checkbox"
                    checked={listado === false ? true : false}
                    onChange={() => {
                      setListado(false);
                      setMostrarPrecio(false);
                      setPrecio(0);
                    }}
                  />
                  <p>Sí</p>
                  <input
                    type="checkbox"
                    checked={listado === true ? true : false}
                    onChange={() => {
                      setListado(true);
                      setMostrarPrecio(true);
                      setPrecio("");
                    }}
                  />
                </>
              )}
            </div>
          )}

          {/* nombre */}
          {crearProducto ||
            (crearCombo && (
              <div>
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Nombre del producto"
                  value={nombre}
                  maxLength={150}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
            ))}

          {/* descripcion */}
          {crearProducto ||
            (crearCombo && (
              <div>
                <label htmlFor="descripcion">Descripción</label>
                <input
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  placeholder="Descripción del producto"
                  value={descripcion}
                  maxLength={150}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            ))}

          {/* precio */}
          {mostrarPrecio && listado && (
            <div>
              <label htmlFor="precio">Precio</label>
              <input
                id="precio"
                name="precio"
                type="number"
                placeholder="Precio del producto"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
          )}

          <input type="hidden" name="id" id="id" value="" />

          {/* cantidad de personas */}
          {mostrarPersonaItem && crearCombo && (
            <>
              <div>
                <label htmlFor="cantidadPersonas">
                  Para cuántas personas será el combo
                </label>
                <input
                  id="cantidadPersonas"
                  name="cantidadPersonas"
                  type="number"
                  placeholder="Para cuántas personas será el combo"
                  value={cantidadPersonas}
                  onChange={(e) => setCantidadPersonas(e.target.value)}
                />
              </div>
              <Items
                itemsExtra={itemsExtra}
                setItemsExtra={setItemsExtra}
                numItemsExtra={numItemsExtra}
                setNumItemsExtra={setNumItemsExtra}
                itemsExtraArray={itemsExtraArray}
                categoriaID={categoriaID}
              />
            </>
          )}

          <input
            type="submit"
            value={
              titulo === "Nuevo Producto" ? "Crear Producto" : "Guardar cambios"
            }
            onClick={onSubmit}
          />
        </form>
      </div>
    </>
  );
}
