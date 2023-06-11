import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import { useDispatch, useSelector } from "react-redux";
// import { getTipoPago } from "../../redux/actions";

export default function Pedidos() {
  const pedidos = useSelector((state) => state.pedidos);
  const [inputData, setInputData] = useState([]);
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
    // Cambiarle el background del botón del Aside
    const pedidosCliente = document.querySelector(".pedidosCliente");
    pedidosCliente.classList.add("bg-teal-700");

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
            <h2 className="text-3xl font-light text-center">
              Mis pedidos realizados
            </h2>
            <div className="px-5 flex flex-col mt-10">
              {/* <Filtros /> */}
              <div className="py-2 overflow-x-auto">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <table className="text-center">
                    <thead>
                      <tr>
                        <th className="text-center px-4 py-2">Fecha</th>
                        <th className="text-center px-4 py-2">Hora</th>
                        <th className="text-center px-4 py-2">Nombre</th>
                        <th className="text-center px-4 py-2">Precio</th>
                        <th className="text-center px-4 py-2">
                          Método de Pago
                        </th>
                        <th className="text-center px-4 py-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputData.map((input) => (
                        <tr>
                          <td className="text-center px-4 py-2">
                            {input.creacionFecha}
                          </td>
                          <td className="text-center px-4 py-2">
                            {input.creacionHora}
                          </td>
                          <td className="text-center px-4 py-2">
                            {input.productos.join(", ")}
                          </td>
                          <td className="text-center px-4 py-2">
                            {input.precio}
                          </td>
                          {/* <td>{getTipoPago(input.tipoPagoID)}</td> */}
                          <td className="text-center px-4 py-2">
                            {getTipoPagoNombre(input.tipoPagoID)}
                          </td>
                          <td className="text-center px-4 py-2">
                            {/* estado del pedido */}
                          </td>
                        </tr>
                      ))}
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
