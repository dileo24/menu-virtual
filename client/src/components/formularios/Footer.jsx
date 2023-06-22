import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  eliminarItemCarrito,
  getPedidos,
  getTipoPago,
  limpiarCarrito,
} from "../../redux/actions";
import { createPedido } from "../../redux/actions";

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
  const handleMostrarMenu = () => {
    setMostrarMenu(!MostrarMenu);

    if (MostrarMenu2) {
      setMostrarMenu2(!MostrarMenu2);
    }
    if (verOcultar === "Ver mi pedido") {
      setVerOcultar("Siguiente");
    } else {
      setVerOcultar("Ver mi pedido");
    }
  };

  const handleMostrarMenu2 = () => {
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
  };
  const handleMostrarMenu1 = () => {
    if (MostrarMenu2) {
      setMostrarMenu2(!MostrarMenu2);
      const desplegable1 = document.querySelector(".desplegable1");

      if (!document.querySelector(".ocultar")) {
        desplegable1.classList.add("ocultar");
      } else {
        desplegable1.classList.remove("ocultar");
      }
    }
    setMostrarMenu(MostrarMenu);
  };

  //formulario
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSelectItemExtra = (prodId, item) => {
    setInput((prevInput) => ({
      ...prevInput,
      itemsExtra: [...prevInput.itemsExtra, item],
    }));
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
      const totalItemsExtraRequired = carrito.reduce((total, prod) => {
        if (prod.itemsExtra) {
          return total + prod.cantidadPersonas * prod.itemsExtra.length;
        }
        return total;
      }, 0);
      if (
        !input.itemsExtra ||
        input.itemsExtra.length !== totalItemsExtraRequired
      ) {
        alert("Debes seleccionar todos los items extra requeridos");
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

  return (
    <>
      {userActual ? null : (
        <>
          <footer className="footer">
            <div className="precio">
              {preciosArray.length} producto
              {preciosArray.length === 1 ? "" : "s"}
              <span>${precioFinal}</span>
            </div>
            <button className="botonFooter" onClick={handleMostrarMenu}>
              <b className="font-bold">{verOcultar}</b>
            </button>
          </footer>
        </>
      )}

      <div className="desplegables">
        {/* Menu desplegable 1*/}
        {MostrarMenu && (
          <div className="desplegable1">
            <div className="linea"></div>

            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {carrito &&
                  carrito.map((prod, id) => (
                    <tr key={id}>
                      <td>{prod.nombre}</td>
                      <td>${prod.precio}</td>
                      <td>
                        <div
                          onClick={() => {
                            handleEliminarItemCarrito(prod.id);
                          }}
                          className="cursor-pointer text-red-500"
                        >
                          X
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="footer1">
              <p className="precioFinal">Precio Final: ${precioFinal}</p>

              <div
                className=" py-2 mb-2 rounded bg-teal-600 text-center px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400 text-sm leading-5 font-medium text-lg cursor-pointer"
                onClick={handleMostrarMenu2}
              >
                Siguiente
              </div>
            </div>
          </div>
        )}

        {/* Menu desplegable 2*/}
        {MostrarMenu2 && (
          <div className="fixed bottom-0 mb-12 md:w-4/5 xl:w-3/6  px-8 pb-8 pt-2 bg-gray-300 rounded z-10">
            <button
              className="py-2 mb-2 rounded bg-teal-600 text-center px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400 text-sm leading-5 font-medium text-lg relative"
              onClick={handleMostrarMenu1}
            >
              <b className="font-bold">Atrás</b>
            </button>
            <form id="formulario" onSubmit={(e) => handleSubmitForm(e)}>
              {/* ****************** MESA ****************** */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mesa"
                >
                  Mesa
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

              {/* ****************** ITEMS ****************** */}
              <div className="mb-4">
                <div className="flex">
                  {carrito.length
                    ? carrito.map(
                        (prod, indexCarr) =>
                          prod.itemsExtra && (
                            <div key={indexCarr}>
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="mesa"
                              >
                                Seleccione items para {prod.nombre}
                              </label>
                              {Array.from(
                                { length: prod.cantidadPersonas },
                                (_, index) => (
                                  <div key={index}>
                                    <p>Persona {index + 1}</p>
                                    {prod.itemsExtra.map(
                                      (categoria, categoriaIndex) => {
                                        const itemsFiltrados =
                                          itemsExtraArray.filter(
                                            (item) =>
                                              item.categoria.nombre ===
                                              categoria
                                          );
                                        return (
                                          <select
                                            name={`itemsExtra-${categoriaIndex}`}
                                            onChange={(e) =>
                                              handleSelectItemExtra(
                                                prod.id,
                                                e.target.value
                                              )
                                            }
                                            required
                                            key={`${index}-${categoriaIndex}`}
                                          >
                                            <option hidden>{categoria}</option>
                                            {itemsFiltrados.map(
                                              (item, itemIndex) => (
                                                <option
                                                  key={itemIndex}
                                                  value={item.nombre}
                                                >
                                                  {item.nombre}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        );
                                      }
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          )
                      )
                    : ""}
                </div>
              </div>

              {/* ****************** ACLARACIONES ****************** */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="aclaraciones"
                >
                  Aclaraciones
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

              {/* ****************** MÉTODO DE PAGO ****************** */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="precio"
                >
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
                        className="mr-2"
                        onChange={(e) => handleSelectTipo(e)}
                        required
                      />
                      <label htmlFor={tipo.id} className="mr-4">
                        {tipo.tipo}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <input
                type="submit"
                className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer rounded"
                value="Hacer pedido"
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
}
