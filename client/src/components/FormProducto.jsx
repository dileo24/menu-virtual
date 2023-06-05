import React, { useEffect /*, { useState } */ } from "react";
import Aside from "./Aside";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { getItemsExtra, getCategorias } from "../redux/actions";
import { mostrarAlerta } from "../helpers";

export default function FormProducto({
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  precio,
  setPrecio,
  onSubmit,
  titulo,
  itemsExtra,
  setItemsExtra,
  numItemsExtra,
  setNumItemsExtra,
  categoriaID,
  setCategoriaID,
}) {
  const dispatch = useDispatch();

  const itemsExtraArray = useSelector((state) => state.itemsExtra);
  useEffect(() => {
    dispatch(getItemsExtra());
  }, [dispatch]);

  const categorias = useSelector((state) => state.categorias);
  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const handleNumItemsChange = (e) => {
    let count = parseInt(e.target.value);
    if (count === 1) {
      count = 0;
      return mostrarAlerta(
        "Error: No puede haber un solo ítem personalizable.",
        "error"
      );
    }
    setNumItemsExtra(count);
    setItemsExtra(Array(count).fill(""));
  };

  const handleItemChange = (e, index) => {
    const updatedItems = [...itemsExtra];
    updatedItems[index] = e.target.value;
    setItemsExtra(updatedItems);
  };

  const incrementNumItems = () => {
    let newNumItemsExtra = numItemsExtra;

    if (numItemsExtra === 0) {
      newNumItemsExtra = 2;
    } else {
      newNumItemsExtra++;
    }

    setNumItemsExtra(newNumItemsExtra);

    let newItemsExtra = [...itemsExtra];
    for (let i = 0; i < newNumItemsExtra - itemsExtra.length; i++) {
      newItemsExtra.push("");
    }
    setItemsExtra(newItemsExtra);

    // if (newNumItemsExtra === 2 && !nombre.includes("(Personalizable)")) {
    //   setNombre(`${nombre} - Personalizable`);
    // }
  };

  const decrementNumItems = () => {
    if (numItemsExtra > 0) {
      if (numItemsExtra === 2) {
        setNumItemsExtra(0);
        setItemsExtra([]);
        // setNombre(nombre.replace(/- Personalizable$/, "").trim());
      } else {
        setNumItemsExtra(numItemsExtra - 1);
        setItemsExtra(itemsExtra.slice(0, -1));
        // if (numItemsExtra === 1) {
        //   setNombre(nombre.replace(/- Personalizable$/, "").trim());
        // }
      }
    }
    // else {
    //   setNombre(nombre.replace(/- Personalizable$/, "").trim());
    // }
  };

  return (
    <div className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <div className="flex flex-col justify-center h-screen bg-gray-200 md:w-4/5  xl:w-4/5">
          <h2 className="titulo -mt-16 text-3xl font-light text-center">
            {titulo}
          </h2>
          <div className="flex flex-col mt-10 items-center contenedor">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
              <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                <form id="formulario" className="bg-white p-3" method="POST">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Categoría
                    </label>
                    <select
                      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) => setCategoriaID(e.target.value)}
                      required
                    >
                      <option hidden>Elegí una categoría</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="nombre"
                    >
                      Nombre
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Nombre del producto"
                      value={nombre}
                      maxLength={150}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="descripcion"
                    >
                      Descripción
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="descripcion"
                      name="descripcion"
                      type="text"
                      placeholder="Descripción del producto"
                      value={descripcion}
                      maxLength={150}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="precio"
                    >
                      Precio
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="precio"
                      name="precio"
                      type="number"
                      placeholder="Precio del producto"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </div>

                  <div className="mb-4 ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="numItemsExtra"
                    >
                      Cantidad de ítems Extra
                      <span className="font-normal"> (no obligatorio)</span>
                    </label>
                    <div className="flex">
                      <Button signo="-" funcion={decrementNumItems} />
                      <input
                        className="rounded w-5 mx-3 py-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="numItemsExtra"
                        name="numItemsExtra"
                        type="number"
                        value={numItemsExtra}
                        onChange={handleNumItemsChange}
                        readOnly
                      />
                      <Button signo="+" funcion={incrementNumItems} />
                    </div>
                  </div>

                  {itemsExtra.map((item, index) => (
                    <div className="mb-4" key={index}>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor={`item${index}`}
                      >
                        ítem {index + 1}
                      </label>
                      <select onChange={(e) => handleItemChange(e, index)}>
                        <option hidden>Elegí un ítem</option>
                        {itemsExtraArray.map((item) => (
                          <option key={item.id} value={item.nombre}>
                            {item.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}

                  <input type="hidden" name="id" id="id" value="" />

                  <input
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
                    value={
                      titulo === "Nuevo Producto"
                        ? "Crear Producto"
                        : "Guardar cambios"
                    }
                    onClick={onSubmit}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
