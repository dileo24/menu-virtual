import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProducto, getProductos } from "../../redux/actions";
import Contador from "../recursos/Contador";

export default function Menu({ categ, prodsBuscados }) {
  const userActual = useSelector((state) => state.userActual);
  // const itemsNoListados = useSelector((state) => state.itemsNoListados);
  const token = userActual && userActual.tokenSession;
  const dispatch = useDispatch();
  let productosState = useSelector((state) => state.home);
  prodsBuscados && prodsBuscados.length > 0 && (productosState = prodsBuscados);

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  const handleEliminarProducto = (id) => {
    const confirmarBorrado = window.confirm(
      "¿Está seguro de querer borrar el producto?"
    );
    if (confirmarBorrado) {
      dispatch(deleteProducto(id, token)).then(() => {
        dispatch(getProductos());
      });
    }
  };
  let ultimaCategoria = "";

  return (
    productosState && (
      <main className="menuContainer">
        <div className="cardsVisibles">
          {/********************* PRODUCTOS VISIBLES *********************/}
          {productosState
            .filter(
              (producto) => producto.listado === true && producto.item === false
            )
            .filter((prod) =>
              categ !== "todas" ? prod.categoria.nombre === categ : prod
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
                    <div className="cardProducto">
                      <p className="nombre">{nombre}</p>
                      <p className="descripcion">{descripcion}</p>
                      <div className="precioAcciones">
                        <p className="precio">${precio}</p>
                        <div className="acciones">
                          {userActual ? (
                            <>
                              <Link
                                to={`/editarProducto?id=${id}`}
                                className=""
                              >
                                Editar
                              </Link>
                              <button
                                onClick={() => handleEliminarProducto(id)}
                                className=""
                              >
                                Eliminar
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
                      </div>
                    </div>
                  </div>
                );
              }
            )}

          {/********************* ITEMS VISIBLES *********************/}
          {productosState
            .filter(
              (producto) => producto.listado === true && producto.item === true
            )
            .filter((prod) =>
              categ !== "todas" ? prod.categoria.nombre === categ : prod
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
                    <div className="cardItem">
                      <p className="nombre">{nombre}</p>
                      <p className="descripcion">{descripcion}</p>
                      <div className="precioAcciones">
                        <p className="precio">${precio}</p>
                        <div className="acciones">
                          {userActual ? (
                            <>
                              <Link
                                to={`/editarProducto?idItem=${id}`}
                                className=""
                              >
                                Editar
                              </Link>
                              <button
                                onClick={() => handleEliminarProducto(id)}
                                className=""
                              >
                                Eliminar
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
            <div className="cardsNoVisibles">
              <p>Items no visibles</p>

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
                    precio,
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
                          <h1 className="nombreCateg">{categoria.nombre}</h1>
                        )}
                        <div className="cardItemNoVisible">
                          <p className="nombre">{nombre}</p>
                          <p className="descripcion">{descripcion}</p>
                          <div className="precioAcciones">
                            <p className="precio">${precio}</p>
                            <div className="acciones">
                              {userActual ? (
                                <>
                                  <Link
                                    to={`/editarProducto?idItem=${id}`}
                                    className=""
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    onClick={() => handleEliminarProducto(id)}
                                    className=""
                                  >
                                    Eliminar
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
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          )}
        </div>
      </main>
    )
  );
}
