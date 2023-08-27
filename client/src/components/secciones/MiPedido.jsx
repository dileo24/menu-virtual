import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  eliminarItemCarrito,
  getPedidos,
  getTipoPago,
  limpiarCarrito,
} from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi2";
import { VscTrash } from "react-icons/vsc";
import HeaderBack from "../recursos/HeaderBack";
import HacerPedido from "../formularios/HacerPedido";
// import Alerta from "../recursos/Alerta";
import bandeja from "../../multmedia/bandeja.svg";

export default function MiPedido({
  setEditarItemProd,
  setIndexProd,
  setProdID,
  /*  setMiPedido,
  setHistorial, */
}) {
  const carrito = useSelector((state) => state.carrito);
  const [preciosArray, setPreciosArray] = useState([]);
  const [hacerPedido, setHacerPedido] = useState(false);
  const [nombresProdArray, setNombresProdArray] = useState([]);
  const [indiceItemEliminar, setIndiceItemEliminar] = useState(null);
  const navigate = useNavigate();
  let precioFinal = 0;
  for (let i = 0; i < preciosArray.length; i++) {
    precioFinal += parseInt(preciosArray[i]);
  }
  const dispatch = useDispatch();
  const [alertaAviso, setAlertaAviso] = useState(false);

  useEffect(() => {
    dispatch(getTipoPago());
    dispatch(getPedidos());
  }, [dispatch]);

  useEffect(() => {
    !preciosArray.length && setHacerPedido(false);
  }, [preciosArray]);

  const handleEliminarItemCarrito = (id, index) => {
    setIndiceItemEliminar(index);
    setTimeout(() => {
      dispatch(eliminarItemCarrito(id));
      setIndiceItemEliminar(null);
    }, 200);
  };

  useEffect(() => {
    if (!carrito.length) {
      navigate("/");
    }

    const precios = carrito.map((carritoItem) => carritoItem.precio);
    setPreciosArray(precios);

    const nombres = carrito.map((carritoItem) => carritoItem.nombre);
    setNombresProdArray(nombres);
  }, [carrito]);

  const handleVaciar = () => {
    dispatch(limpiarCarrito());
  };

  const vertical = window.innerHeight > window.innerWidth;

  const miPedidoPC = document.querySelector(".miPedidoPC");
  if (miPedidoPC) {
    miPedidoPC.style.height = `calc(${window.innerHeight}px - 20vh)`;
  }

  const miPedidoMobile = document.querySelector(".miPedidoMobile");
  if (miPedidoMobile) {
    miPedidoMobile.style.minHeight = `${window.innerHeight}px`;
  }

  useEffect(() => {
    const fondoAlertaPedidoPC = document.querySelector(".fondoAlertaPedidoPC");
    if (fondoAlertaPedidoPC) {
      fondoAlertaPedidoPC.style.height = `calc(${window.innerHeight}px - 20vh)`;
    }
  }, [alertaAviso]);

  const handleEdit = (index, prod) => {
    if (!vertical) {
      setEditarItemProd(true);
      setIndexProd(index);
      setProdID(prod.id);
    }
  };

  return (
    <>
      <div className={vertical ? "miPedidoMobile" : "miPedidoPC"}>
        <div className="desplegable1">
          <div className="scrollable-content">
            {vertical && (
              <div className="headerAtras">
                <HeaderBack
                  url={"/"}
                  arrowType={"left"}
                  title={`Mi`}
                  span={"Pedido"}
                />
              </div>
            )}

            {carrito.length > 0 ? (
              <>
                {carrito.map((prod, index) => (
                  <div
                    key={index}
                    className={`cardProducto ${
                      index === indiceItemEliminar ? "animate-slide-right" : ""
                    }`}
                  >
                    <div className="nombreItemsPrecio">
                      <div className="nombrePrecio">
                        <p className="nombre">{prod.nombre}</p>
                        <p className="precio">${prod.precio}</p>
                      </div>
                      {prod && prod.itemsExtra && (
                        <ul className="itemsExtra">
                          {prod.itemsExtra.map((item, index) => (
                            <li key={index} className="list-item">
                              <span className="list-item-circle"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="accionesCont">
                      <div className="acciones">
                        {prod.itemsExtra && (
                          <div
                            className="iconContainer1"
                            onClick={() => handleEdit(index, prod)}
                          >
                            {vertical ? (
                              <Link
                                to={`/updateItems/${prod.id}/${index}`}
                                className="editarItems"
                              >
                                <HiOutlinePencil className="editarIcon" />
                              </Link>
                            ) : (
                              <button
                                className="editarItems"
                                /* onClick={() => {
                                  setEditarItemProd(true);
                                  setIndexProd(index);
                                  console.log(index);
                                  setProdID(prod.id);
                                }} */
                              >
                                <HiOutlinePencil className="editarIcon" />
                              </button>
                            )}
                          </div>
                        )}
                        <div
                          className="iconContainer2"
                          onClick={() => {
                            handleEliminarItemCarrito(prod.id, index);
                          }}
                        >
                          <VscTrash className="eliminarIcon" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="vaciarCont">
                  <button className="vaciarBtn" onClick={handleVaciar}>
                    Vaciar Pedido
                  </button>
                </div>
                <div className="footer1">
                  <p>Total</p>
                  <p>${precioFinal}</p>
                  <div className="footer">
                    {vertical ? (
                      <Link
                        className={`botonFooter ${
                          preciosArray.length ? "btnNaranja" : "btnGris"
                        }`}
                        to={"/hacerPedido"}
                      >
                        <b className="siguiente">Siguiente</b>
                      </Link>
                    ) : (
                      <button
                        className={`botonFooter ${
                          preciosArray.length ? "btnNaranja" : "btnGris"
                        }`}
                        onClick={() =>
                          preciosArray.length &&
                          setAlertaAviso({
                            estadoActualizado: true,
                            texto: `Para hacer un pedido, debes estar presencialmente en el local.`,
                          })
                        }
                      >
                        <b className="siguiente">Siguiente</b>
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // <div className={vertical ? "historialMobile2" : "historialPC2"}>
              <div className="centro">
                <img src={bandeja} alt="bandeja" className="icon" />
                <p className="alerta">
                  ¡Comienza a sumar productos a tu pedido!
                </p>
              </div>
              // </div>
            )}
          </div>
        </div>
        {alertaAviso && (
          <div
            className={vertical ? "fondoAlertaMobile" : "fondoAlertaPedidoPC"}
          >
            <div className="aviso">
              <p className="titulo">¿Estás en el local?</p>
              <p className="texto">
                Para hacer un pedido debes estar presencialmente en el local
              </p>
              <div className="btnCont">
                <button
                  className="cancelar"
                  onClick={() => {
                    setAlertaAviso(false);
                  }}
                >
                  No estoy en el local
                </button>
                <button
                  className="aceptarAviso"
                  onClick={() => {
                    setAlertaAviso(false);
                    setHacerPedido(true);
                  }}
                >
                  Sí estoy en el local
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {hacerPedido && preciosArray.length && (
        <HacerPedido
          setHacerPedido={setHacerPedido}
          /* setMiPedido={setMiPedido}
          setHistorial={setHistorial} */
        />
      )}
    </>
  );
}
