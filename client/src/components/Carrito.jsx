import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  eliminarItemCarrito,
  getTipoPago,
  limpiarCarrito,
} from "../redux/actions";
import { createPedido } from "../redux/actions";
// import Contador from "./Contador";

export default function Carrito() {
  const carrito = useSelector((state) => state.carrito);
  const preciosArray = carrito.map((carritoItem) => carritoItem.precio);
  const nombresProdArray = carrito.map((carritoItem) => carritoItem.nombre);
  let precioFinal = 0;
  for (let i = 0; i < preciosArray.length; i++) {
    precioFinal += parseInt(preciosArray[i]);
  }
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [verOcultar, setVerOcultar] = useState("Ver mi pedido");
  const userActual = useSelector((state) => state.userActual);
  const tipoPagos = useSelector((state) => state.tipoPagos);
  const [input, setInput] = useState({
    productos: nombresProdArray,
    precio: precioFinal,
    mesa: "",
    aclaraciones: "",
    tipoPagoID: "",
    estadoID: "1",
  });

  useEffect(() => {
    dispatch(getTipoPago());
  }, [dispatch]);

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

  //formulario
  const handlerChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handlerSelectTipo = (e) => {
    if (!input.tipoPagoID.includes(e.target.value)) {
      setInput({
        ...input,
        tipoPagoID: e.target.value,
      });
    }
  };

  const handlerSubmitForm = (e) => {
    e.preventDefault();
    dispatch(createPedido(input))
      .then(() => {
        dispatch(limpiarCarrito());
        console.log(input);
        alert("Depósito creado con éxito! Se lo redirigirá al inicio...");
        setInput({
          productos: [],
          precio: "",
          mesa: "",
          aclaraciones: "",
          tipoPagoID: "",
          estadoID: "1",
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
            <form id="formulario" onSubmit={(e) => handlerSubmitForm(e)}>
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
                  name="mesa"
                  type="number"
                  placeholder="Número de mesa"
                  value={input.mesa}
                  required
                  onChange={(e) => handlerChange(e)}
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
                  name="aclaraciones"
                  type="text"
                  placeholder="Personalizá tu pedido"
                  value={input.aclaraciones}
                  required
                  onChange={(e) => handlerChange(e)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="precio"
                >
                  Método de pago
                </label>
                <div className="flex">
                  {tipoPagos?.map((tipo) => (
                    <label
                      className="inline-flex items-center mr-4"
                      key={tipo.id}
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 h-5 w-5"
                        value={tipo.id}
                        onChange={(e) => handlerSelectTipo(e)}
                      />
                      <span className="ml-2 text-gray-700">{tipo.tipo}</span>
                    </label>
                  ))}
                </div>
              </div>

              <input
                type="submit"
                className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer rounded"
                value="Pagar"
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
}
