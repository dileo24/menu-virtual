import React, { useRef, useEffect, useState, useCallback } from "react";
import Header from "../recursos/Header";
import { useDispatch, useSelector } from "react-redux";
import Filtros from "../recursos/Filtros";
import {
  getEstados,
  getPedidos,
  getTipoPago,
  updatePedido,
} from "../../redux/actions";
import io from "socket.io-client";
import { BsCashStack, BsCashCoin, BsCheckLg, BsClock } from "react-icons/bs";
import { SiMercadopago } from "react-icons/si";
import { TbBrandCashapp } from "react-icons/tb";
import { AiOutlineCreditCard } from "react-icons/ai";
import Swipe from "react-swipe";

export default function Pedidos() {
  const pedidos = useSelector((state) => state.pedidos);
  const estados = useSelector((state) => state.estados);
  const tipoPagos = useSelector((state) => state.tipoPagos);
  const token = useSelector((state) => state.userActual.tokenSession);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [nuevosPedidos, setNuevosPedidos] = useState([]);
  /* let allPedidos = [...nuevosPedidos, ...pedidos]; */
  const productos = useSelector((state) => state.productos);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [diapoActual, setDiapoActual] = useState(0);
  const scrollableRef = useRef(null);
  const [estadoActiveId, setEstadoActiveId] = useState(0);
  const [inputData, setInputData] = useState([]);
  const [openCardId, setOpenCardId] = useState(null);

  useEffect(() => {
    scrollToEstadoActive();
    setEstadoActiveId(estados[currentSlide - 1]?.id);
  }, [currentSlide, estadoActiveId]);

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

  useEffect(() => {
    dispatch(getPedidos());
    dispatch(getEstados());
    dispatch(getTipoPago());
  }, [dispatch]);

  const handleSelectChange = (e, id, atributo) => {
    console.log(id);
    const value = e.target.value;
    const data = { [atributo]: value };
    let res = window.confirm("Está seguro de querer modificar este pedido?");
    if (res === true) {
      dispatch(updatePedido(id, data, token))
        .then(() => {
          if (socket) {
            socket.emit("cambiarEstadoPedido", id, data.estadoID);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const tipoPorID = (tipoPagoID) => {
    if (tipoPagos && tipoPagoID) {
      const tipo = tipoPagos.find((tipo) => tipo.id === tipoPagoID);
      return tipo.tipo;
    }
    return null;
  };

  const itemsString = (itemsExtra) => {
    if (typeof itemsExtra === "string") {
      const parsedItems = JSON.parse(itemsExtra);

      if (Array.isArray(parsedItems) && parsedItems.length > 0) {
        const flattenedItems = parsedItems.flat();

        const resultString = flattenedItems.join(", ");

        return resultString;
      }
    } else if (Array.isArray(itemsExtra)) {
      const resultString = itemsExtra.join(", ");

      return resultString;
    }
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
  const prodPorNom = (productName) => {
    const product = productos.find((p) => p.nombre === productName);
    return product ? product.precio : 0;
  };

  useEffect(() => {
    const diapo = document.querySelector(
      `.diapositiva[data-index="${currentSlide}"]`
    );
    if (diapo) {
      const diapoContainerHeight = diapo.offsetHeight;
      const swipe = document.querySelector(".swipe");
      swipe.style.maxHeight = `${diapoContainerHeight}px`;
    }
  }, [currentSlide, openCardId]);

  const handleSwipe = useCallback((index) => {
    setCurrentSlide(index);
    setDiapoActual(index);
    window.scrollTo({ top: 0 });
  }, []);

  const scrollToEstadoActive = () => {
    if (scrollableRef.current) {
      const activeCategory = scrollableRef.current.querySelector(".active");
      if (activeCategory) {
        const containerWidth = scrollableRef.current.offsetWidth;
        const categoryWidth = activeCategory.offsetWidth;
        const categoryLeft = activeCategory.offsetLeft;
        const scrollLeft = categoryLeft - (containerWidth - categoryWidth) / 2;

        scrollableRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  const openCard = (id) => {
    if (openCardId === id) {
      setOpenCardId(null); // Cerrar la tarjeta si ya está abierta
    } else {
      setOpenCardId(id); // Abrir la tarjeta con el ID especificado
    }
  };

  console.log(pedidos);

  return (
    pedidos && (
      <div id="productos" className="pedidosContainer">
        <Header />
        <h1 className="pedidosTitle">Pedidos</h1>
        <div className="navbar">
          <Filtros
            searchType="pedidos"
            searchWord={"pedidos"}
            setBusqueda={""}
            setCheckAlertaError={""}
            className="navbar"
          />
        </div>
        <div
          className="estados"
          ref={scrollableRef}
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          <button
            className={`menuBtn ${diapoActual === 0 ? "active" : ""}`}
            id="0"
            onClick={() => {
              setCurrentSlide(0);
              setDiapoActual(0);
              window.scrollTo({ top: 0 });
            }}
          >
            Todos
          </button>
          {estados &&
            estados.map((estado, index) => (
              <React.Fragment key={estado.id}>
                <button
                  className={`estado ${
                    currentSlide === index + 1 ? "active" : ""
                  }`}
                  id={estado.id}
                  onClick={() => {
                    setCurrentSlide(index + 1);
                    setDiapoActual(index + 1);

                    window.scrollTo({ top: 0 });
                  }}
                >
                  {estado.tipo}s
                </button>
              </React.Fragment>
            ))}
        </div>

        <Swipe
          className="swipe"
          swipeOptions={{
            startSlide: currentSlide,
            speed: 300,
            continuous: false,
            callback: handleSwipe,
          }}
        >
          {/* Todos */}
          <div className="diapositiva">
            <div className="diapoContainer">
              {pedidos.map(
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
                  <div className="cardPedido" key={id}>
                    <div className="mainCard">
                      <div className="supBar">
                        <div className="mesaEstado">
                          <p className="subtitle">Mesa {mesa}</p>
                          <p className={`estado ${clasePorEstado(Estado.id)}`}>
                            <span className="circle">•</span>
                            <span style={{ marginLeft: "5px" }}>
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
                        <div
                          className={
                            openCardId === id ? "arrow-up" : "arrow-down"
                          }
                          onClick={() => openCard(id)}
                        ></div>
                      </div>
                      {openCardId === id && (
                        <div className="nombreItems">
                          {productos.map((producto, i) => (
                            <div key={i}>
                              <p className="nombre">
                                {producto}{" "}
                                <span className="precioIndiv">
                                  ${prodPorNom(producto)}
                                </span>
                              </p>
                              {/* {itemsExtra[id].length > 0 && (
                            <ul className="itemsExtra">
                              {itemsExtra[id][i] &&
                                itemsExtra[id][i].map((item, j) => (
                                  <li key={j} className="list-item">
                                    <span className="list-item-circle"></span>
                                    {item}
                                  </li>
                                ))}
                            </ul>
                          )} */}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {openCardId === id && (
                      <div className="footerCard">
                        <div className="dinero">
                          <p className="metodoDePago subtitle">
                            {iconPago(Pago.id)}
                            <span style={{ marginLeft: "5px" }}>
                              {Pago.tipo}
                            </span>
                          </p>
                          <div className="precio">
                            <p className="total">Total: </p>
                            <p className="subtitle">${precio}</p>
                          </div>
                        </div>
                        <div className="aclaraciones">
                          {aclaraciones ? (
                            <p>
                              Aclaraciones: <span>{aclaraciones}.</span>
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Pendientes */}
          <div className="diapositiva">
            <div className="diapoContainer">
              {pedidos &&
                pedidos
                  .filter((pedido) => pedido.estadoID === 1)
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
                      <div className="cardPedido" key={id}>
                        <div className="mainCard">
                          <div className="supBar">
                            <div className="mesaEstado">
                              <p className="subtitle">Mesa {mesa}</p>
                              <p
                                className={`estado ${clasePorEstado(
                                  Estado.id
                                )}`}
                              >
                                <span className="circle">•</span>
                                <span style={{ marginLeft: "5px" }}>
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
                            <div
                              className={
                                openCardId === id ? "arrow-up" : "arrow-down"
                              }
                              onClick={() => openCard(id)}
                            ></div>
                          </div>
                          {openCardId === id && (
                            <div className="nombreItems">
                              {productos.map((producto, i) => (
                                <div key={i}>
                                  <p className="nombre">
                                    {producto}{" "}
                                    <span className="precioIndiv">
                                      ${prodPorNom(producto)}
                                    </span>
                                  </p>
                                  {/* {itemsExtra[id].length > 0 && (
                            <ul className="itemsExtra">
                              {itemsExtra[id][i] &&
                                itemsExtra[id][i].map((item, j) => (
                                  <li key={j} className="list-item">
                                    <span className="list-item-circle"></span>
                                    {item}
                                  </li>
                                ))}
                            </ul>
                          )} */}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {openCardId === id && (
                          <div className="footerCard">
                            <div className="dinero">
                              <p className="metodoDePago subtitle">
                                {iconPago(Pago.id)}
                                <span style={{ marginLeft: "5px" }}>
                                  {Pago.tipo}
                                </span>
                              </p>
                              <div className="precio">
                                <p className="total">Total: </p>
                                <p className="subtitle">${precio}</p>
                              </div>
                            </div>
                            <div className="aclaraciones">
                              {aclaraciones ? (
                                <p>
                                  Aclaraciones: <span>{aclaraciones}.</span>
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  )}
            </div>
          </div>

          {/* Entregados */}
          <div className="diapositiva">{/* <h1>Entregados</h1> */}</div>

          {/* Pagados */}
          <div className="diapositiva">{/* <h1>Pagados</h1> */}</div>

          {/* Cancelados */}
          <div className="diapositiva">{/* <h1>Cancelados</h1> */}</div>
        </Swipe>
      </div>
    )
  );
}
