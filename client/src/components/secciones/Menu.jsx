import React, { useEffect } from "react";
import Aside from "./Aside";
import Filtros from "../recursos/Filtros";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProducto,
  getItemsExtra,
  getProductos,
} from "../../redux/actions";
import Contador from "../recursos/Contador";
import Carrito from "../formularios/Carrito";

export default function Productos() {
  const userActual = useSelector((state) => state.userActual);
  const token = userActual && userActual.tokenSession;
  const dispatch = useDispatch();
  const productosState = useSelector((state) => state.home);
  console.log(productosState);

  useEffect(() => {
    dispatch(getProductos()).then(() => dispatch(getItemsExtra()));
    // Cambiarle el background del botón del Aside
    const productos = document.querySelector(".productos");
    productos.classList.add("bg-teal-700");
  }, [dispatch]);

  const handleEliminarProducto = (id) => {
    const confirmarBorrado = window.confirm("¿Está seguro de querer borrar?");
    if (confirmarBorrado) {
      dispatch(deleteProducto(id, token)).then(() => {
        dispatch(getProductos()).then(() => dispatch(getItemsExtra()));
      });
    }
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
                          Precio
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                          {userActual ? "Acciones" : "Cantidad"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {productosState
                        .filter((producto) => producto.listado !== false)
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
                                <p className="text-gray-700 mt-2">
                                  {descripcion}
                                </p>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                                <p className="text-gray-600">${precio}</p>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                {/* Si el usuario inició sesión */}
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
                                  // Si el usuario no inició sesión
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
              </div>
            </div>

            <Carrito />
          </main>
        </div>
      </div>
    )
  );
}
