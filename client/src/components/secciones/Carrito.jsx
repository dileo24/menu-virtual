import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import { useDispatch, useSelector } from "react-redux";
import { getEstados, getTipoPago } from "../../redux/actions";

export default function Carrito() {
  const [inputData, setInputData] = useState([]);
  const pedidos = useSelector((state) => state.pedidos);
  const estados = useSelector((state) => state.estados);
  const tipoPagos = useSelector((state) => state.tipoPagos);
  const dispatch = useDispatch();

  const handlePago = (tipoPagoID) => {
    let pagoActual = tipoPagos.find(
      (pago) => Number(pago.id) === Number(tipoPagoID)
    );
    return pagoActual && pagoActual.tipo;
  };

  const handleEstado = (estadoID) => {
    let estadoActual = estados.find(
      (estado) => Number(estado.id) === Number(estadoID)
    );
    return estadoActual && estadoActual.tipo;
  };

  useEffect(() => {
    dispatch(getEstados());
    dispatch(getTipoPago());
    const carrito = document.querySelector(".carrito");
    carrito.classList.add("bg-teal-700");

    const handleStorageChange = () => {
      const savedInputs = localStorage.getItem("inputs");
      if (savedInputs) {
        setInputData(JSON.parse(savedInputs));
      }
    };

    // Llamar a la función de manejo del evento de cambio al cargar la página
    handleStorageChange();

    // Agregar el listener del evento de cambio en el localStorage usando useEffect
    window.addEventListener("storage", handleStorageChange);

    // Eliminar el listener del evento de cambio en el localStorage al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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
                      {inputData
                        .filter(
                          (input) =>
                            input.estadoID !== "4" && input.estadoID !== "5"
                        )
                        .map((input, index) => (
                          <tr className="border-b-2 not:last-child" key={index}>
                            <td className="text-left px-10 py-5">
                              <p className="text-gray-700 mt-2">
                                <b>{input.productos.join(", ")}</b>
                              </p>
                              <p className="text-gray-700 mt-2">
                                <b>Fecha: </b>
                                {input.creacionFecha} <b>Hora: </b>
                                {input.creacionHora}
                              </p>
                            </td>
                            <td className="text-center px-10 py-2">
                              ${input.precio}
                              <p className="text-gray-700 mt-2">
                                Método de Pago:{" "}
                                <b>{handlePago(input.tipoPagoID)}</b>
                              </p>
                            </td>
                            <td className="text-center px-10 py-2">
                              {handleEstado(input.estadoID)}
                            </td>
                          </tr>
                        ))
                        .reverse()}
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
