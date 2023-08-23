import React, { useEffect, useState /* , useCallback */ } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos, getTipoPago, limpiarCarrito } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { createPedido } from "../../redux/actions";
import { AiOutlineBank } from "react-icons/ai";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { AiOutlineCreditCard } from "react-icons/ai";
import mercadoPago from "../../multmedia/mercadopago.svg";
import { io } from "socket.io-client";
import HeaderBack from "../recursos/HeaderBack";
import Alerta from "../recursos/Alerta";

export default function HacerPedido({ setHacerPedido }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const carrito = useSelector((state) => state.carrito);
  const pedidos = useSelector((state) => state.pedidos);
  const [preciosArray, setPreciosArray] = useState([]);
  const [nombresProdArray, setNombresProdArray] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  let precioFinal = 0;
  for (let i = 0; i < preciosArray.length; i++) {
    precioFinal += parseInt(preciosArray[i]);
  }
  const dispatch = useDispatch();
  const tipoPagos = useSelector((state) => state.tipoPagos);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  let id = pedidos.length + 1;
  const itemsDelCarrito = carrito.map((prod) => prod.itemsExtra ?? ["vacio"]);
  const [alertaExito, setAlertaExito] = useState(false);
  const [alertaAviso, setAlertaAviso] = useState(false);

  const [input, setInput] = useState({
    id: id,
    productos: nombresProdArray,
    precio: precioFinal,
    mesa: "",
    aclaraciones: "",
    tipoPagoID: "",
    estadoID: "1",
    itemsExtra: itemsDelCarrito,
    creacionFecha: formattedDate,
    creacionHora: formattedTime,
  });

  const vertical = window.innerHeight > window.innerWidth;

  useEffect(() => {
    dispatch(getTipoPago());
    dispatch(getPedidos());
    vertical &&
      setAlertaAviso({
        estadoActualizado: true,
        texto: `Para hacer un pedido, debes estar presencialmente en el local.`,
      });
  }, [dispatch]);

  useEffect(() => {
    if (!carrito.length) {
      navigate("/");
    }

    // Local
    // const socket = io("http://localhost:3001");

    // Deploy
    const socket = io("https://menu-virtual-production-9dbc.up.railway.app");

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

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

  const compareProductos = (productoA, productoB) => {
    // Si productoA tiene itemsExtra y productoB no, productoA va primero
    if (productoA.itemsExtra && !productoB.itemsExtra) {
      return -1;
    }
    // Si productoB tiene itemsExtra y productoA no, productoB va primero
    if (!productoA.itemsExtra && productoB.itemsExtra) {
      return 1;
    }
    // En cualquier otro caso, mantener el orden actual
    return 0;
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

  // Ordenar los productos antes de hacer el pedido
  const productosOrdenados = carrito.slice().sort(compareProductos);

  // Agregar los productos ordenados a la entrada de formulario
  input.productos = productosOrdenados.map((producto) => producto.nombre);
  input.precio = productosOrdenados.reduce(
    (total, producto) => total + parseInt(producto.precio),
    0
  );

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (carrito.length) {
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

      if (socket) {
        socket.emit("nuevoPedido", input);
      }
      /* console.log(input); */
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
      if (!vertical) {
        window.location.reload();
      }
      //   ;
    } else {
      alert("Error: No elegiste ningún producto del Menú");
    }
  };

  return (
    <>
      <div className={vertical ? "hacerPedidoMobile" : "hacerPedidoPC"}>
        {/* Menu desplegable 2*/}
        <div className="desplegable2">
          {vertical ? (
            <HeaderBack
              url={"/miPedido"}
              arrowType={"left"}
              title={`Completar mi `}
              span={"Pedido"}
            />
          ) : (
            <HeaderBack
              url={""}
              arrowType={"left"}
              title={`Completar mi `}
              span={"Pedido"}
              setHacerPedido={setHacerPedido}
            />
          )}

          <form
            id="formulario"
            className="formulario"
            onSubmit={(e) => {
              vertical && setAlertaExito(true);
              handleSubmitForm(e);
            }}
          >
            <div className="mesa">
              <label className="mesaTitle" htmlFor="mesa">
                Número de mesa
              </label>
              <input
                className="mesaInput"
                id="mesa"
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

            <div className="pago" id="pago">
              <div className="pagoTitle" htmlFor="pago">
                Método de pago
              </div>
              <div>
                {tipoPagos?.map((tipo) => (
                  <div
                    key={tipo.id}
                    className={`pagoInput ${
                      selectedPayment === Number(tipo.id) ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleSelectTipo({ target: { value: tipo.id } });
                    }}
                  >
                    <div className="iconCheck">
                      <input
                        type="radio"
                        id={tipo.id}
                        name="metodoPago"
                        value={tipo.id}
                        className="check"
                        onChange={() => {}}
                        checked={selectedPayment === Number(tipo.id)}
                        required
                      />
                      {tipo.id === 1 && <HiOutlineBanknotes className="icon" />}
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

            <div className="footer1">
              <p>Total</p>
              <p>${precioFinal}</p>
              <div className="footer">
                <div className="botonFooter">
                  <input
                    type="submit"
                    className="hacerPedido"
                    value="Hacer pedido"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        {alertaExito && (
          <Alerta
            tipo={"exito"}
            titulo={"Pedido exitoso"}
            texto={
              "Pedido realizado con éxito. En un momento te lo llevamos a tu mesa."
            }
            estado={alertaExito}
            setEstado={setAlertaExito}
            callback={() => {
              // if (vertical) {
              navigate("/historial");
              // } else {
              //   setHistorial(true);
              //   setHacerPedido(false);
              // }
            }}
          />
        )}
        {vertical && alertaAviso && (
          <div className="fondoAlertaMobile">
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
                    navigate("/");
                  }}
                >
                  No estoy en el local
                </button>
                <button
                  className="aceptarAviso"
                  onClick={() => setAlertaAviso(false)}
                >
                  Sí estoy en el local
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
