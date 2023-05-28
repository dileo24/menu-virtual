import React, { useEffect, useState } from "react";

export default function Main({
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  precio,
  setPrecio,
  onSubmit,
}) {
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    const url = window.location.href;
    const urlSplit = url.split("/");
    const ultimoAtributo = urlSplit[urlSplit.length - 1];
    const tituloElement = document.querySelector(".titulo");
    if (tituloElement) {
      if (ultimoAtributo === "nuevoProducto") {
        tituloElement.textContent = "Nuevo Producto";
      } else {
        tituloElement.textContent = "Editar Producto";
      }
      setTitulo(tituloElement.textContent);
    }
  }, []);

  return (
    <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
      <h2 className="titulo text-3xl font-light text-center"></h2>
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
                  type="text"
                  placeholder="Precio del producto"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </div>

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
    </main>
  );
}
