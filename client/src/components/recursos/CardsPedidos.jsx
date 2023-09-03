import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEstados,
  getPedidos,
  getTipoPago,
  updatePedido,
} from "../../redux/actions";
import {
  BsCashStack,
  BsCashCoin /* , BsCheckLg, BsClock */,
} from "react-icons/bs";
import { SiMercadopago } from "react-icons/si";
import { TbBrandCashapp } from "react-icons/tb";
import { AiOutlineCreditCard } from "react-icons/ai";
import io from "socket.io-client";

export default function CardsPedidos({
  estado,
  openCardId,
  setOpenCardId,
  currentSlide,
}) {
  const pedidos = useSelector((state) => state.pedidos);
  const estados = useSelector((state) => state.estados);
  // const tipoPagos = useSelector((state) => state.tipoPagos);
  const dispatch = useDispatch();
  const [nuevosPedidos, setNuevosPedidos] = useState([]);
  const token = useSelector((state) => state.userActual.tokenSession);
  const [socket, setSocket] = useState(null);
  const productos = useSelector((state) => state.productos);
  const vertical = window.innerHeight > window.innerWidth;

  useEffect(() => {
    dispatch(getPedidos());
    dispatch(getEstados());
    dispatch(getTipoPago());
  }, [dispatch]);

  useEffect(() => {
    // Local
    const socket = io("http://localhost:3001");

    // Deploy
    // const socket = io("https://menu-virtual-production-9dbc.up.railway.app");

    setSocket(socket);
    socket.on("nuevoPedidoRecibido", (pedido) => {
      setNuevosPedidos((prevPedidos) => [pedido, ...prevPedidos]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (nuevosPedidos.length > 0) {
      const pedidosActualizados = [...nuevosPedidos, ...pedidos];
      dispatch(getPedidos(pedidosActualizados));
      setNuevosPedidos([]);
    }
  }, [nuevosPedidos, pedidos, dispatch]);

  const handleSelectChange = (e, id, atributo) => {
    const value = e.target.value;
    const data = { [atributo]: value };
    dispatch(updatePedido(id, data, token))
      .then(() => {
        if (socket) {
          socket.emit("cambiarEstadoPedido", id, data.estadoID);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  const openCard = (id) => {
    if (openCardId === id) {
      setOpenCardId(null); // Cerrar la tarjeta si ya está abierta
    } else {
      setOpenCardId(id); // Abrir la tarjeta con el ID especificado
    }
  };

  const openCardOnly = (id) => {
    if (openCardId !== id) {
      setOpenCardId(id); // Abrir la tarjeta con el ID especificado
    }
  };

  const sortedPedidos = pedidos.sort((a, b) => {
    const horaA = a.creacionHora;
    const horaB = b.creacionHora;

    return horaB.localeCompare(horaA);
  });

  const prodPorNom = (productName) => {
    const product = productos.find((p) => p.nombre === productName);
    return product && product.combo;
  };

  const itemsArrayFunc = (itemsExtra) => {
    let items = JSON.parse(itemsExtra);
    return items;
  };

  useEffect(() => {
    setOpenCardId(null);
  }, [currentSlide]);

  const diapoContainerPC = document.querySelectorAll(".diapoContainerPC");
  if (diapoContainerPC) {
    diapoContainerPC.forEach((subdiapoContainerPC) => {
      subdiapoContainerPC.style.height = `calc(${window.innerHeight}px - 12vh)`;
    });
  }

  const asideHeaderPC = document.querySelectorAll(".asideHeaderPC");
  if (asideHeaderPC) {
    asideHeaderPC.forEach((subasideHeaderPC) => {
      subasideHeaderPC.style.height = `calc(${window.innerHeight}px - 12vh)`;
    });
  }

  return (
    <div className={vertical ? "diapoContainerMobile" : "diapoContainerPC"}>
      {pedidos &&
        pedidos
          .filter((pedido) => (estado ? pedido.EstadoId === estado : true))
          .map(
            ({
              productos,
              mesa,
              aclaraciones,
              precio,
              Estado,
              itemsExtra,
              creacionHora,
              Pago,
              id,
              estadoID,
            }) => (
              <div
                className="cardPedido"
                key={id}
                onClick={() => {
                  !vertical && openCardOnly(id);
                }}
              >
                <div className="mainCard">
                  <div className="supBar">
                    <div className="mesaEstado">
                      <p className="subtitle">Mesa {mesa}</p>
                      <p
                        className={`estado ${
                          Estado && clasePorEstado(Estado.id)
                        }`}
                      >
                        <span className="circle">•</span>
                        <span>
                          {Estado ? (
                            <select
                              className="estadoSelect"
                              id=""
                              value={Estado.id}
                              onChange={(e) =>
                                handleSelectChange(e, id, "estadoID")
                              }
                            >
                              {estados.map((est) => (
                                <option
                                  className="estadoOption"
                                  key={est.id}
                                  value={est.id}
                                >
                                  {est.tipo}
                                </option>
                              ))}
                            </select>
                          ) : (
                            estadoID && (
                              <select
                                id=""
                                value={estadoID}
                                onChange={(e) =>
                                  handleSelectChange(e, id, "estadoID")
                                }
                              >
                                {estados.map((est) => (
                                  <option key={est.id} value={est.id}>
                                    {est.tipo}
                                  </option>
                                ))}
                              </select>
                            )
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="hora">{creacionHora}</div>
                    {vertical && (
                      <div
                        className={
                          openCardId === id ? "arrow-up" : "arrow-down"
                        }
                        onClick={() => openCard(id)}
                      ></div>
                    )}
                  </div>
                  {openCardId === id && (
                    <>
                      {productos.map((producto, i) => {
                        const items = itemsExtra && itemsArrayFunc(itemsExtra);
                        return (
                          <div key={i} className="nombreItems">
                            <p className="nombre">
                              {producto}
                              <span className="precioIndiv">
                                ${prodPrecio(producto)}
                              </span>
                            </p>
                            {prodPorNom(producto) && (
                              <ul className="itemsExtra">
                                {items[i].map((item, j) => (
                                  <li key={j} className="list-item">
                                    <span className="list-item-circle"></span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                {openCardId === id && (
                  <div className="footerCard">
                    <div className="dinero">
                      <p className="metodoDePago subtitle">
                        {iconPago(Pago.id)}
                        <span className="tipoPago">{Pago.tipo}</span>
                      </p>
                      <div className="precio">
                        <p className="total">Total: </p>
                        <p className="subtitle">${precio}</p>
                      </div>
                    </div>
                    {aclaraciones && (
                      <div className="aclaraciones">
                        <p>
                          Aclaraciones: <span>{aclaraciones}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          )}
    </div>
  );
}
