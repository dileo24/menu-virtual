import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarItemCarrito } from "../redux/actions";

export default function Carrito() {
  const carrito = useSelector((state) => state.carrito);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [verOcultar, setVerOcultar] = useState("Ver mi pedido");
  const userActual = useSelector((state) => state.userActual);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
    if (verOcultar === "Ver mi pedido") {
      setVerOcultar("Ocultar mi pedido");
    } else {
      setVerOcultar("Ver mi pedido");
    }
  };

  const handleEliminarItemCarrito = (id) => {
    console.log(id);
    const storedValue = localStorage.getItem(`contador_${id}`);
    if (storedValue) {
      const contadorValue = parseInt(storedValue);
      if (contadorValue > 0) {
        localStorage.setItem(`contador_${id}`, (contadorValue - 1).toString());
      }
    }
    dispatch(eliminarItemCarrito(id));
    // window.location.reload();
  };

  return (
    <>
      {userActual ? null : (
        <>
          <div className=" w-full absolute bottom-0 md:w-4/5 xl:w-4/5 bg-gray-300 shadow flex justify-center items-center">
            <button
              className="py-2 mb-2 rounded bg-teal-600 text-center px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400 text-sm leading-5 font-medium text-lg relative"
              onClick={handleShowMenu}
            >
              <b className="font-bold">{verOcultar}</b>
            </button>
          </div>
        </>
      )}

      <div className="flex justify-center items-center">
        {/* Menu desplegable */}
        {showMenu && (
          <div className="flex items-center justify-center absolute bottom-0 mb-12 w-full md:w-2/6 xl:w-2/6 py-2 bg-gray-300 rounded z-10">
            <table className="text-center">
              <thead>
                <tr>
                  <th className="text-center px-4 py-2">Producto</th>
                  <th className="text-center px-4 py-2">Precio</th>
                  <th className="text-center px-4 py-2">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {carrito &&
                  carrito.map((prod, id) => (
                    <tr key={id}>
                      <td className="text-center px-4 py-2">{prod.nombre}</td>
                      <td className="text-center px-4 py-2">${prod.precio}</td>
                      <td className="text-center px-4 py-2">
                        <button
                          onClick={() => {
                            handleEliminarItemCarrito(prod.id);
                          }}
                          className=" text-red-500"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
