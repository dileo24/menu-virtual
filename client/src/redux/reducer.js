import { GET_USER_ACTUAL, CLEAN_USER_ACTUAL, GET_USUARIOS } from "./actions.js";

const initialState = {
  userActual: null,
  usuarios: [],
  carrito: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
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

    case GET_USUARIOS:
      return {
        ...state,
        usuarios: [...action.payload],
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

export default rootReducer;
