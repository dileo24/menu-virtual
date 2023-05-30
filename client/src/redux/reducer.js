import {
  GET_USER_ACTUAL,
  CLEAN_USER_ACTUAL,
  GET_USUARIOS,
  AGREGAR_CARRITO,
  LIMPIAR_CARRITO,
  ELIMINAR_ITEM_CARRITO,
  GET_PRODUCTOS,
  DELETE_USER,
} from "./actions.js";

const initialState = {
  userActual: null,
  usuarios: [],
  productos: [],
  carrito: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    /****************** PRODUCTOS ******************/
    case GET_PRODUCTOS:
      return {
        ...state,
        productos: [...action.payload],
      };

    /****************** USUARIOS ******************/
    case GET_USUARIOS:
      return {
        ...state,
        usuarios: [...action.payload],
      };

    case DELETE_USER:
      return {
        ...state,
        usuarios: state.usuarios.filter((user) => user.id !== action.payload),
      };

    /****************** LOGIN ******************/
    case GET_USER_ACTUAL:
      return {
        ...state,
        userActual: action.payload,
      };

    case CLEAN_USER_ACTUAL:
      localStorage.removeItem("userActual");
      return {
        ...state,
        userActual: null,
      };

    /****************** CARRITO ******************/
    case AGREGAR_CARRITO:
      return {
        ...state,
        carrito: action.payload,
      };

    case LIMPIAR_CARRITO:
      return {
        ...state,
        carrito: [],
      };

    case ELIMINAR_ITEM_CARRITO:
      return {
        ...state,
        carrito: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}

const storedUserActual = localStorage.getItem("userActual");
if (storedUserActual) {
  initialState.userActual = JSON.parse(storedUserActual);
}

const storedCart = localStorage.getItem("carrito");
if (storedCart) {
  initialState.carrito = JSON.parse(storedCart);
}

export default rootReducer;
