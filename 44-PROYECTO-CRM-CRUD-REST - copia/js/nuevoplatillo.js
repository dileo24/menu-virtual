// Este archivo se ejecuta solamente en la página "nuevoPlatillo.html" (está en la etiqueta script del html)



import { nuevoPlatillo } from './API.js';
import { mostrarAlerta, ningunInputVacio } from './funciones.js';

(function () {

    const formulario = document.querySelector('#formulario');

    formulario.addEventListener('submit', validarPlatillo);

    function validarPlatillo(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const descripcion = document.querySelector('#descripcion').value;
        const precio = document.querySelector('#precio').value;

        const platillo = {
            nombre,
            descripcion,
            precio
        }

        if (!ningunInputVacio(platillo)) {
            return mostrarAlerta('Error: Hay algún campo vacío', 'error');
        }

        // Para garantizar que la alerta de éxito se muestre, se demora un segundo la ejecución de la función que carga los datos en el json, debido a que al cargar datos en una API, la página se recarga. Además, para que el usuario no interrumpa la carga de datos yéndose a la página 'Menú' o 'Nuevo platillo' (en ese segundo), se elimina el atributo 'href' del botón menú...
        // Actualiza el platillo en el archivo json luego de 1 segundo:
        setTimeout(() => {
            nuevoPlatillo(platillo);
        }, 1000);
        // mostrar alerta
        mostrarAlerta('Platillo agregado con éxito', 'exito');
        // eliminar el href del botón menú y del botón nuevo platillo
        const menuBtn = document.querySelector('.menu');
        menuBtn.removeAttribute('href');
        const nuevoPlatilloBtn = document.querySelector('.nuevo-platillo');
        nuevoPlatilloBtn.removeAttribute('href');

    }

})();