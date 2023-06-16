import React, { useEffect } from "react";
import Header from "./Header";
import Filtros from "../recursos/Filtros";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProducto, getProductos } from "../../redux/actions";
import Contador from "../recursos/Contador";
// import Footer from "../formularios/Footer";

export default function Menu() {
  const userActual = useSelector((state) => state.userActual);
  // const itemsNoListados = useSelector((state) => state.itemsNoListados);
  const token = userActual && userActual.tokenSession;
  const dispatch = useDispatch();
  const productosState = useSelector((state) => state.home);
  // console.log(productosState);
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

  // console.log(itemsNoListados);
  return (
    productosState && (
      <main className="menuContainer">
        {/* <Filtros /> */}
        <div className="cardsVisibles">
          {/********************* PRODUCTOS VISIBLES *********************/}
          {productosState
            .filter(
              (producto) => producto.listado === true && producto.item === false
            ) // Aplica el filtro para mostrar solo los productos con listado:true
            .map(
              (
                {
                  nombre,
                  descripcion,
                  precio,
                  itemsExtra,
                  id,
                  cantidadPersonas,
                },
                index
              ) => (
                <div key={index} className="cardProducto">
                  <p className="nombre">{nombre}</p>
                  <p className="descripcion">{descripcion}</p>
                  <div className="PrecioAcciones">
                    <p className="precio">${precio}</p>
                    <div className="acciones">
                      {userActual ? (
                        <>
                          <Link to={`/editarProducto?id=${id}`} className="">
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
                          id={index}
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
              )
            )}
          <p>Items</p>
          {/********************* ITEMS VISIBLES *********************/}
          {productosState
            .filter(
              (producto) => producto.listado === true && producto.item === true
            )
            .map(
              (
                {
                  nombre,
                  descripcion,
                  precio,
                  itemsExtra,
                  id,
                  cantidadPersonas,
                },
                index
              ) => (
                <div key={index} className="cardItem">
                  <p className="nombre">{nombre}</p>
                  <p className="descripcion">{descripcion}</p>
                  <div className="PrecioAcciones">
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
                          id={index}
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
              )
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
                ) // Aplica el filtro para mostrar solo los items con listado:false
                .map(
                  (
                    {
                      nombre,
                      descripcion,
                      precio,
                      itemsExtra,
                      id,
                      cantidadPersonas,
                    },
                    index
                  ) => (
                    <div key={index} className="cardItemNoVisible">
                      <p className="nombre">{nombre}</p>
                      <p className="descripcion">{descripcion}</p>
                      <div className="PrecioAcciones">
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
                              id={index}
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
                  )
                )}
            </div>
          )}
        </div>

        {/* <Footer /> */}
      </main>
    )
  );
}
