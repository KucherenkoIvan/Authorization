import { combineReducers } from "redux";
import {
  RESET_AUTH,
  LOGIN,
  INIT_STORE,
  SET_IN_MODALS_STATE,
  LOAD_USERS,
} from "./actions";

const authReducer = (state = { data: null, error: null }, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case RESET_AUTH:
      return {};
    default:
      return state;
  }
};

const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case INIT_STORE:
      return { ...state, [action.payload.key]: action.payload.value };
    case SET_IN_MODALS_STATE:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

const usersReducer = (state = { rows: [] }, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return { rows: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  modals: modalReducer,
  users: usersReducer,
});
