import {
  INIT_STORE,
  LOAD_USERS,
  LOGIN,
  RESET_AUTH,
  SET_IN_MODALS_STATE,
} from "./actions";
import jwt from "jsonwebtoken";
export function resetAuth() {
  return async (dispatch) => dispatch({ type: RESET_AUTH });
}

export function logIn(payload) {
  return async (dispatch) => {
    try {
      const { login, password } = payload;
      const response = await fetch("/api/auth/authorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg);
      } else {
        const { id, salt, accessLevel } = jwt.decode(data.token);
        dispatch({
          type: LOGIN,
          payload: {
            data: { login, id, salt, accessLevel, token: data.token },
            error: null,
          },
        });
      }
    } catch (e) {
      dispatch({ type: LOGIN, payload: { token: null, error: e } });
    }
  };
}

export function initModalStore(payload) {
  return (dispatch) => {
    dispatch({ type: INIT_STORE, payload });
  };
}

export function setInModalStore(payload) {
  return (dispatch) => {
    dispatch({ type: SET_IN_MODALS_STATE, payload });
  };
}

export function loadUsers(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/auth/users");
      const data = await response.json();
      dispatch({
        type: LOAD_USERS,
        payload: data,
      });
    } catch (e) {
      console.error(e);
    }
  };
}
