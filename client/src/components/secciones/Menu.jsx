import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductos, getSubcategorias } from "../../redux/actions";
import Contador from "../recursos/Contador";
import { HiOutlinePencil } from "react-icons/hi2";
import { VscTrash } from "react-icons/vsc";
import Alerta from "../recursos/Alerta";

export default function Menu({ categ, prodsBuscados, handleClickEliminar }) {
  const userActual = useSelector((state) => state.userActual);
  const dispatch = useDispatch();
  let productosState = useSelector((state) => state.home);
  const categorias = useSelector((state) => state.categorias);

  useEffect(() => {
    dispatch(getProductos());
    dispatch(getSubcategorias());
  }, [dispatch]);

  let ultimaCategoria = "";

  // Función para quitar tildes y espacios
  const removeAccentsAndSpaces = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s/g, "");
  };

  let productos = productosState.filter((prod) =>
    categ !== "todas" ? prod.categoria.nombre === categ : prod
  );

  // Filtrar los productos por categoría
  const filtrarProductosPorCategoria = (categoria) => {
    return productos.filter((prod) => prod.categoria.nombre === categoria);
  };

  return (
    productos && (
      <main className="menuContainer">
        {categorias.map((categoria) => {
          const productosConItemFalse = filtrarProductosPorCategoria(
            categoria.nombre
          ).filter(
            (producto) => producto.listado === true && producto.item === false
          );
          const productosConItemTrue = filtrarProductosPorCategoria(
            categoria.nombre
          ).filter(
            (producto) => producto.listado === true && producto.item === true
          );

          return (
            <div key={categoria.id}>
              {categ === "todas" && (
                <h1 className="nombreCateg">{categoria.nombre}</h1>
              )}
              <div className="cardsVisibles">
                {/* Renderizar los productos con item === false */}
                {productosConItemFalse.map(
                  ({
                    nombre,
                    descripcion,
                    precio,
                    itemsExtra,
                    id,
                    cantidadPersonas,
                    subcategoria,
                  }) => (
                    <div
                      key={id}
                      id={
                        subcategoria
                          ? removeAccentsAndSpaces(subcategoria.nombre)
                          : ""
                      }
                      className="cardProducto"
                    >
                      <p className="nombre">{nombre}</p>
                      <p className="descripcion">{descripcion}</p>
                      <div className="precioAcciones">
                        <div className="acciones">
                          {userActual ? (
                            <>
                              <Link
                                to={`/editarProducto?id=${id}`}
                                className="iconContainer1"
                              >
                                <HiOutlinePencil className="editarIcon" />
                              </Link>

                              <button
                                onClick={() => handleClickEliminar(id)}
                                className="iconContainer2"
                              >
                                <VscTrash className="eliminarIcon" />
                              </button>
                            </>
                          ) : (
                            <Contador
                              id={id}
                              nombre={nombre}
                              descripcion={descripcion}
                              precio={precio}
                              itemsExtra={itemsExtra}
                              cantidadPersonas={cantidadPersonas}
                            />
                          )}
                        </div>
                        <p className="precio">${precio}</p>
                      </div>
                    </div>
                  )
                )}

                {/* Renderizar los productos con item === true */}
                {productosConItemTrue.map(
                  ({
                    nombre,
                    descripcion,
                    precio,
                    itemsExtra,
                    id,
                    cantidadPersonas,
                    subcategoria,
                  }) => (
                    <div
                      key={id}
                      id={
                        subcategoria
                          ? removeAccentsAndSpaces(subcategoria.nombre)
                          : ""
                      }
                      className="cardItem"
                    >
                      <p className="nombre">{nombre}</p>
                      <p className="descripcion">{descripcion}</p>
                      <div className="precioAcciones">
                        <div className="acciones">
                          {userActual ? (
                            <>
                              <Link
                                to={`/editarProducto?idItem=${id}`}
                                className="iconContainer1"
                              >
                                <HiOutlinePencil className="editarIcon" />
                              </Link>
                              <button
                                onClick={() => handleClickEliminar(id)}
                                className="iconContainer2"
                              >
                                <VscTrash className="eliminarIcon" />
                              </button>
                            </>
                          ) : (
                            <Contador
                              id={id}
                              nombre={nombre}
                              descripcion={descripcion}
                              precio={precio}
                              itemsExtra={itemsExtra}
                              cantidadPersonas={cantidadPersonas}
                            />
                          )}
                        </div>
                        <p className="precio">${precio}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
        {/********************* ITEMS NO VISIBLES *********************/}
        <div>
          {userActual && (
            <div>
              {productos
                .filter(
                  (producto) =>
                    producto.listado === false && producto.item === true
                )
                .some((productoFiltrado) => {
                  return (
                    <div key={productoFiltrado.id}>
                      {categ === "todas" && (
                        <h1 className="nombreCateg">
                          {productoFiltrado.categoria.nombre}
                        </h1>
                      )}
                      <div className="cardItemNoVisible">
                        <p className="nombre">{productoFiltrado.nombre}</p>
                        <p className="descripcion">
                          {productoFiltrado.descripcion}
                        </p>
                        <div className="precioAcciones">
                          <div className="acciones">
                            {userActual ? (
                              <>
                                <Link
                                  to={`/editarProducto?idItem=${productoFiltrado.id}`}
                                  className="iconContainer1"
                                >
                                  <HiOutlinePencil className="editarIcon" />
                                </Link>
                                <button
                                  onClick={() =>
                                    handleClickEliminar(productoFiltrado.id)
                                  }
                                  className="iconContainer2"
                                >
                                  <VscTrash className="eliminarIcon" />
                                </button>
                              </>
                            ) : (
                              <Contador
                                id={productoFiltrado.id}
                                nombre={productoFiltrado.nombre}
                                descripcion={productoFiltrado.descripcion}
                                itemsExtra={productoFiltrado.itemsExtra}
                                cantidadPersonas={
                                  productoFiltrado.cantidadPersonas
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }) ? (
                <div className="cardsNoVisibles">
                  <p className="nombreCateg noVisibles">Items no visibles</p>
                  {productosState
                    .filter(
                      (producto) =>
                        producto.listado === false && producto.item === true
                    )
                    .filter((prod) =>
                      categ !== "todas" ? prod.categoria.nombre === categ : prod
                    )
                    .map(
                      ({
                        nombre,
                        descripcion,
                        itemsExtra,
                        id,
                        cantidadPersonas,
                        categoria,
                        subcategoria,
                      }) => {
                        const esNuevaCategoria =
                          categoria.nombre !== ultimaCategoria;
                        if (esNuevaCategoria) {
                          ultimaCategoria = categoria.nombre;
                        }
                        return (
                          <div key={id}>
                            {categ === "todas" && esNuevaCategoria && (
                              <h1 className="nombreCateg">
                                {categoria.nombre}
                              </h1>
                            )}
                            <div
                              id={
                                subcategoria
                                  ? removeAccentsAndSpaces(subcategoria.nombre)
                                  : ""
                              }
                              className="cardItemNoVisible"
                            >
                              <p className="nombre">{nombre}</p>
                              <p className="descripcion">{descripcion}</p>
                              <div className="precioAcciones">
                                <div className="acciones">
                                  {userActual ? (
                                    <>
                                      <Link
                                        to={`/editarProducto?idItem=${id}`}
                                        className="iconContainer1"
                                      >
                                        <HiOutlinePencil className="editarIcon" />
                                      </Link>
                                      <button
                                        onClick={() => handleClickEliminar(id)}
                                        className="iconContainer2"
                                      >
                                        <VscTrash className="eliminarIcon" />
                                      </button>
                                    </>
                                  ) : (
                                    <Contador
                                      id={id}
                                      nombre={nombre}
                                      descripcion={descripcion}
                                      itemsExtra={itemsExtra}
                                      cantidadPersonas={cantidadPersonas}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              ) : null}
            </div>
          )}{" "}
        </div>
      </main>
    )
  );
}
