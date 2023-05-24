// IMPORTANTE: Para que este código funcione es necesario hacer lo siguiente:
// 1ro, instalar Node.js y json-server.
// Luego, hacer click derecho en la carpeta '44-PROYECTO...' y click en 'Abrir en terminal integrado', ahí escribir: 'json-server --watch db.json --port 4000'

// Este proyecto es como el 32, pero en vez de IndexedDB, utiliza una API (json) local que simula una API online con Node y json server.

// Este archivo se ejecuta solamente en la página "index.html" (está en la etiqueta script del html)

// Mostrar los platillos de la API en la tabla

import { obtenerplatillos, eliminarplatillo } from "./API.js";

(function () {
  const listado = document.querySelector("#listado-platillos");

  document.addEventListener("DOMContentLoaded", mostrarPlatillos);

  async function mostrarPlatillos() {
    const platillos = await obtenerplatillos();
    platillos.forEach((element) => {
      const { nombre, descripcion, precio, id } = element;

      const row = document.createElement("tr");
      row.innerHTML += `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${descripcion}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${precio}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-platillo.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-platillo="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            `;

      listado.appendChild(row);
    });

    const eliminarBtn = document.querySelectorAll(".eliminar");
    eliminarBtn.forEach((btn) => {
      btn.onclick = () => {
        const idplatillo = btn.dataset.platillo;
        console.log(idplatillo);
        let res = window.confirm(`Está seguro de querer borrar?`);
        if (res === true) {
          eliminarplatillo(idplatillo);
          window.location.reload();
        }
      };
    });
  }
})();
