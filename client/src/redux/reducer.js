import {
  GET_USER_ACTUAL,
  CLEAN_USER_ACTUAL,
  GET_USUARIOS,
  AGREGAR_CARRITO,
  LIMPIAR_CARRITO,
  ELIMINAR_ITEM_CARRITO,
  GET_PRODUCTOS,
  SEARCHxCATEGORIA,
  DELETE_USER,
  GET_CATEGORIAS,
  SEARCHxNOMBRE,
  GET_PEDIDOS,
  GET_ESTADOS,
} from "./actions.js";

const initialState = {
  userActual: null,
  usuarios: [],
  productos: [],
  productosHome: [],
  carrito: [],
  categorias: [],
  pedidos: [],
  estados: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    /****************** PRODUCTOS ******************/
    case GET_PRODUCTOS:
      return {
        ...state,
        productos: [...action.payload],
        productosHome: [...action.payload],
      };
    case GET_CATEGORIAS:
      return {
        ...state,
        categorias: [...action.payload],
      };
    case SEARCHxCATEGORIA: {
      let prodFilter =
        action.payload === "todas"
          ? state.productos
          : state.productos.filter(
              (prod) => prod.categoria.nombre === action.payload
            );
      console.log(prodFilter);
      return {
        ...state,
        productosHome: prodFilter,
      };
    }
    case SEARCHxNOMBRE: {
      const productsFilter = state.productos.filter((e) =>
        e.nombre.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        productosHome: [...productsFilter],
      };
    }

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

    /****************** PEDIDOS ******************/
    case GET_PEDIDOS:
      return {
        ...state,
        pedidos: [...action.payload],
      };
    case GET_ESTADOS:
      return {
        ...state,
        estados: [...action.payload],
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
