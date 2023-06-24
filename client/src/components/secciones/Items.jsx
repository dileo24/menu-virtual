import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos, getTipoPago } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function Items() {
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

  const [input, setInput] = useState({
    productos: nombresProdArray,
    precio: precioFinal,
    mesa: "",
    aclaraciones: "",
    tipoPagoID: "",
    estadoID: "1",
    itemsExtra: [],
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (carrito.length) {
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
      alert(
        "Pedido realizado con éxito. En un momento te lo llevamos a tu mesa."
      );
    } else {
      alert("Error: No elegiste ningún producto del Menú");
    }
  };

  const handleSelectItemExtra = (prodId, item) => {
    setInput((prevInput) => ({
      ...prevInput,
      itemsExtra: [...prevInput.itemsExtra, item],
    }));
  };

  return (
    <>
      <div>
        <Link to="/" className="editarItems">
          <b className="">Atrás</b>
        </Link>
        ;
        <form id="formulario" onSubmit={(e) => handleSubmitForm(e)}>
          {/* ****** ITEMS ****** */}
          <div className="">
            <div className="flex">
              {carrito.length
                ? carrito.map(
                    (prod, indexCarr) =>
                      prod.itemsExtra && (
                        <div key={indexCarr}>
                          <label className="" htmlFor="mesa">
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
                                          item.categoria.nombre === categoria
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

          <div className="footerItems">
            <div className="listoBtn">
              <input type="submit" className="verPedido" value="Listo" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
