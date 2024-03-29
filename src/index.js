/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-named-as-default-member */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import "./index.css";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";

import configureStore from "./configureStore";

const store = configureStore();
window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
