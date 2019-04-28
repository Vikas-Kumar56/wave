import {
  LOGINUSER,
  REGISTERUSER,
  REGISTER_ERROR,
  AUTH_USER,
  LOGOUT,
  ADD_TO_CART,
  GET_USER_CART
} from "../actions/types";

export const User = (state = null, action) => {
  switch (action.type) {
    case LOGINUSER:
      return { ...state, userData: action.payload };
    case REGISTERUSER:
      return { ...state, userData: action.payload, error: undefined };
    case REGISTER_ERROR:
      return { ...state, error: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT:
      return { userData: action.payload };
    case ADD_TO_CART:
      return {
        ...state,
        userData: { ...state.userData, cart: action.payload }
      };
    case GET_USER_CART:
      return {
        ...state,
        cartDetail: [...action.payload]
      };
    default:
      return state;
  }
};
