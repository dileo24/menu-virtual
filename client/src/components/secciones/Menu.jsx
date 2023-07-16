import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProducto,
  getProductos,
  getSubcategorias,
} from "../../redux/actions";
import Contador from "../recursos/Contador";
import { HiOutlinePencil } from "react-icons/hi2";
import { VscTrash } from "react-icons/vsc";

export default function Menu({ categ, prodsBuscados }) {
  const userActual = useSelector((state) => state.userActual);
  // const itemsNoListados = useSelector((state) => state.itemsNoListados);
  const token = userActual && userActual.tokenSession;
  const dispatch = useDispatch();
  let productosState = useSelector((state) => state.home);
  // let subcategorias = useSelector((state) => state.subcategorias);
  prodsBuscados && prodsBuscados.length > 0 && (productosState = prodsBuscados);
  const [indiceItemEliminar, setIndiceItemEliminar] = useState(null);

  let productos = productosState.filter((prod) =>
    categ !== "todas" ? prod.categoria.nombre === categ : prod
  );

  useEffect(() => {
    dispatch(getProductos());
    dispatch(getSubcategorias());
  }, [dispatch]);

  /*  const handleEliminarProducto = (id) => {
    const producto = productosState.find((prod) => prod.id === id);
    const confirmarBorrado = window.confirm(
      `¿Está seguro de querer borrar el producto ${
        producto ? producto.nombre : ""
      }? Esto es irreversible.`
    );
    if (confirmarBorrado) {
      setIndiceItemEliminar(id);

      setTimeout(() => {
        dispatch(deleteProducto(id, token)).then(() => {
          dispatch(getProductos());
        });
        setIndiceItemEliminar(null);
      }, 200);
    }
  }; */

  const handleEliminarProducto = (id) => {
    const producto = productosState.find((prod) => prod.id === id);
    const confirmarBorrado = window.confirm(
      `¿Está seguro de querer borrar el producto ${
        producto ? producto.nombre : ""
      }? Esto es irreversible.`
    );
    if (confirmarBorrado) {
      setIndiceItemEliminar(id);
      setTimeout(() => {
        dispatch(deleteProducto(id, token))
          .then(() => {
            dispatch(getProductos());
          })
          .finally(() => {
            setIndiceItemEliminar(null);
          });
      }, 200);
    }
  };

  let ultimaCategoria = "";

  return (
    productosState && (
      <main className="menuContainer">
        <div className="cardsVisibles">
          {/********************* PRODUCTOS VISIBLES *********************/}

          {productos
            .filter(
              (producto) => producto.listado === true && producto.item === false
            )
            .map(
              ({
                nombre,
                descripcion,
                precio,
                itemsExtra,
                id,
                cantidadPersonas,
                categoria,
                subcategoria,
              }) => {
                const esNuevaCategoria = categoria.nombre !== ultimaCategoria;
                if (esNuevaCategoria) {
                  ultimaCategoria = categoria.nombre;
                }
                return (
                  <div key={id}>
                    {categ === "todas" && esNuevaCategoria && (
                      <h1 className="nombreCateg">{categoria.nombre}</h1>
                    )}
                    <div
                      id={subcategoria.nombre}
                      className={`cardProducto ${
                        id === indiceItemEliminar ? "animate-slide-right" : ""
                      }`}
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
                                onClick={() => handleEliminarProducto(id)}
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
                  </div>
                );
              }
            )}

          {/********************* ITEMS VISIBLES *********************/}
          {productos
            .filter(
              (producto) => producto.listado === true && producto.item === true
            )
            .map(
              ({
                nombre,
                descripcion,
                precio,
                itemsExtra,
                id,
                cantidadPersonas,
                categoria,
              }) => {
                const esNuevaCategoria = categoria.nombre !== ultimaCategoria;
                if (esNuevaCategoria) {
                  ultimaCategoria = categoria.nombre;
                }
                return (
                  <div key={id}>
                    {categ === "todas" && esNuevaCategoria && (
                      <h1 className="nombreCateg">{categoria.nombre}</h1>
                    )}
                    <div
                      className={`cardItem ${
                        id === indiceItemEliminar ? "animate-slide-right" : ""
                      }`}
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
                                onClick={() => handleEliminarProducto(id)}
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
                  </div>
                );
              }
            )}
        </div>
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
                                    handleEliminarProducto(productoFiltrado.id)
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
                  <p className="nombreCateg">Items no visibles</p>
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
                              className={`cardItemNoVisible ${
                                id === indiceItemEliminar
                                  ? "animate-slide-right"
                                  : ""
                              }`}
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
                                        onClick={() =>
                                          handleEliminarProducto(id)
                                        }
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
          )}
        </div>
      </main>
    )
  );
}
