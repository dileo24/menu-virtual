import axios from "axios";
export const GET_USER_ACTUAL = "GET_USER_ACTUAL";
export const CLEAN_USER_ACTUAL = "CLEAN_USER_ACTUAL";
export const GET_USUARIOS = "GET_USUARIOS";
export const AGREGAR_CARRITO = "AGREGAR_CARRITO";
export const LIMPIAR_CARRITO = "LIMPIAR_CARRITO";
export const ELIMINAR_ITEM_CARRITO = "ELIMINAR_ITEM_CARRITO";

export const getUserActual = (userData) => {
  return async function (dispatch) {
    const storedUserActual = localStorage.getItem("userActual");
    if (!storedUserActual) {
      // si no, pedir que se logee y guardar datos
      const response = await axios.post("/usuarios/login", userData);
      const userActual = await response.data;

      localStorage.setItem("userActual", JSON.stringify(userActual));

      return dispatch({
        type: GET_USER_ACTUAL,
        payload: userActual,
      });
    } else {
      // si ya se logeó, reutilizar su info como usuario actual
      const parsedUserActual = JSON.parse(storedUserActual);
      return dispatch({
        type: GET_USER_ACTUAL,
        payload: parsedUserActual,
      });
    }
  };
};

export const getUsuarios = () => {
  return async function (dispatch) {
    const response = await axios.get("/usuarios");
    return dispatch({
      type: GET_USUARIOS,
      payload: response.data.resultado,
    });
  };
};

export const register = (userData, token) => {
  return async function () {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post("/usuarios/register", userData, config);
    return response;
  };
};

export function cleanUserActual(id) {
  return {
    type: CLEAN_USER_ACTUAL,
  };
}

/****************** CARRITO ******************/
export const agregarCarrito = (producto) => {
  return (dispatch) => {
    const storedCart = localStorage.getItem("carrito");
    let carrito = storedCart ? JSON.parse(storedCart) : [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    console.log(carrito);
    dispatch({
      type: AGREGAR_CARRITO,
      payload: carrito,
    });
  };
};

export const eliminarItemCarrito = (id) => {
  return (dispatch) => {
    const storedCart = localStorage.getItem("carrito");
    let carrito = storedCart ? JSON.parse(storedCart) : [];

    const indiceProducto = carrito.findIndex((producto) => producto.id === id);
    if (indiceProducto !== -1) {
      carrito.splice(indiceProducto, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    dispatch({
      type: ELIMINAR_ITEM_CARRITO,
      payload: carrito,
    });
  };
};

export const limpiarCarrito = () => {
  return (dispatch) => {
    localStorage.removeItem("carrito");

    dispatch({
      type: LIMPIAR_CARRITO,
    });
  };
};
