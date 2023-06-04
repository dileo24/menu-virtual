// import React, { useState } from "react";
import Aside from "./Aside";

export default function FormProducto({
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  precio,
  setPrecio,
  onSubmit,
  titulo,
  itemsPersonalizables,
  setItemsPersonalizables,
  numItemsPersonalizables,
  setNumItemsPersonalizables,
}) {
  const handleNumItemsChange = (e) => {
    const count = parseInt(e.target.value);
    setNumItemsPersonalizables(count);
    setItemsPersonalizables(Array(count).fill(""));
  };

  const handleItemChange = (e, index) => {
    const updatedItems = [...itemsPersonalizables];
    updatedItems[index] = e.target.value;
    setItemsPersonalizables(updatedItems);
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

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="numItemsPersonalizables"
                    >
                      Cantidad de Items Personalizables
                    </label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="numItemsPersonalizables"
                      name="numItemsPersonalizables"
                      value={numItemsPersonalizables}
                      onChange={handleNumItemsChange}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      {/* Agrega aquí más opciones según tus necesidades */}
                    </select>
                  </div>

                  {itemsPersonalizables.map((item, index) => (
                    <div className="mb-4" key={index}>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor={`item${index}`}
                      >
                        Item {index + 1}
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`item${index}`}
                        name={`item${index}`}
                        type="text"
                        placeholder={`Item ${index + 1}`}
                        value={item}
                        maxLength={150}
                        onChange={(e) => handleItemChange(e, index)}
                      />
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
