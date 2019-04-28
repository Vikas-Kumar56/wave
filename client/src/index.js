import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "./resources/css/styles.css";
import Routes from "./Routes";

/*  Setting up redux*/
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
//import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";

import Reducers from "./reducers";
import History from "./components/utils/History";
import { SnackbarProvider } from "notistack";
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <SnackbarProvider maxSnack={3}>
      <Router history={History}>
        <Routes />
      </Router>
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
