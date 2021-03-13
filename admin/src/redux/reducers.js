import { combineReducers } from 'redux';
import { RESET_AUTH, LOGIN } from './actions';

const authReducer = (state = { token: null, error: null }, action) => {
  switch(action.type) {
    case LOGIN: return action.payload;
    case RESET_AUTH: return {};
    default: return state;
  }
}

export default combineReducers({ auth: authReducer });
