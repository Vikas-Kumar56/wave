import { combineReducers } from "redux";
import { User } from "./user.reducer";
import { Product } from "./product.reducer";

export default combineReducers({
  User,
  Product
});
