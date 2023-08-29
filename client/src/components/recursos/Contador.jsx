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
  setProdID,
  setItemProd,
  combo,
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
    if (vertical) {
      navigate(`/items/${id}`);
    } else {
      setProdID(id);
      setItemProd(true);
    }
  };

  const vertical = window.innerHeight > window.innerWidth;

  return (
    <div className="flex">
      {contadorNum.length ? (
        <>
          <Button signo="-" funcion={() => handleDecremento(id)} />

          <p className={vertical ? "contadorNumMobile" : "contadorNumPC"}>
            {contadorNum.length}
          </p>
        </>
      ) : (
        ""
      )}

      <Button
        signo="+"
        funcion={() =>
          combo
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
