import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

// Use localStorage with Next.js
let localStorageToken;
if (typeof window !== "undefined") {
  localStorageToken = localStorage.getItem("token");
}

const initialState = {
  token: localStorageToken,
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      if (typeof window !== "undefined") {
        localStorage.setItem("token", payload.token);
      }
      return {
        ...state,
        payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
