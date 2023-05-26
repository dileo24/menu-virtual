import React from "react";

export default function Aside() {
  return (
    <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
      <h2 className="text-3xl font-light text-center">Nuevo Platillo</h2>
      {/*Editar Platillo*/}
      <div className="flex flex-col mt-10 items-center contenedor">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
          <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
            <form id="formulario" className="bg-white p-3" method="POST">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="nombre"
                >
                  Nombre
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Nombre del platillo"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="descripcion"
                >
                  Descripción
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="descripcion"
                  name="descripcion"
                  type="tel"
                  placeholder="Descripción del platillo"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="precio"
                >
                  Precio
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="precio"
                  name="precio"
                  type="text"
                  placeholder="Precio del platillo"
                />
              </div>

              <input
                type="submit"
                className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
                value="Agregar Platillo" /*Guardar cambios*/
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
