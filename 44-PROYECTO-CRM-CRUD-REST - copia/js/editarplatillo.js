// Este archivo se ejecuta solamente en la página "editarPlatillo.html" (está en la etiqueta script del html)
// Cuando se carga la página, registra el parámetro "id" que está presente en la URL.
// Luego, obtiene los datos del platillo correspondiente y los muestra en el formulario.
// También asigna la función "actualizarplatillo" al botón de envío del formulario.



import { obtenerplatillo, editarPlatillo } from './API.js';
import { mostrarAlerta, ningunInputVacio } from './funciones.js';



(function () {

  // Seleccionar los elementos del formulario
  const nombreInput = document.querySelector('#nombre');
  const descripcionInput = document.querySelector('#descripcion');
  const precioInput = document.querySelector('#precio');
  const idInput = document.querySelector('#id');
  const formulario = document.querySelector('#formulario');


  // Cuando se carga la página, obtener el ID del platillo de la URL y ejecutar las funciones correspondientes
  document.addEventListener('DOMContentLoaded', async () => {
    const parametrosURL = new URLSearchParams(window.location.search);
    const idplatillo = parseInt(parametrosURL.get('id'));
    const platillo = await obtenerplatillo(idplatillo);
    mostrarPlatillo(platillo);
    formulario.addEventListener('submit', validarPlatillo);
  });


  // Mostrar los datos del platillo en el formulario
  function mostrarPlatillo(platillo) {
    nombreInput.value = platillo.nombre;
    descripcionInput.value = platillo.descripcion;
    precioInput.value = platillo.precio;
    idInput.value = platillo.id;
  }



  // Actualizar platillo con los nuevos cambios
  function validarPlatillo(e) {
    e.preventDefault();

    const platillo = {
      nombre: nombreInput.value,
      descripcion: descripcionInput.value,
      precio: precioInput.value,
      id: parseInt(idInput.value)
    }

     
    if (!ningunInputVacio(platillo)) {
      return mostrarAlerta('Error: Hay algún campo vacío', 'error');
    }

    // Para garantizar que la alerta de éxito se muestre, se demora un segundo la ejecución de la función que carga los datos en el json, debido a que al cargar datos en una API, la página se recarga. Además, para que el usuario no interrumpa la carga de datos yéndose a la página 'Menú' o 'Nuevo platillo' (en ese segundo), se elimina el atributo 'href' del botón menú...
    // Actualiza el platillo en el archivo json luego de 1 segundo:
    setTimeout(() => {
      editarPlatillo(platillo);
    }, 1000);
    // mostrar alerta
    mostrarAlerta('Platillo agregado con éxito', 'exito');
    // eliminar el href del botón menú y del botón nuevo platillo
    const menuBtn = document.querySelector('.menu');
    menuBtn.removeAttribute('href');
    const nuevoPlatilloBtn = document.querySelector('.nuevo-platillo');
    nuevoPlatilloBtn.removeAttribute('href');

  }

  }) ();