import React from "react";
import Aside from "./Aside";

export default function Platillos() {
  return (
    <div id="platillos" className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
          <h2 className="text-3xl font-light text-center">Menú</h2>

          <div className="flex flex-col mt-10">
            <div className="py-2 overflow-x-auto">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <thead className="bg-gray-100 ">
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Platillo
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Descripción
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Precio
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody id="listado-platillos" className="bg-white"></tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
