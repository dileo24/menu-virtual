import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import { useDispatch, useSelector } from "react-redux";

export default function Historial() {
  const pedidos = useSelector((state) => state.pedidos);
  const [inputData, setInputData] = useState([]);
  const lastInput = JSON.parse(localStorage.getItem("lastInput")); // Obtener el último input del localStorage
  const dispatch = useDispatch();

  const getTipoPagoNombre = (tipoPagoID) => {
    switch (tipoPagoID) {
      case "1":
        return "Efectivo";
      case "2":
        return "Transferencia";
      case "3":
        return "Tarjeta";
      case "4":
        return "MercadoPago";
      case "5":
        return "Otro";
      default:
        return "";
    }
  };

  useEffect(() => {
    const carrito = document.querySelector(".carrito");
    carrito.classList.add("bg-teal-700");

    const savedInputs = localStorage.getItem("inputs");
    if (savedInputs) {
      setInputData(JSON.parse(savedInputs));
    }

    // dispatch(getTipoPago());
  }, [dispatch]);

  return (
    pedidos && (
      <div id="productos" className="min-h-100 bg-gray-200">
        <div className="md:flex min-h-screen md:align-top">
          <Aside />
          <main className="md:w-4/5 xl:w-4/5  py-10 bg-gray-200">
            <h2 className="text-3xl font-light text-center">Carrito</h2>
            <div className="px-5 flex flex-col mt-10">
              <div className="py-2 overflow-x-auto">
                <div className="align-middle inline-block min-w-full overflow-hidden sm:rounded-lg flex justify-center">
                  <table className="text-center shadow-b">
                    <thead className="bg-gray-300">
                      <tr>
                        <th className="text-center px-4 py-2">Pedidos</th>
                        <th className="text-center px-4 py-2">Precio</th>
                        <th className="text-center px-4 py-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white rounded">
                      {lastInput && ( // Mostrar el lastInput solo si existe
                        <tr key={lastInput.id}>
                          <td className="text-left px-10 py-5">
                            <p className="text-gray-700 mt-2">
                              <b>{lastInput.productos.join(", ")}</b>
                            </p>
                            <p className="text-gray-700 mt-2">
                              <b>Fecha: </b>
                              {lastInput.creacionFecha} <b>Hora: </b>
                              {lastInput.creacionHora}
                            </p>
                          </td>
                          <td className="text-center px-10 py-2">
                            ${lastInput.precio}
                            <p className="text-gray-700 mt-2">
                              Método de Pago:{" "}
                              <b>{getTipoPagoNombre(lastInput.tipoPagoID)}</b>
                            </p>
                          </td>
                          <td className="px-4 py-2">{lastInput.estadoID}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  );
}
