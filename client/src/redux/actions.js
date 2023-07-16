import axios from "axios";
export const GET_USER_ACTUAL = "GET_USER_ACTUAL";
export const CLEAN_USER_ACTUAL = "CLEAN_USER_ACTUAL";
export const GET_USUARIOS = "GET_USUARIOS";
export const GET_PRODUCTOS = "GET_PRODUCTOS";
export const GET_CATEGORIAS = "GET_CATEGORIAS";
export const AGREGAR_CARRITO = "AGREGAR_CARRITO";
export const LIMPIAR_CARRITO = "LIMPIAR_CARRITO";
export const ELIMINAR_ITEM_CARRITO = "ELIMINAR_ITEM_CARRITO";
export const DELETE_USER = "DELETE_USER";
export const SEARCHxCATEGORIA = "SEARCHxCATEGORIA";
export const SEARCHxNOMBRE = "SEARCHxNOMBRE";
export const GET_PEDIDOS = "GET_PEDIDOS";
export const GET_ESTADOS = "GET_ESTADOS";
export const GET_TIPOPAGOS = "GET_TIPOPAGOS";
export const DELETE_CATEG = "DELETE_CATEG";
export const GET_SUBCATEGORIAS = "GET_SUBCATEGORIAS";
export const EDITAR_ITEMS_EXTRA = "EDITAR_ITEMS_EXTRA";

/****************** PRODUCTOS ******************/
export const getProductos = () => {
  return async function (dispatch) {
    const response = await axios.get("/productos");
    return dispatch({
      type: GET_PRODUCTOS,
      payload: response.data,
    });
  };
};
export const deleteProducto = (id, token) => {
  return async function (dispatch) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/productos/${id}`, config);
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  };
};

export const searchXname = (nombre) => {
  return {
    type: SEARCHxNOMBRE,
    payload: nombre,
  };
};

/****************** CATEGORIAS ******************/

export const getCategorias = () => {
  return async function (dispatch) {
    const response = await axios.get("/categorias");
    return dispatch({
      type: GET_CATEGORIAS,
      payload: response.data,
    });
  };
};

export const postCateg = (data, token) => {
  return async function () {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post("/categorias", data, config);
    return response;
  };
};
export const deleteCateg = (id, token) => {
  return async function (dispatch) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/categorias/${id}`, config);
    dispatch({
      type: DELETE_CATEG,
      payload: id,
    });
  };
};
export const searchXcategoria = (categoria) => {
  return {
    type: SEARCHxCATEGORIA,
    payload: categoria,
  };
};

/****************** SUBCATEGORIAS ******************/

export const getSubcategorias = () => {
  return async function (dispatch) {
    const response = await axios.get("/subcategorias");
    return dispatch({
      type: GET_SUBCATEGORIAS,
      payload: response.data,
    });
  };
};

export const postSubcateg = (data, token) => {
  return async function () {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post("/categorias", data, config);
    return response;
  };
};
export const deleteSubcateg = (id, token) => {
  return async function (dispatch) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/categorias/${id}`, config);
    dispatch({
      type: DELETE_CATEG,
      payload: id,
    });
  };
};

/****************** USUARIOS ******************/

export const getUsuarios = () => {
  return async function (dispatch) {
    const response = await axios.get("/usuarios");
    return dispatch({
      type: GET_USUARIOS,
      payload: response.data.resultado,
    });
  };
};

export const deleteUsuario = (id, token) => {
  return async function (dispatch) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/usuarios/${id}`, config);
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  };
};

export const bloqueoUsuario = (data, id, token) => {
  return async function (dispatch) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.put(`/usuarios/${id}`, data, config);
    dispatch(getUsuarios());
  };
};

export const desbloqueoUsuario = (data, id, token) => {
  return async function (dispatch) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.put(`/usuarios/${id}`, data, config);
    dispatch(getUsuarios());
  };
};

/****************** LOGIN ******************/
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

export function cleanUserActual() {
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

export const editarItemsExtra = (index, nuevosItems) => {
  return (dispatch) => {
    const storedCart = localStorage.getItem("carrito");
    let carrito = storedCart ? JSON.parse(storedCart) : [];

    if (index >= 0 && index < carrito.length) {
      const producto = carrito[index];
      producto.itemsExtra = nuevosItems;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    dispatch({
      type: EDITAR_ITEMS_EXTRA,
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

/****************** PEDIDOS ******************/
export const getPedidos = () => {
  return async function (dispatch) {
    /* const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }; */
    const response = await axios.get("/pedidos");
    return dispatch({
      type: GET_PEDIDOS,
      payload: response.data,
    });
  };
};

export const createPedido = (payload) => {
  return async function () {
    const response = await axios.post("/pedidos", payload);
    return response;
  };
};

export const updatePedido = (id, data, token) => {
  return async function (dispatch) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.put(`/pedidos/${id}`, data, config);
    dispatch(getPedidos());
  };
};

export const getEstados = () => {
  return async function (dispatch) {
    const response = await axios.get("/estados");
    return dispatch({
      type: GET_ESTADOS,
      payload: response.data,
    });
  };
};
export const getTipoPago = () => {
  return async function (dispatch) {
    const response = await axios.get("/pagos");
    return dispatch({
      type: GET_TIPOPAGOS,
      payload: response.data,
    });
  };
};
