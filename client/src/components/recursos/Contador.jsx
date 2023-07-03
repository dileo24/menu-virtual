import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarItemCarrito, agregarCarrito } from "../../redux/actions";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const handleRelocated = () => {
    navigate(`/items/${id}`);
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
          itemsExtra
            ? handleRelocated()
            : handleIncremento({
                nombre,
                descripcion,
                precio,
                id,
                itemsExtra,
                cantidadPersonas,
              })
        }
      />
    </div>
  );
}
