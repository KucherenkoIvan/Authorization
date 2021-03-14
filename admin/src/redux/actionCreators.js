import { LOGIN, RESET_AUTH } from "./actions";
import jwt from 'jsonwebtoken';

export function resetAuth() {
  return async dispatch => dispatch({ type: RESET_AUTH });
}

export function logIn(payload) {
  return async dispatch => {
    try {
      const {login, password} = payload;

      const response = await fetch('/api/auth/authorize', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login,
          password
        })
      })

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.msg);
      }
      else{
        const {id, salt, accessLevel} = jwt.decode(data.token);
        dispatch({ type: LOGIN, payload: { data: {login, id, salt, accessLevel}, error: null } });
      }
    } catch(e) {
      dispatch({ type: LOGIN, payload: { token: null, error: e } });
    }
  }
}
