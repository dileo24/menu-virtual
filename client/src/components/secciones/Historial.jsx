import React, { useEffect, useState } from "react";
// import Header from "../recursos/Header";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../redux/actions";
import io from "socket.io-client";
import HeaderBack from "../recursos/HeaderBack";
import {
  BsCreditCardFill,
  BsCashStack,
  BsCashCoin,
  BsCheckLg,
  BsClock,
} from "react-icons/bs";
import { SiMercadopago } from "react-icons/si";
import { TbBrandCashapp } from "react-icons/tb";
import { GiCook } from "react-icons/gi";

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
  const iconPago = (pagoId) => {
    switch (pagoId) {
      case 1:
        return <BsCashCoin />;
      case 2:
        return <BsCashStack />;
      case 3:
        return <BsCreditCardFill />;
      case 4:
        return <SiMercadopago />;
      case 5:
        return <TbBrandCashapp />;
      default:
        return null;
    }
  };
  const iconEstado = (estadoId) => {
    switch (estadoId) {
      case 1:
        return <BsClock />;
      case 2:
        return <GiCook />;
      case 3:
        return <BsCheckLg />;
      default:
        return null;
    }
  };
  const getClassForEstado = (estadoId) => {
    switch (estadoId) {
      case 1:
        return "estado-info";
      case 2:
        return "estado-naranja";
      case 3:
        return "estado-success";
      default:
        return "estado-info";
    }
  };

  return pedidos &&
    pedidosActuales.length > 0 &&
    pedidosActuales.some(
      (pedido) =>
        pedido[0] && pedido[0].EstadoId !== 4 && pedido[0].EstadoId !== 5
    ) ? (
    <div className="historialContainer">
      <HeaderBack
        url={"/"}
        arrowType={"left"}
        title={`Mis Pedidos Realizados`}
      />
      {pedidosActuales
        .filter(
          (pedido) =>
            pedido[0] && pedido[0].Estado.id !== 4 && pedido[0].Estado.id !== 5
        )
        .map(
          (pedido, index) =>
            pedido[0] && (
              <div className="cardPedido" key={index}>
                <div className="nombreItemsPrecio">
                  <div className="supBar">
                    <p className="estado-info">Mesa {pedido[0].mesa}</p>
                    <p
                      className={`estado ${getClassForEstado(
                        pedido[0].Estado.id
                      )}`}
                    >
                      {iconEstado(pedido[0].Estado.id)}
                      <span style={{ marginLeft: "5px" }}>
                        {pedido[0].Estado.tipo}
                      </span>
                    </p>
                  </div>
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
                  <div className="footerPed">
                    <p className="metodoDePago estado-success">
                      {iconPago(pedido[0].Pago.id)}
                      <span style={{ marginLeft: "5px" }}>
                        {pedido[0].Pago.tipo}
                      </span>
                    </p>
                    <p className="total">Total: </p>
                    <p className="precio">${pedido[0].precio}</p>
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  ) : (
    <div className="historialContainer">
      <HeaderBack
        url={"/"}
        arrowType={"left"}
        title={`Mis Pedidos Realizados`}
      />
      <p className="alerta">No hay pedidos pendientes</p>
    </div>
  );
}
