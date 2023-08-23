import React, { useEffect, useState } from "react";
// import Header from "../recursos/Header";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos, getProductos } from "../../redux/actions";
import io from "socket.io-client";
import HeaderBack from "../recursos/HeaderBack";
import { BsCashStack, BsCashCoin, BsCheckLg, BsClock } from "react-icons/bs";
import { SiMercadopago } from "react-icons/si";
import { TbBrandCashapp } from "react-icons/tb";
import bandeja from "../../multmedia/bandeja.svg";
import { Link } from "react-router-dom";
import { AiOutlineCreditCard } from "react-icons/ai";

export default function Historial() {
  const pedidos = useSelector((state) => state.pedidos);
  const productos = useSelector((state) => state.productos);
  const [inputData, setInputData] = useState([]);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    dispatch(getPedidos());
    dispatch(getProductos());

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

  let pedidosActuales = inputData
    .map((idPed) => pedidos.filter((ped) => ped.id === idPed.id))
    .flat();

  const itemsArray = pedidosActuales.map((pedido) =>
    JSON.parse(pedido.itemsExtra)
  );
  const iconPago = (pagoId) => {
    switch (pagoId) {
      case 1:
        return <BsCashCoin />;
      case 2:
        return <BsCashStack />;
      case 3:
        return <AiOutlineCreditCard />;
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
        return <BsCheckLg />;
      case 3:
        return <TbBrandCashapp />;
      default:
        return null;
    }
  };
  const clasePorEstado = (estadoId) => {
    switch (estadoId) {
      case 1:
        return "estado-naranja";
      case 2:
        return "estado-info";
      case 3:
        return "estado-success";
      default:
        return "estado-cancelado";
    }
  };
  const prodPrecio = (productName) => {
    const product = productos.find((p) => p.nombre === productName);
    return product ? product.precio : 0;
  };
  const prodPorNom = (productName) => {
    const product = productos.find((p) => p.nombre === productName);
    return product && product.combo;
  };

  const vertical = window.innerHeight > window.innerWidth;

  const historialMobile2 = document.querySelector(".historialMobile2");
  if (historialMobile2) {
    historialMobile2.style.height = `${window.innerHeight}px`;
  }
  const historialPC2 = document.querySelector(".historialPC2");
  if (historialPC2) {
    historialPC2.style.height = `calc(${window.innerHeight}px - 20vh)`;
  }

  return pedidos &&
    pedidosActuales.length > 0 &&
    pedidosActuales.some(
      (pedido) => pedido && pedido.EstadoId !== 4 && pedido.EstadoId !== 5
    ) ? (
    <div className={vertical ? "historialMobile" : "historialPC"}>
      {vertical && (
        <HeaderBack url={"/"} arrowType={"left"} title={``} span={``} />
      )}
      {pedidosActuales
        .filter(
          (pedido) => pedido && pedido.Estado.id !== 4 && pedido.Estado.id !== 5
        )
        .map(
          (pedido, index) =>
            pedido && (
              <div className="cardPedido" key={index}>
                <div className="nombreItemsPrecio">
                  <div className="supBar">
                    <p className="estado-info">Mesa {pedido.mesa}</p>
                    <p className={`estado ${clasePorEstado(pedido.Estado.id)}`}>
                      {iconEstado(pedido.Estado.id)}
                      <span style={{ marginLeft: "5px" }}>
                        {pedido.Estado.tipo}
                      </span>
                    </p>
                  </div>
                  <>
                    {pedido.productos.map((producto, i) => (
                      <div key={i} className="nombreItems">
                        <p className="nombre">
                          {producto}
                          <span className="precioIndiv">
                            ${prodPrecio(producto)}
                          </span>
                        </p>
                        {prodPorNom(producto) &&
                        itemsArray[index].length === 1 ? (
                          <ul className="itemsExtra">
                            {itemsArray[index][0].map((item, j) => (
                              <li key={j} className="list-item">
                                <span className="list-item-circle"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          itemsArray[index].length > 1 &&
                          prodPorNom(producto) && (
                            <ul className="itemsExtra">
                              {itemsArray[index] &&
                                itemsArray[index][i].map((item, j) => (
                                  <li key={j} className="list-item">
                                    <span className="list-item-circle"></span>
                                    {item}
                                  </li>
                                ))}
                            </ul>
                          )
                        )}
                      </div>
                    ))}
                  </>
                </div>
                <div className="footerPed">
                  <p className="metodoDePago estado-success">
                    {iconPago(pedido.Pago.id)}
                    <span style={{ marginLeft: "5px" }}>
                      {pedido.Pago.tipo}
                    </span>
                  </p>
                  <p className="total">Total: </p>
                  <p className="precio">${pedido.precio}</p>
                </div>
              </div>
            )
        )}
    </div>
  ) : (
    <div className={vertical ? "historialMobile2" : "historialPC2"}>
      {vertical && (
        <HeaderBack url={"/"} arrowType={"left"} title={``} span={``} />
      )}

      <div className="centro">
        <img src={bandeja} alt="bandeja" className="icon" />
        <p className="alerta">¡Comienza a sumar productos a tu pedido!</p>
        <p className="alerta2">Aún no tienes pedidos hechos</p>
      </div>

      {vertical && (
        <div className="footer">
          <Link to={"/"} className="botonFooter btnVerMenu">
            Ver Menú
          </Link>
        </div>
      )}
    </div>
  );
}
