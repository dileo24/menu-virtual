import React, { useEffect, useState } from "react";
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
  const clasePorEstado = (estadoId) => {
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
  const prodPorNom = (productName) => {
    const product = productos.find((p) => p.nombre === productName);
    return product ? product.precio : 0;
  };

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

        {pedidos.map(
          ({
            productos,
            mesa,
            aclaraciones,
            precio,
            Estado,
            itemsExtra,
            creacionFecha,
            creacionHora,
            Pago,
            id,
            estadoID,
            tipoPagoID,
          }) => (
            <div key={id}>
              {/* <div key={id} className="cardPedido">
                <div>
                  <p>{productos.join(", ")}</p>
                  {itemsExtra ? (
                    <p>
                      <b>Extra:</b>
                      {itemsString(itemsExtra)}.
                    </p>
                  ) : (
                    ""
                  )}
                  {aclaraciones ? (
                    <p>
                      <b> Aclaraciones:</b> {aclaraciones}.
                    </p>
                  ) : (
                    ""
                  )}
                  <p>
                    <b> Realizado el:</b>{" "}
                    {creacionFecha + " a las " + creacionHora}.
                  </p>
                </div>
                <div>
                  <p>{mesa}</p>
                </div>
                <div>
                  <p>${precio}</p>
                </div>
                <div>
                  {Estado ? (
                    <select
                      id=""
                      value={Estado.id}
                      onChange={(e) => handleSelectChange(e, id, "estadoID")}
                    >
                      {estados.map((est) => (
                        <option key={est.id} value={est.id}>
                          {est.tipo}
                        </option>
                      ))}
                    </select>
                  ) : (
                    estadoID && (
                      <select
                        id=""
                        value={estadoID}
                        onChange={(e) => handleSelectChange(e, id, "estadoID")}
                      >
                        {estados.map((est) => (
                          <option key={est.id} value={est.id}>
                            {est.tipo}
                          </option>
                        ))}
                      </select>
                    )
                  )}
                </div>
                <div>
                  {Pago ? (
                    <p key={Pago.id}>{Pago.tipo}</p>
                  ) : (
                    tipoPorID(tipoPagoID) && <p>{tipoPorID(tipoPagoID)}</p>
                  )}
                </div>
              </div> */}
              <div className="cardPedido">
                <div className="nombreItemsPrecio">
                  <div className="supBar">
                    <p className="estado-info">Mesa {mesa}</p>
                    <p className={`estado ${clasePorEstado(Estado.id)}`}>
                      {iconEstado(Estado.id)}
                      <span style={{ marginLeft: "5px" }}>{Estado.tipo}</span>
                    </p>
                  </div>
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
                </div>
                <div className="footerPed">
                  <p className="metodoDePago estado-success">
                    {iconPago(Pago.id)}
                    <span style={{ marginLeft: "5px" }}>{Pago.tipo}</span>
                  </p>
                  <p className="total">Total: </p>
                  <p className="precio">${precio}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    )
  );
}
