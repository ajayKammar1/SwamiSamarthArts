import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import axios from "axios";
axios.defaults.baseURL = "https://swamisamartharts.onrender.com";
// axios.defaults.baseURL = "http://localhost:4000/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
