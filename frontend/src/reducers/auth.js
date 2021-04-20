import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/type";
  
  const client = JSON.parse(localStorage.getItem("client"));
  
  const initialState = client
    ? { isLoggedIn: true, client }
    : { isLoggedIn: false, client: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          client: payload.client,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          client: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          client: null,
        };
      default:
        return state;
    }
  }
  