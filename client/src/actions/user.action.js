import axios from "axios";
import {
  LOGINUSER,
  REGISTERUSER,
  REGISTER_ERROR,
  AUTH_USER,
  LOGOUT,
  ADD_TO_CART,
  GET_USER_CART
} from "./types";
import { USER_SERVER, PRODUCT_SERVER } from "../components/utils/misc";
import History from "../components/utils/History";

export const LogIn = (payload, callback) => async dispatch => {
  let user = await axios.post(`${USER_SERVER}/login`, payload);

  if (user.data.success) {
    dispatch({
      type: LOGINUSER,
      payload: user.data
    });

    callback();
  } else {
    callback(user.data.message);
  }
};

export const RegisterUser = payload => async dispatch => {
  let user = await axios.post(`${USER_SERVER}/register`, payload);
  console.log(user);
  if (user.data.success) {
    dispatch({
      type: REGISTERUSER,
      payload: user.data.userdata
    });

    History.push("/register_login");
  } else {
    dispatch({
      type: REGISTER_ERROR,
      payload: user.data.err
    });
  }
};

export const AuthUser = () => async dispatch => {
  let user = await axios.get(`${USER_SERVER}/auth`);

  dispatch({
    type: AUTH_USER,
    payload: user.data
  });
};

export const LogOutUser = () => async dispatch => {
  let user = await axios.get(`${USER_SERVER}/logout`);

  dispatch({
    type: LOGOUT,
    payload: user
  });

  History.push("/");
};

export const addToCart = (productId, callback) => async dispatch => {
  const response = await axios.post(
    `${USER_SERVER}/addToCart?productId=${productId}`
  );

  if (response.data.success) {
    dispatch({
      type: ADD_TO_CART,
      payload: response.data.cart
    });
  }
  callback();
};

export const getUserCart = (cartItem, userCart) => async dispatch => {
  const response = await axios.get(
    `${PRODUCT_SERVER}/articlebyid?id=${cartItem}&type=array`
  );

  userCart.forEach(item => {
    response.data.articles.forEach((prod, i) => {
      if (prod._id === item.id) {
        response.data.articles[i].quantity = item.quantity;
      }
    });
  });

  dispatch({
    type: GET_USER_CART,
    payload: response.data.articles
  });
};
