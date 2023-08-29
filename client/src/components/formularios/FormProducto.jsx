import React, { useEffect, useState } from "react";
import Items from "./Items";
import { useDispatch, useSelector } from "react-redux";
import { getCategorias, getSubcategorias } from "../../redux/actions";
import { Link } from "react-router-dom";
// import { func } from "prop-types";
import Header from "../recursos/Header";
// import HeaderBack from "../recursos/HeaderBack";

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
  crearProducto,
  setCrearProducto,
  combo,
  setCombo,
  vertical,
  imagen,
  handleImageUrlChange,
  handleImageLoadError,
  imageError,
  setEditarProducto,
  setNuevoProducto,
  setEditando,
}) {
  const dispatch = useDispatch();

  const itemsExtraArray = useSelector((state) => state.itemsExtra);
  const categorias = useSelector((state) => state.categorias);
  const subcategorias = useSelector((state) => state.subcategorias);
  // const categActual = categorias.filter((categ) => categ.id === categoriaID);

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
    if (combo || crearProducto) {
      setTipoElegido(true);
    } else {
      setTipoElegido(false);
    }
  }, [combo, crearProducto]);

  const prodContainerMobile = document.querySelector(".prodContainerMobile");
  if (prodContainerMobile) {
    prodContainerMobile.style.minHeight = `${window.innerHeight}px`;
  }
  const prodContainerPC = document.querySelector(".prodContainerPC");
  if (prodContainerPC) {
    prodContainerPC.style.height = `calc(${window.innerHeight}px - 20vh)`;
  }

  const handleDescartar = () => {
    setEditarProducto(false);
    setNuevoProducto(true);
    setEditando(false);
  };

  return (
    <div className={vertical ? "prodContainerMobile" : "prodContainerPC"}>
      {vertical && (
        <>
          {titulo === "Nuevo Producto" ? (
            <Header />
          ) : (
            <div className="header1">
              <Link className="ocultarBtn" to={"/"}>
                <span className="arrow-left"></span>
              </Link>
            </div>
          )}
        </>
      )}

      {!crearProducto && !combo && (
        <h1 className="prodTitle">
          {titulo === "Nuevo Producto"
            ? "Crear Producto o Combo"
            : "Editar Producto o Combo"}
        </h1>
      )}

      {titulo === "Nuevo Producto" ? (
        <h1 className="prodTitle">
          {crearProducto ? "Crear Producto" : combo ? "Crear Combo" : ""}
        </h1>
      ) : (
        <h1 className="prodTitle">
          {crearProducto ? "Editar Producto" : combo ? "Editar Combo" : ""}
        </h1>
      )}

      <form
        className="formulario"
        id="formulario"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="labelInput">
          <div className="checks">
            <div
              className="checkContainer"
              onClick={() => {
                setCombo(false);
                setCrearProducto(true);
                setCantidadPersonas(1);
                setNumItemsExtra(0);
                setItemsExtra([]);
                setMostrarPersonaItem(true);
                setMostrarOtroCheckbox(false);
              }}
            >
              <input
                className="check"
                type="radio"
                checked={crearProducto}
                onChange={() => {
                  setCombo(false);
                  setCrearProducto(true);
                  setCantidadPersonas(1);
                  setNumItemsExtra(0);
                  setItemsExtra([]);
                  setMostrarPersonaItem(true);
                  setMostrarOtroCheckbox(false);
                }}
                required
              />
              <p>Producto</p>
            </div>
            <div
              className="checkContainer"
              onClick={() => {
                setCombo(true);
                setCrearProducto(false);
                setItem(false);
                setMostrarOtroCheckbox(false);
                setMostrarPersonaItem(true);
              }}
            >
              <input
                className="check"
                type="radio"
                checked={combo}
                onChange={() => {
                  setCombo(true);
                  setCrearProducto(false);
                  setItem(false);
                  setMostrarOtroCheckbox(false);
                  setMostrarPersonaItem(true);
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
              required
            >
              <option value="" hidden>
                Selecciona una categoría
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
              <label>
                SubCategoría <span>(no obligatorio)</span>
              </label>
              <select
                onChange={(e) => setSubcategoriaID(e.target.value)}
                value={subcategoriaID || ""}
              >
                <option hidden>Selecciona una SubCategoria</option>
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
              required
            />
          </div>
        )}

        {/* descripcion */}
        {tipoElegido && (
          <div className="labelInput">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción del producto"
              value={descripcion}
              maxLength={150}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
        )}

        {/* Imagen */}
        {tipoElegido && (
          <div className="labelInput">
            <label className="labelIMG">
              Pega aquí el URL de una imagen <span>(no obligatorio)</span>
            </label>
            <p className="infoIMG">
              La imagen debe estar en internet. Si tienes una imagen local,
              puedes subirla a Google Drive y copiar su URL.
            </p>
            <input
              type="text"
              value={imagen ? imagen : ""}
              onChange={handleImageUrlChange}
              placeholder={`URL de la imagen del ${
                combo ? "combo" : "producto"
              }`}
              // required
            />
            {imagen && (
              <div className="imagenContainer">
                <img
                  src={imagen}
                  alt="Imagen desde URL"
                  onError={handleImageLoadError}
                  className="imagen"
                />
              </div>
            )}
            {imageError && <p style={{ color: "red" }}>{imageError}</p>}
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
              required
            />
          </div>
        )}

        {/* Guardar como ítem */}
        {crearProducto && (
          <div className="labelInput">
            <label htmlFor="nombre">
              Guardar como ítem{" "}
              <span>
                Permitir que el producto sea elegido como ítem extra en los
                combos asociados a esta categoría
              </span>
            </label>
            <div className="checks">
              <div
                className="checkContainer"
                onClick={() => {
                  setMostrarPersonaItem(true);
                  setMostrarOtroCheckbox(false);
                  setListado(true);
                  setItem(false);
                  setMostrarPrecio(true);
                  setPrecio("");
                }}
              >
                <input
                  className="check"
                  type="radio"
                  checked={mostrarPersonaItem}
                  onChange={() => {
                    setMostrarPersonaItem(true);
                    setMostrarOtroCheckbox(false);
                    setListado(true);
                    setItem(false);
                    setMostrarPrecio(true);
                    setPrecio("");
                  }}
                />
                <p>No</p>
              </div>
              <div
                className="checkContainer"
                onClick={() => {
                  setMostrarOtroCheckbox(true);
                  setCantidadPersonas(1);
                  setNumItemsExtra(0);
                  setItemsExtra([]);
                  setItem(true);
                }}
              >
                <input
                  className="check"
                  type="radio"
                  checked={mostrarOtroCheckbox}
                  onChange={() => {
                    setMostrarOtroCheckbox(true);
                    setCantidadPersonas(1);
                    setNumItemsExtra(0);
                    setItemsExtra([]);
                    setItem(true);
                  }}
                />
                <p>Sí</p>
              </div>
            </div>

            {mostrarOtroCheckbox && (
              <div className="labelInput">
                <label htmlFor="nombre">Mostrar en el Menú</label>
                <div className="checks">
                  <div
                    className="checkContainer"
                    onClick={() => {
                      setListado(false);
                      setMostrarPrecio(false);
                      setPrecio(0);
                    }}
                  >
                    <input
                      className="check"
                      type="radio"
                      checked={listado === false ? true : false}
                      onChange={() => {
                        setListado(false);
                        setMostrarPrecio(false);
                        setPrecio(0);
                      }}
                    />
                    <p>No</p>
                  </div>
                  <div
                    className="checkContainer"
                    onClick={() => {
                      setListado(true);
                      setMostrarPrecio(true);
                      setPrecio("");
                    }}
                  >
                    <input
                      className="check"
                      type="radio"
                      checked={listado === true ? true : false}
                      onChange={() => {
                        setListado(true);
                        setMostrarPrecio(true);
                        setPrecio("");
                      }}
                    />
                    <p>Sí</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* <input type="hidden" name="id" id="id" value="" /> */}

        {/* cantidad de personas e ítems extra*/}
        {combo && (
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
                required
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

        {/* footer crear */}
        {titulo === "Nuevo Producto" && crearProducto && (
          <div className="footer">
            <button type="submit" className="botonFooter btnCrearUsuario">
              Crear Producto
            </button>
          </div>
        )}
        {titulo === "Nuevo Producto" && combo && (
          <div className="footer">
            <button type="submit" className="botonFooter btnCrearUsuario">
              Crear Combo
            </button>
          </div>
        )}

        {/* footer editar */}
        {titulo !== "Nuevo Producto" && (
          <div className="footer">
            {vertical ? (
              <Link to={"/"} className="botonDescartar">
                Descartar cambios
              </Link>
            ) : (
              <button
                onClick={() => handleDescartar()}
                className="botonDescartar"
              >
                Descartar cambios
              </button>
            )}

            <button type="submit" className="botonGuardar">
              Guardar cambios
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
