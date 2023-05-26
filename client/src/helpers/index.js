//// Funciones para la Base de Datos ////

const url = "http://localhost:3001/productos";

// CREACION el nuevo platillo en la BDD cuando se crea un nuevo platillo:
export const nuevoPlatillo = (platillo) => {
  try {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(platillo),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// LISTADO todos los platillos de la API
export const obtenerplatillos = async () => {
  try {
    const resultado = await fetch(url);
    const platillos = await resultado.json();
    return platillos;
  } catch (error) {
    console.log(error);
  }
};

// ELIMINACION un platillo

export const eliminarplatillo = async (idplatillo) => {
  try {
    await fetch(`${url}/${idplatillo}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

// Obtener un platillo por su ID
export const obtenerplatillo = async (id) => {
  try {
    const resultado = await fetch(`${url}/${id}`);
    const platillo = await resultado.json();
    return platillo;
  } catch (error) {
    console.log(error);
  }
};

// Actualizar el platillo editado
export const editarPlatillo = async (platillo) => {
  try {
    await fetch(`${url}/${platillo.id}`, {
      method: "PUT",
      body: JSON.stringify(platillo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};


//// Más funciones ////

export function mostrarAlerta(texto, tipo) {
  const contenedor = document.querySelector('.contenedor');
  const alerta = document.querySelector('.alerta');
  if (alerta) {
    alerta.remove();
  }
  const alertaDiv = document.createElement('DIV');
  if (tipo === 'error') {
    alertaDiv.classList.add("bg-red-100", "border", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", 'mt-5', 'w-1rem', 'text-center', 'alerta');
  } else {
    alertaDiv.classList.add("bg-green-100", "border", "border-green-400", "text-green-700", "px-4", "py-3", "rounded", "relative", 'mt-5', 'w-1rem', 'text-center', 'alerta');
  }
  alertaDiv.textContent = texto;
  contenedor.appendChild(alertaDiv);
  setTimeout(() => {
    alertaDiv.remove()
  }, 1000);
}

export function ningunInputVacio(obj) {
  return Object.values(obj).every(input => input !== ''); // es true cuando todos los inputs son diferentes a ''.
}