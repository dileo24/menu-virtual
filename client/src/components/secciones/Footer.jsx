import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  eliminarItemCarrito,
  getPedidos,
  getTipoPago,
  limpiarCarrito,
} from "../../redux/actions";
import { Link } from "react-router-dom";

import { createPedido } from "../../redux/actions";
import { HiUserCircle } from "react-icons/hi";

export default function Footer() {
  const carrito = useSelector((state) => state.carrito);
  const pedidos = useSelector((state) => state.pedidos);
  const [preciosArray, setPreciosArray] = useState([]);
  const [nombresProdArray, setNombresProdArray] = useState([]);
  let precioFinal = 0;
  for (let i = 0; i < preciosArray.length; i++) {
    precioFinal += parseInt(preciosArray[i]);
  }
  const itemsExtraArray = useSelector((state) => state.itemsExtra);
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

  const handleEliminarItemCarrito = (id) => {
    dispatch(eliminarItemCarrito(id));
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
        const desplegable1 = document.querySelector(".desplegable1");
        if (!document.querySelector(".ocultar")) {
          desplegable1.classList.add("ocultar");
        } else {
          desplegable1.classList.remove("ocultar");
        }
      } else {
        alert("Tu carrito está vacío");
      }
    }
    if (verOcultar === "Ver mi pedido") {
      setVerOcultar("Siguiente");
    } else {
      setVerOcultar("Ver mi pedido");
    }
  };

  const handleMostrarMenu1 = () => {
    if (MostrarMenu2) {
      setMostrarMenu2(!MostrarMenu2);
      const desplegable1 = document.querySelector(".desplegable1");
      if (verOcultar === "Hacer pedido") {
        setVerOcultar("Siguiente");
      }
      if (!document.querySelector(".ocultar")) {
        desplegable1.classList.add("ocultar");
      } else {
        desplegable1.classList.remove("ocultar");
      }
    }
    setMostrarMenu(MostrarMenu);
    setVerOcultar("Siguiente");
  };

  const handleOcultarMenu1 = () => {
    setMostrarMenu(!MostrarMenu);
    if (verOcultar === "Ver mi pedido") {
      setVerOcultar("Siguiente");
    } else {
      setVerOcultar("Ver mi pedido");
    }
  };

  //formulario
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectTipo = (e) => {
    if (!input.tipoPagoID.includes(e.target.value)) {
      setInput({
        ...input,
        tipoPagoID: e.target.value,
      });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (carrito.length) {
      // Validación de longitud de aclaraciones
      if (input.aclaraciones.length > 50) {
        alert("Las aclaraciones deben tener hasta 50 caracteres");
        return;
      }

      // Validación de itemsExtra seleccionados
      // const totalItemsExtraRequired = carrito.reduce((total, prod) => {
      //   if (prod.itemsExtra) {
      //     return total + prod.cantidadPersonas * prod.itemsExtra.length;
      //   }
      //   return total;
      // }, 0);
      // if (
      //   !input.itemsExtra ||
      //   input.itemsExtra.length !== totalItemsExtraRequired
      // ) {
      //   alert("Debes seleccionar todos los items extra requeridos");
      //   return;
      // }

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
      window.location.href = "/";
    } else {
      alert("Error: No elegiste ningún producto del Menú");
    }
  };
  console.log(carrito);
  return (
    <>
      {userActual ? null : (
        <>
          <footer className="footer">
            <button className="botonFooter" onClick={handleOnClick}>
              <div className="cantidad">{preciosArray.length}</div>
              <b className="verPedido">{verOcultar}</b>
              <div className="precio">${precioFinal}</div>
            </button>
          </footer>
        </>
      )}

      <div className="desplegables">
        {/* Menu desplegable 1*/}
        {MostrarMenu && (
          <div className="desplegable1">
            <div className="ocultarBtnContainer">
              <div className="ocultarBtn" onClick={handleOcultarMenu1}></div>
            </div>

            <div>
              {carrito &&
                carrito.map((prod, id) => (
                  <div key={id} className="cardProducto">
                    <p className="nombre">{prod.nombre}</p>
                    <p className="descripcion">{prod.descripcion}</p>
                    <div className="precioAcciones">
                      <p className="precio">${prod.precio}</p>
                      <div className="acciones">
                        {prod.itemsExtra && (
                          <Link to="/items" className="editarItems">
                            <HiUserCircle className="editarIcon" />
                          </Link>
                        )}

                        <div
                          onClick={() => {
                            handleEliminarItemCarrito(prod.id);
                          }}
                          className="cursor-pointer text-red-500"
                        >
                          X
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Menu desplegable 2*/}
        {MostrarMenu2 && (
          <div className="desplegable2">
            <button className="" onClick={handleMostrarMenu1}>
              <b className="">Atrás</b>
            </button>

            <form id="formulario" onSubmit={(e) => handleSubmitForm(e)}>
              {/* ****** MESA ****** */}
              <div className="">
                <label className="" htmlFor="mesa">
                  Mesa
                </label>
                <input
                  className=""
                  id="nombre"
                  name="mesa"
                  type="number"
                  placeholder="Número de mesa"
                  value={input.mesa}
                  min={1}
                  max={20}
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* ****** ACLARACIONES ****** */}
              <div className="">
                <label className="" htmlFor="aclaraciones">
                  Aclaraciones
                </label>
                <input
                  className=""
                  id="aclaraciones"
                  name="aclaraciones"
                  type="text"
                  placeholder="Personalizá tu pedido (no obligatorio)"
                  min={0}
                  max={3}
                  value={input.aclaraciones}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* ****** MÉTODO DE PAGO ****** */}
              <div className="mb-4">
                <label className="" htmlFor="precio">
                  Método de pago
                </label>
                <div className="flex">
                  {tipoPagos?.map((tipo) => (
                    <div key={tipo.id}>
                      <input
                        type="radio"
                        id={tipo.id}
                        name="metodoPago"
                        value={tipo.id}
                        className=""
                        onChange={(e) => handleSelectTipo(e)}
                        required
                      />
                      <label htmlFor={tipo.id} className="">
                        {tipo.tipo}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="footer">
                <div className="botonFooter">
                  <div className="cantidad">{preciosArray.length}</div>
                  <input
                    type="submit"
                    className="verPedido"
                    value="Hacer pedido"
                  />
                  <div className="precio">${precioFinal}</div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
