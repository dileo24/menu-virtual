//// Funciones para la Base de Datos ////

// Local
const url = "http://localhost:3001/productos";

// Deploy
/* const url = "https://menu-virtual-production-9dbc.up.railway.app/productos"; */

// CREACION el nuevo producto en la BDD cuando se crea un nuevo producto:
export const nuevoProducto = (producto, token) => {
  // console.log(producto, token);
  try {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.href = "/";
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

// Obtener un Item por su ID
export const obtenerItem = async (id) => {
  try {
    const resultado = await fetch(`${url}/${id}`);
    const item = await resultado.json();
    return item;
  } catch (error) {
    console.log(error);
  }
};

// Actualizar el producto editado
export const editarProducto = async (producto, token) => {
  try {
    await fetch(`${url}/${producto.id}`, {
      method: "PUT",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

//// Más funciones ////

export function mostrarAlerta(texto, tipo) {
  const contenedor = document.querySelector(".contenedor");
  const alerta = document.querySelector(".alerta");
  if (alerta) {
    alerta.remove();
  }
  const alertaDiv = document.createElement("DIV");
  if (tipo === "error") {
    alertaDiv.classList.add(
      "bg-red-100",
      "border",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "relative",
      "mt-5",
      "w-1rem",
      "text-center",
      "alerta"
    );
  } else {
    alertaDiv.classList.add(
      "bg-green-100",
      "border",
      "border-green-400",
      "text-green-700",
      "px-4",
      "py-3",
      "rounded",
      "relative",
      "mt-5",
      "w-1rem",
      "text-center",
      "alerta"
    );
  }
  alertaDiv.textContent = texto;
  contenedor.appendChild(alertaDiv);
  setTimeout(() => {
    alertaDiv.remove();
  }, 3000);
}

export function ningunInputVacio(obj) {
  return Object.values(obj).every((input) => input !== ""); // es true cuando todos los inputs son diferentes a ''.
}
