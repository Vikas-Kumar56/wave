import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./HOC/Layout";
import Home from "./components/Home";
import RegisterLogin from "./components/register_login";
import Register from "./components/register_login/Register";
import UserDashboard from "./components/User";
import Auth from "./HOC/Auth";
import Shop from "./components/Shop";
import AddProduct from "./components/User/Admin/AddProduct";
import ManageCategories from "./components/User/Admin/ManageCategories";
import Product from "./components/Product";
import UserCart from "./components/User/Admin/Cart";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route
          path="/admin/add_product"
          exact
          component={Auth(AddProduct, true, true)}
        />

        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true, true)}
        />
        <Route
          path="/product_details/:id"
          exact
          component={Auth(Product, null)}
        />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};
export default Routes;
