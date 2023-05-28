import { GET_USER_ACTUAL, CLEAN_USER_ACTUAL } from "./actions.js";

const initialState = {
  userActual: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ACTUAL:
      return {
        ...state,
        userActual: action.payload,
      };
    case CLEAN_USER_ACTUAL:
      return {
        ...state,
        userActual: [],
      };

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
