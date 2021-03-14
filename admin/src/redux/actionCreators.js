import { LOGIN } from "./actions";

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
      dispatch({ type: LOGIN, payload: { token: data.token, error: null } });
    } catch(e) {
      dispatch({ type: LOGIN, payload: { token: null, error: e } });
    }
  }
}
