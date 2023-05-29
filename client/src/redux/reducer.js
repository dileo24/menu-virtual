import { GET_USER_ACTUAL, CLEAN_USER_ACTUAL } from "./actions.js";

const initialState = {
  userActual: null,
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
