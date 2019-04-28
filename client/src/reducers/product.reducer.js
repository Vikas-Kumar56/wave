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
} from "../actions/types";

const InitialState = {
  product_by_sell: [],
  product_by_arrival: [],
  brands: [],
  woods: [],
  list: [],
  add_product: {},
  add_brand: {},
  add_wood: {},
  product_by_id: {}
};
export const Product = (state = InitialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_SELL:
      return { ...state, product_by_sell: [...action.payload] };
    case GET_PRODUCT_BY_ARRIVAL:
      return { ...state, product_by_arrival: [...action.payload] };
    case GET_BRANDS:
      return { ...state, brands: [...action.payload] };
    case GET_WOODS:
      return { ...state, woods: [...action.payload] };
    case GET_PRODUCTS_SHOP:
      return { ...state, list: [...action.payload] };
    case Add_PRODUCT:
      return { ...state, add_product: { ...action.payload } };
    case ADD_BRAND:
      return {
        ...state,
        add_brand: { ...action.payload },
        brands: [...state.brands, action.payload]
      };
    case ADD_WOOD:
      return {
        ...state,
        add_wood: { ...action.payload },
        woods: [...state.woods, action.payload]
      };
    case GET_PRODUCT_BYID:
      return {
        ...state,
        product_by_id: { ...action.payload }
      };
    default:
      return state;
  }
};
