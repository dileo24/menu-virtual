import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  eliminarItemCarrito,
  getPedidos,
  getTipoPago,
  limpiarCarrito,
} from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { createPedido } from "../../redux/actions";
import { HiOutlinePencil } from "react-icons/hi2";
import { VscTrash } from "react-icons/vsc";
import { AiOutlineBank } from "react-icons/ai";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { AiOutlineCreditCard } from "react-icons/ai";
import mercadoPago from "../../multmedia/mercadopago.svg";

export default function HacerPedido() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const carrito = useSelector((state) => state.carrito);
  let marginTop = carrito.length > 0 ? "" : "margen";
  const pedidos = useSelector((state) => state.pedidos);
  const [preciosArray, setPreciosArray] = useState([]);
  const [nombresProdArray, setNombresProdArray] = useState([]);
  let precioFinal = 0;
  for (let i = 0; i < preciosArray.length; i++) {
    precioFinal += parseInt(preciosArray[i]);
  }
  // const itemsExtraArray = useSelector((state) => state.itemsExtra);
  const dispatch = useDispatch();
  const [MostrarMenu, setMostrarMenu] = useState(false);
  const [MostrarMenu2, setMostrarMenu2] = useState(false);
  const [verOcultar, setVerOcultar] = useState("Ver mi pedido");
  const userActual = useSelector((state) => state.userActual);
  const tipoPagos = useSelector((state) => state.tipoPagos);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;
  let id = pedidos.length + 1;

  const [input, setInput] = useState({
    productos: nombresProdArray,
    precio: precioFinal,
    mesa: "",
    aclaraciones: "",
    tipoPagoID: "",
    estadoID: "1",
    itemsExtra: [],
    creacionFecha: formattedDate,
    creacionHora: formattedTime,
  });
  useEffect(() => {
    dispatch(getTipoPago());
    dispatch(getPedidos());
  }, [dispatch]);

  useEffect(() => {
    const precios = carrito.map((carritoItem) => carritoItem.precio);
    setPreciosArray(precios);

    const nombres = carrito.map((carritoItem) => carritoItem.nombre);
    setNombresProdArray(nombres);

    setInput((prevInput) => ({
      ...prevInput,
      productos: nombres,
      precio: precios.reduce((acc, curr) => acc + parseInt(curr), 0),
    }));
  }, [carrito]);

  useEffect(() => {
    if (MostrarMenu) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
  }, [MostrarMenu]);

  const handleEliminarItemCarrito = (id) => {
    dispatch(eliminarItemCarrito(id));
    if (carrito.length === 1) {
      handleOcultarMenu1();
    }
  };

  // Mostrar u ocultar Menús desplegables
  const handleOnClick = () => {
    if (!MostrarMenu) {
      setMostrarMenu(!MostrarMenu);
      if (MostrarMenu2) {
        setMostrarMenu2(!MostrarMenu2);
      }
    } else {
      if (carrito.length) {
        setMostrarMenu2(!MostrarMenu2);
        setMostrarMenu(MostrarMenu);
      } else {
        alert("Tu carrito está vacío");
      }
    }
    if (verOcultar === "Ver mi pedido") {
      setVerOcultar("Siguiente");
    }
  };

  const handleMostrarMenu1 = () => {
    if (MostrarMenu2) {
      setMostrarMenu2(!MostrarMenu2);
    }
    setMostrarMenu(MostrarMenu);
    setVerOcultar("Siguiente");
  };

  const handleOcultarMenu1 = () => {
    const desplegable1 = document.querySelector(".desplegable1");
    desplegable1.classList.add("animate-slide-down");
    setTimeout(() => {
      desplegable1.classList.remove("animate-slide-down");
      setMostrarMenu(!MostrarMenu);
      if (verOcultar === "Ver mi pedido") {
        setVerOcultar("Siguiente");
      } else {
        setVerOcultar("Ver mi pedido");
      }
    }, 200);
  };

  //formulario
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectTipo = (e) => {
    if (input.tipoPagoID !== e.target.value) {
      setSelectedPayment(e.target.value);
      setInput({
        ...input,
        tipoPagoID: e.target.value,
      });
    }
  };

  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (carrito.length) {
      // Validación de longitud de aclaraciones
      if (input.aclaraciones.length > 50) {
        alert("Las aclaraciones deben tener hasta 50 caracteres");
        return;
      }

      // Obtener la lista de inputs previamente almacenados
      let storedInputs = localStorage.getItem("inputs");
      if (storedInputs) {
        storedInputs = JSON.parse(storedInputs);
      } else {
        storedInputs = []; // Si no hay inputs previos, crear una lista vacía
      }

      // Agregar el nuevo input a la lista de inputs almacenados
      storedInputs.push({ id });

      // Guardar la lista actualizada de inputs en el localStorage
      localStorage.setItem("inputs", JSON.stringify(storedInputs));
      console.log(input);
      dispatch(createPedido(input));
      dispatch(limpiarCarrito());
      setInput({
        productos: [],
        precio: "",
        mesa: "",
        aclaraciones: "",
        tipoPagoID: "",
        estadoID: "1",
        itemsExtra: [],
        creacionFecha: "",
        creacionHora: "",
      });
      alert(
        "Pedido realizado con éxito. En un momento te lo llevamos a tu mesa."
      );
      navigate("/carrito");
    } else {
      alert("Error: No elegiste ningún producto del Menú");
    }
  };

  return (
    <>
      {/* Botón del footer */}
      {userActual ? null : (
        <>
          <footer className={`footer ${marginTop}`}>
            <button className="botonFooter" onClick={handleOnClick}>
              {!MostrarMenu && (
                <div className="cantidad">{preciosArray.length}</div>
              )}
              <b className="verPedido">{verOcultar}</b>
              {!MostrarMenu && <div className="precio">${precioFinal}</div>}
            </button>
          </footer>
        </>
      )}

      <div className="desplegables">
        {/* Menu desplegable 1*/}
        {MostrarMenu && (
          <div className="desplegable1 animate-slide-up">
            <div className="scrollable-content">
              <div className="header1">
                <div className="ocultarBtn" onClick={handleOcultarMenu1}>
                  <span className="arrow-down"></span>
                </div>
                <div className="titleHeader1">Mi Pedido</div>
              </div>
              {carrito &&
                carrito.map((prod, id) => (
                  <div key={id} className="cardProducto">
                    <p className="nombre">{prod.nombre}</p>
                    <div className="precioAcciones">
                      <p className="precio">${prod.precio}</p>
                      <div className="acciones">
                        {prod.itemsExtra && (
                          <div className="iconContainer1">
                            <Link to="/items" className="editarItems">
                              <HiOutlinePencil className="editarIcon" />
                            </Link>
                          </div>
                        )}
                        <div className="iconContainer2">
                          <VscTrash
                            className="eliminarIcon"
                            onClick={() => {
                              handleEliminarItemCarrito(prod.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="footer1">
              <p>Total</p>
              <p>${precioFinal}</p>
            </div>
          </div>
        )}

        {/* Menu desplegable 2*/}
        {MostrarMenu2 && (
          <div className="desplegable2">
            <div className="scrollable-content">
              <div className="header1">
                <div className="ocultarBtn" onClick={handleMostrarMenu1}>
                  <span className="arrow-left"></span>
                </div>
                <div className="titleHeader1">Completar mi pedido</div>
              </div>

              <form
                id="formulario"
                className="formulario"
                onSubmit={(e) => handleSubmitForm(e)}
              >
                {/* ****** MESA ****** */}
                <div className="mesa">
                  <label className="mesaTitle" htmlFor="mesa">
                    Indique su número de mesa
                  </label>
                  <input
                    className="mesaInput"
                    id="nombre"
                    name="mesa"
                    type="number"
                    placeholder="N°"
                    value={input.mesa}
                    min={1}
                    max={20}
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* ****** ACLARACIONES ****** */}
                <div className="aclaraciones">
                  <label className="aclaracionesTitle" htmlFor="aclaraciones">
                    Aclaraciones
                  </label>
                  <textarea
                    className="aclaracionesInput"
                    id="aclaraciones"
                    name="aclaraciones"
                    type="text"
                    placeholder="Si necesitás algo, avisanos!"
                    min={0}
                    max={3}
                    value={input.aclaraciones}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* ****** MÉTODO DE PAGO ****** */}
                <div className="pago">
                  <label className="pagoTitle" htmlFor="precio">
                    Método de pago
                  </label>
                  <div>
                    {tipoPagos?.map((tipo) => (
                      <div
                        key={tipo.id}
                        className={`pagoInput ${
                          selectedPayment === Number(tipo.id) ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleSelectTipo({ target: { value: tipo.id } })
                        }
                      >
                        <div className="iconCheck">
                          <input
                            type="radio"
                            id={tipo.id}
                            name="metodoPago"
                            value={tipo.id}
                            className="check"
                            onChange={(e) => handleSelectTipo(e)}
                            checked={selectedPayment === Number(tipo.id)}
                            required
                          />
                          {tipo.id === 1 && (
                            <HiOutlineBanknotes className="icon" />
                          )}
                          {tipo.id === 2 && <AiOutlineBank className="icon" />}
                          {tipo.id === 3 && (
                            <AiOutlineCreditCard className="icon" />
                          )}
                          {tipo.id === 4 && (
                            <img
                              src={mercadoPago}
                              className="icon"
                              alt="mercadoPago"
                            />
                          )}
                        </div>

                        <label htmlFor={tipo.id} className="nombrePago">
                          {tipo.tipo}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ****** FOOTER ****** */}
                <div className="footer1">
                  <p>Total</p>
                  <p>${precioFinal}</p>
                </div>
                <div className="footer">
                  <div className="botonFooter">
                    <input
                      type="submit"
                      className="verPedido"
                      value="Hacer pedido"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
