import React, { useEffect } from "react";
import Aside from "./Aside";
import Filtros from "../recursos/Filtros";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProducto, getProductos } from "../../redux/actions";
import Contador from "../recursos/Contador";
// import VerMiPedido from "../formularios/VerMiPedido";

export default function Menu() {
  const userActual = useSelector((state) => state.userActual);
  // const itemsNoListados = useSelector((state) => state.itemsNoListados);
  const token = userActual && userActual.tokenSession;
  const dispatch = useDispatch();
  const productosState = useSelector((state) => state.home);
  // console.log(productosState);
  useEffect(() => {
    dispatch(getProductos());
    // Cambiarle el background del botón del Aside
    const menu = document.querySelector(".menu");
    menu.classList.add("bg-teal-700");
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
      <main className="menuContainer md:w-4/5 xl:w-4/5  py-10 bg-gray-200">
        <h2 className="text-3xl font-light text-center">Menú</h2>
        <div className="px-5 flex flex-col mt-10">
          <Filtros />
          <div className="py-2 overflow-x-auto">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Productos
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      {userActual ? "Acciones" : "Cantidad"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {/********************* PRODUCTOS VISIBLES *********************/}
                  {productosState
                    .filter(
                      (producto) =>
                        producto.listado === true && producto.item === false
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
                          listado,
                          item,
                        },
                        index
                      ) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p className="text-sm leading-5 font-medium text-gray-700 text-lg font-bold">
                              {nombre}
                            </p>
                            <p className="text-gray-700 mt-2">{descripcion}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                            <p className="text-gray-600">${precio}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            {userActual ? (
                              <>
                                <Link
                                  to={`/editarProducto?id=${id}`}
                                  className="text-teal-600 hover:text-teal-900 mr-5"
                                >
                                  Editar
                                </Link>
                                <button
                                  onClick={() => handleEliminarProducto(id)}
                                  className="text-red-600 hover:text-red-900 eliminar"
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
                          </td>
                        </tr>
                      )
                    )}

                  {/********************* ITEMS VISIBLES *********************/}
                  {productosState
                    .filter(
                      (producto) =>
                        producto.listado === true && producto.item === true
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
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p className="text-sm leading-5 font-medium text-gray-700 text-lg font-bold">
                              {nombre}
                            </p>
                            <p className="text-gray-700 mt-2">{descripcion}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                            <p className="text-gray-600">${precio}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            {userActual ? (
                              <>
                                <Link
                                  to={`/editarProducto?idItem=${id}`}
                                  className="text-teal-600 hover:text-teal-900 mr-5"
                                >
                                  Editar
                                </Link>
                                <button
                                  onClick={() => handleEliminarProducto(id)}
                                  className="text-red-600 hover:text-red-900 eliminar"
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
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
            {/********************* ITEMS NO VISIBLES *********************/}
            {userActual && (
              <>
                <p className="mt-10 mb-5 font-bold text-center text-2xl">
                  Ítems no visibles
                </p>

                <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                          Productos
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                          {userActual ? "Acciones" : "Cantidad"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-400">
                      {productosState
                        .filter((producto) => producto.listado === false) // Aplica el filtro para mostrar solo los productos con listado:false
                        .map(({ nombre, descripcion, precio, id }, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <p className="text-sm leading-5 font-medium text-gray-700 text-lg font-bold">
                                {nombre}
                              </p>
                              <p className="text-gray-700 mt-2">
                                {descripcion}
                              </p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                              <p className="text-gray-600">${precio}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                              {/* Si el usuario inició sesión */}
                              {userActual && (
                                <>
                                  <Link
                                    to={`/editarProducto?idItem=${id}`}
                                    className="text-teal-600 hover:text-teal-900 mr-5"
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    onClick={() => handleEliminarProducto(id)}
                                    className="text-red-600 hover:text-red-900 eliminar"
                                  >
                                    Eliminar
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

        {/* <VerMiPedido /> */}
      </main>
    )
  );
}
