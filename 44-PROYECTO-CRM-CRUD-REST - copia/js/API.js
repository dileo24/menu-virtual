// IMPORTANTE: Para que este código funcione es necesario hacer lo siguiente:
// 1ro, instalar Node.js y json-server.
// Luego, hacer click derecho en la carpeta '44-PROYECTO...' y click en 'Abrir en terminal integrado', ahí escribir: 'json-server --watch db.json --port 4000'

// Este proyecto es como el 32, pero en vez de IndexedDB, utiliza una API (json) local que simula una API online con Node y json server.




// Guardar el nuevo platillo en la API cuando se crea un nuevo platillo:
const url = 'http://localhost:4000/platillos';

export const nuevoPlatillo = platillo => {
  try {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(platillo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log(error);
  }
}



// Obtener todos los platillos de la API
export const obtenerplatillos = async () => {
  try {
    const resultado = await fetch(url);
    const platillos = await resultado.json();
    return platillos;
  } catch (error) {
    console.log(error);
  }
}



// Eliminar un platillo
export const eliminarplatillo = async idplatillo => {
  try {
    await fetch(`${url}/${idplatillo}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
}



// Obtener un platillo por su ID
export const obtenerplatillo = async id => {
  try {
    const resultado = await fetch(`${url}/${id}`);
    const platillo = await resultado.json();
    return platillo;
  } catch (error) {
    console.log(error);
  }
}



// Guardar platillo editado
export const guardarplatillo = async id => {
  try {
    const resultado = await fetch(`${url}/${id}`);
    const platillo = await resultado.json();
    return platillo;
  } catch (error) {
    console.log(error);
  }
}



// Actualizar el platillo editado
export const editarPlatillo = async platillo => {
  try {
    await fetch(`${url}/${platillo.id}`, {
      method: 'PUT',
      body: JSON.stringify(platillo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    window.location.href = 'index.html';
  } catch (error) {
    console.log(error);
  }
}