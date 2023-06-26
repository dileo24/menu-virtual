import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarItemCarrito, agregarCarrito } from "../../redux/actions";
import Button from "./Button";
import { Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";

export default function Contador({
  nombre,
  descripcion,
  precio,
  id,
  itemsExtra,
  cantidadPersonas,
}) {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito);
  const contadorNum = carrito.filter((carritoItem) => carritoItem.id === id);

  const handleIncremento = ({
    nombre,
    descripcion,
    precio,
    id,
    itemsExtra,
    cantidadPersonas,
  }) => {
    dispatch(
      agregarCarrito({
        nombre,
        descripcion,
        precio,
        id,
        itemsExtra,
        cantidadPersonas,
      })
    );
  };

  const handleDecremento = (id) => {
    dispatch(eliminarItemCarrito(id));
  };

  return (
    <div className="flex">
      {contadorNum.length ? (
        <>
          <Button signo="-" funcion={() => handleDecremento(id)} />

          <p className="text-center w-8 focus:outline-none focus:border-none text-xl">
            {contadorNum.length}
          </p>
        </>
      ) : (
        ""
      )}

      <Button
        signo="+"
        funcion={() =>
          handleIncremento({
            nombre,
            descripcion,
            precio,
            id,
            itemsExtra,
            cantidadPersonas,
          })
        }
        // funcion={() =>
        //   itemsExtra
        //     ? (window.location.href = "/items")
        //     : handleIncremento({
        //         nombre,
        //         descripcion,
        //         precio,
        //         id,
        //         itemsExtra,
        //         cantidadPersonas,
        //       })
        // }
      />
    </div>
  );
}
