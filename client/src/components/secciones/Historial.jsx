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
    // Local
    const socket = io("http://localhost:3001");

    // Deploy
    // const socket = io("https://menu-virtual-production-9dbc.up.railway.app");

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

  console.log(pedidosActuales);
  console.log(inputData);
  console.log(pedidos);

  return pedidos &&
    pedidosActuales.length > 0 &&
    pedidosActuales.some(
      (pedido) =>
        pedido[0] && pedido[0].EstadoId !== 4 && pedido[0].EstadoId !== 5
    ) ? (
    <div className="historialContainer">
      <header className="header1">
        <Link to="/" className="ocultarBtn">
          <span className="arrow-left"></span>
        </Link>
        <h1 className="titleHeader1">Mis Pedidos Realizados</h1>
      </header>
      {
        pedidosActuales
          .filter(
            (pedido) =>
              pedido[0] &&
              pedido[0].Estado.id !== 4 &&
              pedido[0].Estado.id !== 5
          )
          .map(
            (pedido, index) =>
              pedido[0] && (
                <div className="cardPedido" key={index}>
                  <div className="nombreItemsPrecio">
                    <div className="nombreItems">
                      {pedido[0].productos.map((producto, i) => (
                        <div key={i}>
                          <p className="nombre">{producto}</p>
                          {pedido[0].itemsExtra[i] &&
                            pedido[0].itemsExtra[i].length > 0 && (
                              <ul className="itemsExtra">
                                {pedido[0].itemsExtra[i].map((item, j) => (
                                  <li key={j} className="list-item">
                                    <span className="list-item-circle"></span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>
                      ))}
                    </div>
                    <p className="precio">${pedido[0].precio}</p>
                  </div>

                  {/* <p className="metodoDePago">{pedido[0].Pago.tipo}</p> */}
                  {/* <p className="estado">{pedido[0].Estado.tipo}</p> */}
                </div>
              )
          )
        /* .reverse() */
      }
    </div>
  ) : (
    <div className="historialContainer">
      <header className="header1">
        <Link to="/" className="ocultarBtn">
          <span className="arrow-left"></span>
        </Link>
        <div className="titleHeader1">Mis Pedidos Realizados</div>
      </header>
      <p className="alerta">No hay pedidos pendientes</p>
    </div>
  );
}
