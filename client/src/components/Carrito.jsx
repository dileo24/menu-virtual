import React /*, { useEffect } */ from "react";
import Aside from "./Aside";
import { useDispatch, useSelector } from "react-redux";
import { eliminarItemCarrito } from "../redux/actions";

export default function Carrito() {
  const carrito = useSelector((state) => state.carrito);
  const dispatch = useDispatch();

  const handleEliminarItem = (id) => {
    dispatch(eliminarItemCarrito(id));
  };

  // useEffect(() => {
  //   // Cambiarle el background del botón del Aside
  //   const carrito = document.querySelector(".carrito");
  //   carrito.classList.add("bg-teal-700");
  // }, []);

  return (
    <div className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <h2 className="text-3xl font-light text-center">
          Lista de productos en su carrito
        </h2>

        {carrito &&
          carrito.map((prod, id) => (
            <div key={id} style={{ border: "1px solid red" }}>
              <p>{prod.nombre}</p>
              <p>{prod.precio}</p>
              <button
                onClick={() => handleEliminarItem(prod.id)}
                style={{ border: "1px solid red" }}
              >
                Eliminar item
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
