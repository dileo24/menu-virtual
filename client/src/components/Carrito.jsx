import React from "react";
import Aside from "./Aside";
import { useSelector } from "react-redux";

export default function Carrito() {
  const carrito = useSelector((state) => state.carrito);

  return (
    <div className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <h2 className="text-3xl font-light text-center">
          Lista de productos en su carrito
        </h2>

        {carrito &&
          carrito.map((prod) => (
            <div key={prod.id}>
              <p>{prod.nombre}</p>
              <p>{prod.precio}</p>
              <button>Eliminar item</button>
            </div>
          ))}
      </div>
    </div>
  );
}
