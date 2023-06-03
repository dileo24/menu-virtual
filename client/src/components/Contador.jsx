import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarItemCarrito, agregarCarrito } from "../redux/actions";

export default function Contador({ nombre, descripcion, precio, id }) {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito);
  const contadorNum = carrito.filter((carritoItem) => carritoItem.id === id);

  const handleIncremento = ({ nombre, descripcion, precio, id }) => {
    dispatch(
      agregarCarrito({
        nombre,
        descripcion,
        precio,
        id,
      })
    );
  };

  const handleDecremento = (id) => {
    dispatch(eliminarItemCarrito(id));
  };

  return (
    <div className="flex">
      <div onClick={() => handleDecremento(id)} className="cursor-pointer">
        -
      </div>
      <p className="text-center w-12 focus:outline-none focus:border-none">
        {contadorNum.length}
      </p>
      <div
        onClick={() =>
          handleIncremento({
            nombre,
            descripcion,
            precio,
            id,
          })
        }
        className="cursor-pointer"
      >
        +
      </div>
    </div>
  );
}
