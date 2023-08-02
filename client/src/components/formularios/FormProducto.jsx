import React, { useEffect, useState } from "react";
import Items from "./Items";
import { useDispatch, useSelector } from "react-redux";
import { getCategorias, getSubcategorias } from "../../redux/actions";
import { Link } from "react-router-dom";
// import { func } from "prop-types";
import Header from "../recursos/Header";
import HeaderBack from "../recursos/HeaderBack";

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
  const [tipoElegido, setTipoElegido] = useState(false);

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

  useEffect(() => {
    if (crearCombo || crearProducto) {
      setTipoElegido(true);
    } else {
      setTipoElegido(false);
    }
  }, [crearCombo, crearProducto]);

  return (
    <div className="prodContainer">
      {titulo === "Nuevo Producto" ? (
        <Header />
      ) : (
        <div className="header1">
          <Link className="ocultarBtn" to={"/"}>
            <span className="arrow-left"></span>
          </Link>
        </div>
      )}

      {!crearProducto && !crearCombo && titulo === "Nuevo Producto" && (
        <h1 className="prodTitle">Crear Producto o Combo</h1>
      )}

      {crearProducto && titulo === "Nuevo Producto" && (
        <h1 className="prodTitle">Crear Producto</h1>
      )}
      {crearCombo && titulo === "Nuevo Producto" && (
        <h1 className="prodTitle">Crear Combo</h1>
      )}

      {!crearProducto && !crearCombo && titulo !== "Nuevo Producto" && (
        <h1 className="prodTitle">Editar Producto o Combo</h1>
      )}
      {crearProducto && titulo !== "Nuevo Producto" && (
        <h1 className="prodTitle">Editar Producto</h1>
      )}
      {crearCombo && titulo !== "Nuevo Producto" && (
        <h1 className="prodTitle">Editar Combo</h1>
      )}

      <form className="formulario" id="formulario" method="POST">
        <div className="labelInput">
          {/* <label htmlFor="rolID">Cargo</label> */}
          <div className="checks">
            <div className="checkContainer">
              <input
                className="check"
                type="radio"
                name="rolID"
                value="3"
                checked={/* input.rolID ===  */ "3"}
                onChange={() => {
                  console.log("prod");
                  setCrearCombo(false);
                  setCrearProducto(true);
                }}
                required
              />
              <p>Producto</p>
            </div>
            <div className="checkContainer">
              <input
                className="check"
                type="radio"
                name="rolID"
                value="2"
                checked={/* input.rolID ===  */ "2"}
                onChange={() => {
                  console.log("combo");
                  setCrearCombo(true);
                  setCrearProducto(false);
                }}
                required
              />
              <p>Combo</p>
            </div>
          </div>
        </div>

        {/* Categoría */}
        {tipoElegido && (
          <div className="labelInput">
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
        )}

        {/* subcategorias */}
        {subcategorias &&
          tipoElegido &&
          subcategorias.some(
            (subC) => Number(subC.categoria.id) === Number(categoriaID)
          ) && (
            <div className="labelInput">
              <label>SubCategoría</label>
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
            </div>
          )}

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
              <div>
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
              </div>
            )}
          </div>
        )}

        {/* nombre */}
        {tipoElegido && (
          <div className="labelInput">
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
        )}

        {/* descripcion */}
        {tipoElegido && (
          <div className="labelInput">
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
        )}

        {/* precio */}
        {mostrarPrecio && tipoElegido && listado && (
          <div className="labelInput">
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
            <div className="labelInput">
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

        {/* <input
          type="submit"
          value={
            titulo === "Nuevo Producto" ? "Crear Producto" : "Guardar cambios"
          }
          onClick={onSubmit}
        /> */}
        <div className="footer">
          <button
            type="submit"
            className="botonFooter btnCrearUsuario"
            onClick={onSubmit}
          >
            {titulo === "Nuevo Producto" ? "Crear Producto" : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
