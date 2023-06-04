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
  const [preciosArray, setPreciosArray] = useState([]);
  const [nombresProdArray, setNombresProdArray] = useState([]);
  let precioFinal = 0;
  for (let i = 0; i < preciosArray.length; i++) {
    precioFinal += parseInt(preciosArray[i]);
  }
  const dispatch = useDispatch();
  const [MostrarMenu, setMostrarMenu] = useState(false);
  const [MostrarMenu2, setMostrarMenu2] = useState(false);
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

  useEffect(() => {
    const precios = carrito.map((carritoItem) => carritoItem.precio);
    setPreciosArray(precios);

    const nombres = carrito.map((carritoItem) => carritoItem.nombre);
    setNombresProdArray(nombres);

    setInput((prevInput) => ({
      ...prevInput,
      productos: nombres,
      precio: precios.reduce((acc, curr) => acc + parseInt(curr), 0),
    }));
  }, [carrito]);

  const handleEliminarItemCarrito = (id) => {
    dispatch(eliminarItemCarrito(id));
  };

  // Menús desplegables
  const handleMostrarMenu = () => {
    setMostrarMenu(!MostrarMenu);

    if (MostrarMenu2) {
      setMostrarMenu2(!MostrarMenu2);
    }
    if (verOcultar === "Ver mi pedido") {
      setVerOcultar("Ocultar mi pedido");
    } else {
      setVerOcultar("Ver mi pedido");
    }
  };
  const handleMostrarMenu2 = () => {
    setMostrarMenu2(!MostrarMenu2);
    setMostrarMenu(MostrarMenu);
  };
  const handleMostrarMenu1 = () => {
    if (MostrarMenu2) {
      setMostrarMenu2(!MostrarMenu2);
    }
    setMostrarMenu(MostrarMenu);
  };

  //formulario
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSelectTipo = (e) => {
    if (!input.tipoPagoID.includes(e.target.value)) {
      setInput({
        ...input,
        tipoPagoID: e.target.value,
      });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (input.aclaraciones.length > 50) {
      // Validación de longitud de aclaraciones
      alert("Las aclaraciones deben tener hasta 50 caracteres");
      return;
    }
    dispatch(createPedido(input));
    dispatch(limpiarCarrito());
    setInput({
      productos: [],
      precio: "",
      mesa: "",
      aclaraciones: "",
      tipoPagoID: "",
      estadoID: "1",
    });
    alert(
      "Pedido realizado con éxito. En un momento te lo llavamos a tu mesa."
    );
    window.location.href = "/";
  };

  return (
    <>
      {userActual ? null : (
        <>
          <div className=" fixed w-full bottom-0 md:w-4/5 xl:w-4/5 bg-gray-300 shadow flex justify-center items-center">
            <button
              className="py-2 mb-2 rounded bg-teal-600 text-center px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400 text-sm leading-5 font-medium text-lg relative"
              onClick={handleMostrarMenu}
            >
              <b className="font-bold">{verOcultar}</b>
            </button>
          </div>
        </>
      )}

      <div className="flex justify-center items-center">
        {/* Menu desplegable 1*/}
        {MostrarMenu && (
          <div className="fixed bottom-0 mb-12 w-full md:w-2/6 xl:w-2/6 py-2 bg-gray-300 rounded z-10 px-8">
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
            </table>
            <div
              className=" py-2 mb-2 rounded bg-teal-600 text-center px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400 text-sm leading-5 font-medium text-lg cursor-pointer"
              onClick={handleMostrarMenu2}
            >
              <div className="font-bold">Siguiente</div>
            </div>
          </div>
        )}

        {/* Menu desplegable 2*/}
        {MostrarMenu2 && (
          <div className="fixed bottom-0 mb-12 md:w-4/5 xl:w-3/6  px-8 pb-8 pt-2 bg-gray-300 rounded z-10">
            <button
              className="py-2 mb-2 rounded bg-teal-600 text-center px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400 text-sm leading-5 font-medium text-lg relative"
              onClick={handleMostrarMenu1}
            >
              <b className="font-bold">Atrás</b>
            </button>
            <form id="formulario" onSubmit={(e) => handleSubmitForm(e)}>
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
                  min={1}
                  max={20}
                  required
                  onChange={(e) => handleChange(e)}
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
                  id="aclaraciones"
                  name="aclaraciones"
                  type="text"
                  placeholder="Personalizá tu pedido (no obligatorio)"
                  min={0}
                  max={3}
                  value={input.aclaraciones}
                  onChange={(e) => handleChange(e)}
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
                        className="form-checkbox text-indigo-600 h-5 w-5 cursor-pointer"
                        value={tipo.id}
                        onChange={(e) => handleSelectTipo(e)}
                      />
                      <span className="ml-2 text-gray-700">{tipo.tipo}</span>
                    </label>
                  ))}
                </div>
              </div>

              <input
                type="submit"
                className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer rounded"
                value="Hacer pedido"
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
}
