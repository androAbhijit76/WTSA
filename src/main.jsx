import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";

import Store from "./app/Store.js";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <ToastContainer />

      <App />
    </Provider>
  </React.StrictMode>
);
