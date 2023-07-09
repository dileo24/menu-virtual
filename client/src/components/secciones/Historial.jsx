import React, { useEffect, useState } from "react";
// import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../redux/actions";
import io from "socket.io-client";
import { Link } from "react-router-dom";

export default function Historial() {
  const pedidos = useSelector((state) => state.pedidos);
  const [inputData, setInputData] = useState([]);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    dispatch(getPedidos());

    const handleStorageChange = () => {
      const savedInputs = localStorage.getItem("inputs");
      if (savedInputs) {
        setInputData(JSON.parse(savedInputs));
      }
    };

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("estadoPedidoActualizado", (pedidoId, nuevoEstado) => {
        dispatch(getPedidos());
      });
    }
  }, [socket, dispatch]);

  let pedidosActuales = inputData.map((idPed) =>
    pedidos.filter((ped) => ped.id === idPed.id)
  );

  return (
    pedidos &&
    pedidosActuales.length > 0 && (
      <div id="productos" className="min-h-100 bg-gray-200">
        <div className="md:flex min-h-screen md:align-top">
          {/* <Header /> */}
          <Link to="/" className="">
            Atrás
          </Link>
          <main className="md:w-4/5 xl:w-4/5  py-10 bg-gray-200">
            <h2 className="text-3xl font-light text-center">
              Mis pedidos realizados
            </h2>
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
                      {pedidosActuales
                        .filter(
                          (pedido) =>
                            pedido[0] &&
                            pedido[0].Estado.id !== 4 &&
                            pedido[0].Estado.id !== 5
                        )
                        .map(
                          (pedido, index) =>
                            pedido[0] && (
                              <tr
                                className="border-b-2 not:last-child"
                                key={index}
                              >
                                <td className="text-left px-10 py-5">
                                  {
                                    <>
                                      <p className="text-gray-700 mt-2">
                                        <b>{pedido[0].productos}</b>
                                      </p>
                                      <p className="text-gray-700 mt-2">
                                        <b>Extra:</b>{" "}
                                        {pedido[0].itemsExtra
                                          .filter((item) => item !== null)
                                          .join(", ")}
                                      </p>
                                      <p className="text-gray-700 mt-2">
                                        <b>Fecha: </b>
                                        {pedido[0].creacionFecha} <b>Hora: </b>
                                        {pedido[0].creacionHora}
                                      </p>
                                    </>
                                  }
                                </td>
                                <td className="text-center px-10 py-2">
                                  {
                                    <>
                                      ${pedido[0].precio}
                                      <p className="text-gray-700 mt-2">
                                        Método de Pago:{" "}
                                        <b>{pedido[0].Pago.tipo}</b>
                                      </p>
                                    </>
                                  }
                                </td>
                                <td className="text-center px-10 py-2">
                                  {pedido[0].Estado.tipo}
                                </td>
                              </tr>
                            )
                        )
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
