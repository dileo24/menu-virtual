//// Funciones para la Base de Datos ////

const url = "http://localhost:3001/productos";

// CREACION el nuevo producto en la BDD cuando se crea un nuevo producto:
export const nuevoProducto = (producto) => {
  try {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// LISTADO todos los productos de la API
export const obtenerProductos = async () => {
  try {
    const resultado = await fetch(url);
    const productos = await resultado.json();
    return productos;
  } catch (error) {
    console.log(error);
  }
};

// ELIMINACION un producto

export const eliminarProducto = async (idProducto) => {
  try {
    await fetch(`${url}/${idProducto}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

// Obtener un producto por su ID
export const obtenerProducto = async (id) => {
  try {
    const resultado = await fetch(`${url}/${id}`);
    const producto = await resultado.json();
    return producto;
  } catch (error) {
    console.log(error);
  }
};

// Actualizar el producto editado
export const editarProducto = async (producto) => {
  try {
    await fetch(`${url}/${producto.id}`, {
      method: "PUT",
      body: JSON.stringify(producto),
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