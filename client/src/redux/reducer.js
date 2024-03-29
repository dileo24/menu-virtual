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
  GET_SUBCATEGORIAS,
  GET_TIPOPAGOS,
  DELETE_CATEG,
  EDITAR_ITEMS_EXTRA,
  DELETE_SUBCATEG,
} from "./actions.js";

const initialState = {
  userActual: null,
  usuarios: [],
  usuariosBusq: [],
  productos: [],
  home: [],
  homeBusqueda: [],
  carrito: [],
  categorias: [],
  categsBusq: [],
  subcategorias: [],
  pedidos: [],
  pedidosBusq: [],
  estados: [],
  tipoPagos: [],
  itemsExtra: [],
  itemsNoListados: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    /****************** PRODUCTOS ******************/
    case GET_PRODUCTOS:
      const itemsListados = [];
      const itemsNoListados = [];
      const items = action.payload.filter((prod) => prod.item === true);
      items.map((item) =>
        item.listado === true
          ? itemsListados.push(item)
          : itemsNoListados.push(item)
      );

      const productosOrdenados = [...action.payload].sort((a, b) => {
        if (a.subcategoria === null && b.subcategoria === null) {
          return 0;
        }
        if (a.subcategoria === null) {
          return 1;
        }
        if (b.subcategoria === null) {
          return -1;
        }
        return b.subcategoria.nombre.localeCompare(a.subcategoria.nombre);
      });

      return {
        ...state,
        productos: [...action.payload],
        home: productosOrdenados,
        homeBusqueda: [...action.payload],
        itemsExtra: [...items],
        itemsNoListados: [...itemsNoListados],
      };

    case SEARCHxNOMBRE: {
      let removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };

      let searchResult = [];

      switch (action.searchType) {
        case "usuarios":
          searchResult = state.usuarios.filter((user) =>
            removeAccents(user.nombre.toLowerCase()).includes(
              removeAccents(action.payload.toLowerCase())
            )
          );
          return {
            ...state,
            usuariosBusq: searchResult,
          };
        case "categorias":
          searchResult = state.categorias.filter((categoria) =>
            removeAccents(categoria.nombre.toLowerCase()).includes(
              removeAccents(action.payload.toLowerCase())
            )
          );
          return {
            ...state,
            categsBusq: searchResult,
          };
        default:
          let productsSearch = state.productos.filter((producto) =>
            removeAccents(producto.nombre.toLowerCase()).includes(
              removeAccents(action.payload.toLowerCase())
            )
          );
          return {
            ...state,
            homeBusqueda: productsSearch,
          };
      }
    }

    /****************** CATEGORIAS ******************/
    case GET_CATEGORIAS:
      return {
        ...state,
        categorias: [...action.payload],
        categsBusq: [...action.payload],
      };
    case SEARCHxCATEGORIA: {
      let prodFilter =
        action.payload === "todas"
          ? state.productos
          : state.productos.filter(
              (prod) => prod.categoria.nombre === action.payload
            );
      return {
        ...state,
        home: prodFilter,
      };
    }
    case DELETE_CATEG:
      return {
        ...state,
        categorias: state.categorias.filter(
          (categ) => categ.id !== action.payload
        ),
      };

    /****************** SUBCATEGORIAS ******************/
    case GET_SUBCATEGORIAS:
      return {
        ...state,
        subcategorias: [...action.payload],
      };
    case DELETE_SUBCATEG:
      return {
        ...state,
        subcategorias: state.subcategorias.filter(
          (subcateg) => subcateg.id !== action.payload
        ),
      };

    /****************** USUARIOS ******************/
    case GET_USUARIOS:
      return {
        ...state,
        usuarios: [...action.payload],
        usuariosBusq: [...action.payload],
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

    case EDITAR_ITEMS_EXTRA:
      return {
        ...state,
        carrito: action.payload,
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
    case GET_TIPOPAGOS:
      return {
        ...state,
        tipoPagos: [...action.payload],
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
