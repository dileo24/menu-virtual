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
import { io } from "socket.io-client";

export default function HacerPedido1() {
  const carrito = useSelector((state) => state.carrito);
  const [preciosArray, setPreciosArray] = useState([]);
  const [nombresProdArray, setNombresProdArray] = useState([]);
  const [indiceItemEliminar, setIndiceItemEliminar] = useState(null);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  let precioFinal = 0;
  for (let i = 0; i < preciosArray.length; i++) {
    precioFinal += parseInt(preciosArray[i]);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTipoPago());
    dispatch(getPedidos());
  }, [dispatch]);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEliminarItemCarrito = (id, index) => {
    setIndiceItemEliminar(index);
    setTimeout(() => {
      dispatch(eliminarItemCarrito(id));
      setIndiceItemEliminar(null);
      if (carrito.length === 1) {
        navigate("/");
      }
    }, 200);
  };

  useEffect(() => {
    const precios = carrito.map((carritoItem) => carritoItem.precio);
    setPreciosArray(precios);

    const nombres = carrito.map((carritoItem) => carritoItem.nombre);
    setNombresProdArray(nombres);
  }, [carrito]);

  const handleVaciar = () => {
    dispatch(limpiarCarrito());
    navigate("/");
  };

  return (
    <div className="desplegables">
      <div className="desplegable1">
        <div className="scrollable-content">
          <header className="header1">
            <Link className="ocultarBtn" to={"/"}>
              <span className="arrow-left"></span>
            </Link>
            <div className="titleHeader1">Mi Pedido</div>
          </header>
          {carrito.length > 0 && (
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
                        <div className="iconContainer1">
                          <Link
                            to={`/updateItems/${prod.id}/${index}`}
                            className="editarItems"
                          >
                            <HiOutlinePencil className="editarIcon" />
                          </Link>
                        </div>
                      )}
                      <div className="iconContainer2">
                        <VscTrash
                          className="eliminarIcon"
                          onClick={() => {
                            handleEliminarItemCarrito(prod.id, index);
                          }}
                        />
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
            </>
          )}
        </div>
        <div className="footer1">
          <p>Total</p>
          <p>${precioFinal}</p>
          <div className="footer">
            <Link className="botonFooter" to={"/hacerPedido"}>
              <b className="siguiente">Siguiente</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
