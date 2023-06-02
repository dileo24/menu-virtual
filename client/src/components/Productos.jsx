import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import Filtros from "./Filtros";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProducto, getProductos } from "../redux/actions";
import Contador from "./contador";
import { eliminarItemCarrito } from "../redux/actions";

export default function Productos() {
  const userActual = useSelector((state) => state.userActual);
  const token = userActual && userActual.tokenSession;
  const dispatch = useDispatch();
  const productosState = useSelector((state) => state.productosHome);
  const carrito = useSelector((state) => state.carrito);
  const [showMenu, setShowMenu] = useState(false);
  const [verOcultar, setVerOcultar] = useState("Ver mi pedido");

  useEffect(() => {
    dispatch(getProductos());
    // Cambiarle el background del botón del Aside
    const productos = document.querySelector(".productos");
    productos.classList.add("bg-teal-700");
  }, [dispatch]);

  const handleEliminarProducto = (id) => {
    const confirmarBorrado = window.confirm("¿Está seguro de querer borrar?");
    if (confirmarBorrado) {
      dispatch(deleteProducto(id, token)).then(() => {
        dispatch(getProductos());
      });
    }
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
    if (verOcultar === "Ver mi pedido") {
      setVerOcultar("Ocultar mi pedido");
    } else {
      setVerOcultar("Ver mi pedido");
    }
  };

  const handleEliminarItem = (id) => {
    console.log(`intentando eliminar el item con id ${id}`);
    dispatch(eliminarItemCarrito(id));
  };

  return (
    productosState && (
      <div id="productos" className="min-h-100 bg-gray-200">
        <div className="md:flex min-h-screen md:align-top">
          <Aside />
          <main className="md:w-4/5 xl:w-4/5  py-10 bg-gray-200">
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
                          Descripción
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
                      {productosState.map(
                        ({ nombre, descripcion, precio, id }) => (
                          <tr key={id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <p className="text-sm leading-5 font-medium text-gray-700 text-lg font-bold">
                                {nombre}
                              </p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <p className="text-gray-700">{descripcion}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                              <p className="text-gray-600">${precio}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                              {/* condicion para la columna de 'acciones' */}

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
                                  id={id}
                                  nombre={nombre}
                                  descripcion={descripcion}
                                  precio={precio}
                                  // valor={valor}
                                />
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {userActual ? null : (
              <>
                <div className=" w-full absolute bottom-0 md:w-4/5 xl:w-4/5 bg-gray-300 shadow flex justify-center items-center">
                  <button
                    className="py-2 mb-2 rounded bg-teal-600 text-center px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400 text-sm leading-5 font-medium text-lg relative"
                    onClick={handleShowMenu}
                  >
                    <b className="font-bold">{verOcultar}</b>
                  </button>
                </div>
              </>
            )}

            <div className="flex justify-center items-center">
              {/* Menu desplegable */}
              {showMenu && (
                <div className="flex items-center justify-center absolute bottom-0 mb-12 w-full md:w-2/6 xl:w-2/6 py-2 bg-gray-300 rounded z-10">
                  <table className="text-center">
                    <thead>
                      <tr>
                        <th className="text-center px-4 py-2">Producto</th>
                        <th className="text-center px-4 py-2">Precio</th>
                        <th className="text-center px-4 py-2">Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrito &&
                        carrito.map((prod, id) => (
                          <tr key={id}>
                            <td className="text-center px-4 py-2">
                              {prod.nombre}
                            </td>
                            <td className="text-center px-4 py-2">
                              ${prod.precio}
                            </td>
                            <td className="text-center px-4 py-2">
                              <button
                                onClick={() => handleEliminarItem(prod.id)}
                                className=" text-red-500"
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    )
  );
}
