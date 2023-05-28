import axios from "axios";
export const GET_USER_ACTUAL = "GET_USER_ACTUAL";
export const CLEAN_USER_ACTUAL = "CLEAN_USER_ACTUAL";

export const getUserActual = (userData) => {
  return async function (dispatch) {
    console.log(userData);
    const response = await axios.post("/usuarios/login", userData);
    return dispatch({
      type: GET_USER_ACTUAL,
      payload: response.data,
    });
  };
};

export function cleanUserActual(id) {
  return {
    type: CLEAN_USER_ACTUAL,
  };
}
