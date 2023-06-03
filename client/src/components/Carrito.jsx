import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarItemCarrito } from "../redux/actions";
// import Contador from "./Contador";

export default function Carrito() {
  const carrito = useSelector((state) => state.carrito);
  const preciosArray = carrito.map((carritoItem) => carritoItem.precio);
  let precioFinal = 0;
  for (let i = 0; i < preciosArray.length; i++) {
    precioFinal += parseInt(preciosArray[i]);
  }

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [verOcultar, setVerOcultar] = useState("Ver mi pedido");
  const userActual = useSelector((state) => state.userActual);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
    if (showMenu2) {
      setShowMenu2(!showMenu2);
    }
    if (verOcultar === "Ver mi pedido") {
      setVerOcultar("Ocultar mi pedido");
    } else {
      setVerOcultar("Ver mi pedido");
    }
  };

  const handleShowMenu2 = () => {
    setShowMenu2(!showMenu2);
    setShowMenu(showMenu);
  };

  const handleEliminarItemCarrito = (id) => {
    dispatch(eliminarItemCarrito(id));
  };

  return (
    <>
      {userActual ? null : (
        <>
          <div className=" fixed w-full bottom-0 md:w-4/5 xl:w-4/5 bg-gray-300 shadow flex justify-center items-center">
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
        {/* Menu desplegable 1*/}
        {showMenu && (
          <div className="fixed flex items-center justify-center bottom-0 mb-12 w-full md:w-2/6 xl:w-2/6 py-2 bg-gray-300 rounded z-10">
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
                      <td className="text-center px-4 py-2">{prod.nombre}</td>
                      <td className="text-center px-4 py-2">${prod.precio}</td>
                      <td className="text-center px-4 py-2">
                        <div
                          onClick={() => {
                            handleEliminarItemCarrito(prod.id);
                          }}
                          className="cursor-pointer text-red-500"
                        >
                          X
                        </div>
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td className=" py-2" colSpan="2">
                    Precio Final: ${precioFinal}
                  </td>
                </tr>
              </tbody>
              <div
                className=" ml-40 py-2 mb-2 rounded bg-teal-600 text-center px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400 text-sm leading-5 font-medium text-lg cursor-pointer"
                onClick={handleShowMenu2}
              >
                <div className="font-bold">Siguiente</div>
              </div>
            </table>
          </div>
        )}

        {/* Menu desplegable 2*/}
        {showMenu2 && (
          <div className="fixed flex items-center justify-center bottom-0 mb-12 w-full md:w-2/6 xl:w-2/6 py-2 bg-gray-300 rounded z-10">
            <form id="formulario" method="POST">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mesa"
                >
                  Mesa
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Número de mesa"
                  // value={nombre}
                  // onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="aclaraciones"
                >
                  Aclaraciones
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  placeholder="Personalizá tu pedido"
                  // value={descripcion}
                  // onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="precio"
                >
                  Método de pago
                </label>
                <div class="flex">
                  <label class="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      class="form-checkbox text-indigo-600 h-5 w-5"
                    />
                    <span class="ml-2 text-gray-700">Efectivo</span>
                  </label>
                  <label class="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      class="form-checkbox text-indigo-600 h-5 w-5"
                    />
                    <span class="ml-2 text-gray-700">Transferencia</span>
                  </label>
                  <label class="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      class="form-checkbox text-indigo-600 h-5 w-5"
                    />
                    <span class="ml-2 text-gray-700">Crédito</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox text-indigo-600 h-5 w-5"
                    />
                    <span class="ml-2 text-gray-700">Débito</span>
                  </label>
                </div>
              </div>

              <input type="hidden" name="id" id="id" value="" />

              <input
                type="submit"
                className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer rounded"
                value="Pagar"
                // onClick={onSubmit}
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
}
