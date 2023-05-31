import React, { useEffect } from "react";
import Aside from "./Aside";
import { useDispatch, useSelector } from "react-redux";
/* import { eliminarProducto } from "../helpers"; */
import { Link } from "react-router-dom";
import {
  agregarCarrito,
  deleteProducto,
  eliminarItemCarrito,
  getProductos,
} from "../redux/actions";

export default function Productos() {
  const userActual = useSelector((state) => state.userActual);
  const token = userActual.tokenSession;
  const dispatch = useDispatch();
  const productosState = useSelector((state) => state.productos);

  /*  const [productos, setProductos] = useState([]); */

  useEffect(() => {
    /*  mostrarProductos(); */
    dispatch(getProductos());
  }, [dispatch]);

  /* async function mostrarProductos() {
    const productosData = await obtenerProductos();
    setProductos(productosData);
  } */

  const handleCarrito = ({ nombre, descripcion, precio, id }) => {
    dispatch(
      agregarCarrito({
        nombre,
        descripcion,
        precio,
        id,
      })
    );
  };
  const handleEliminarItem = (id) => {
    dispatch(eliminarItemCarrito(id));
  };

  const handleEliminarProducto = (id) => {
    const confirmarBorrado = window.confirm("¿Está seguro de querer borrar?");
    if (confirmarBorrado) {
      dispatch(deleteProducto(id, token)).then(() => {
        dispatch(getProductos());
      });
      /* eliminarProducto(id); */
      /*  mostrarProductos(); */
    }
  };

  return (
    <div id="productos" className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <main className="md:w-3/5 xl:w-4/5 px-5 py-10 bg-gray-200">
          <h2 className="text-3xl font-light text-center">Menú</h2>

          <div className="flex flex-col mt-10">
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
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {productosState &&
                      productosState.map(
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
                              <p className="text-gray-600">{precio}</p>
                            </td>
                            {/* condicion para la columna de 'acciones' */}
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
                                <>
                                  <button
                                    className="text-red-600 hover:text-red-900 eliminar"
                                    onClick={() =>
                                      handleCarrito({
                                        nombre,
                                        descripcion,
                                        precio,
                                        id,
                                      })
                                    }
                                  >
                                    +
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-900 eliminar"
                                    onClick={() => handleEliminarItem(id)}
                                  >
                                    -
                                  </button>
                                </>
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
        </main>
      </div>
    </div>
  );
}
