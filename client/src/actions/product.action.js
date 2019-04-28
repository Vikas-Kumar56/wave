import axios from "axios";
import {
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_SHOP,
  Add_PRODUCT,
  ADD_BRAND,
  ADD_WOOD,
  GET_PRODUCT_BYID
} from "./types";
import { PRODUCT_SERVER } from "../components/utils/misc";

export const getProductsByArrival = () => async dispatch => {
  let products = await axios.get(
    `${PRODUCT_SERVER}/articles?sortBy=createdAt&order=asc`
  );

  dispatch({
    type: GET_PRODUCT_BY_ARRIVAL,
    payload: products.data.articles
  });
};

export const getProductsBySell = () => async dispatch => {
  let products = await axios.get(
    `${PRODUCT_SERVER}/articles?sortBy=sold&order=asc`
  );

  dispatch({
    type: GET_PRODUCT_BY_SELL,
    payload: products.data.articles
  });
};

export const getBrands = () => async dispatch => {
  let brands = await axios.get(`${PRODUCT_SERVER}/brands`);
  dispatch({
    type: GET_BRANDS,
    payload: brands.data.brands
  });
};

export const getWoods = () => async dispatch => {
  let brands = await axios.get(`${PRODUCT_SERVER}/woods`);
  dispatch({
    type: GET_WOODS,
    payload: brands.data.woods
  });
};

export const getProductToShop = (
  skip,
  limit,
  filters,
  previousState = []
) => async dispatch => {
  let data = {
    skip,
    limit,
    filters
  };
  let products = await axios.post(`${PRODUCT_SERVER}/shop`, data);
  dispatch({
    type: GET_PRODUCTS_SHOP,
    payload: [...previousState, ...products.data.shop]
  });
};

export const addProduct = (product, callback) => async dispatch => {
  let products = await axios.post(`${PRODUCT_SERVER}/article`, product);

  dispatch({
    type: Add_PRODUCT,
    payload: products.data.article
  });

  callback();
};

export const addBrand = (brand, callback) => async dispatch => {
  let brandResponse = await axios.post(`${PRODUCT_SERVER}/brand`, brand);

  dispatch({
    type: ADD_BRAND,
    payload: brandResponse.data.brand
  });

  callback();
};

export const addWood = (wood, callback) => async dispatch => {
  let woodResponse = await axios.post(`${PRODUCT_SERVER}/wood`, wood);

  dispatch({
    type: ADD_WOOD,
    payload: woodResponse.data.wood
  });

  callback();
};

export const getProductById = id => async dispatch => {
  let product = await axios.get(
    `${PRODUCT_SERVER}/articlebyid?id=${id}&type=single`
  );
  let payload = null;
  if (product.data && product.data.articles.length > 0) {
    payload = {
      errors: null,
      data: { ...product.data.articles[0] }
    };
  } else if (product.data && product.data.success === false) {
    payload = {
      errors: payload.data.message,
      data: null
    };
  } else {
    payload = {
      errors: "Anything happend unexpected ! try again later",
      data: null
    };
  }

  dispatch({
    type: GET_PRODUCT_BYID,
    payload
  });
};
