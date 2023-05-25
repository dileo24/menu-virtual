import React from "react";
import Aside from "./Aside";

export default function EditarPlatillos() {
  return (
    <body class="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <main class="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
          <h2 class="text-3xl font-light text-center">Editar platilo</h2>

          <div class="flex flex-col mt-10 items-center contenedor">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
              <div class=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                <form id="formulario" class="bg-white p-3" method="POST">
                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="nombre"
                    >
                      Nombre
                    </label>
                    <input
                      class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Nombre del platilo"
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="descripcion"
                    >
                      Descripción
                    </label>
                    <input
                      class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="descripcion"
                      name="descripcion"
                      type="tel"
                      placeholder="Descripción del platilo"
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="precio"
                    >
                      Precio
                    </label>
                    <input
                      class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="precio"
                      name="precio"
                      type="text"
                      placeholder="Precio del platilo"
                    />
                  </div>

                  <input type="hidden" name="id" id="id" value="" />

                  <input
                    type="submit"
                    class="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
                    value="Guardar Cambios"
                  />
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </body>
  );
}
