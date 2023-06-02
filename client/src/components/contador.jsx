import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarItemCarrito, agregarCarrito } from "../redux/actions";

export default function Contador({ nombre, descripcion, precio, id }) {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito);
  console.log(carrito);
  const [valor, setValor] = useState(() => {
    const storedValue = localStorage.getItem(`contador_${id}`);
    return storedValue ? parseInt(storedValue) : 0;
  });

  const handleIncremento = ({ nombre, descripcion, precio, id }) => {
    const newValue = valor + 1;
    setValor(newValue);
    localStorage.setItem(`contador_${id}`, newValue.toString());

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
    if (valor > 0) {
      const newValue = valor - 1;
      setValor(newValue);
      localStorage.setItem(`contador_${id}`, newValue.toString());

      dispatch(eliminarItemCarrito(id));
    }
  };

  return (
    <div>
      <button onClick={() => handleDecremento(id)}>-</button>
      <input
        type="number"
        min="0"
        step="1"
        className="text-center w-12 focus:outline-none focus:border-none"
        readOnly
        value={valor}
      />
      <button
        onClick={() =>
          handleIncremento({
            nombre,
            descripcion,
            precio,
            id,
          })
        }
      >
        +
      </button>
    </div>
  );
}
