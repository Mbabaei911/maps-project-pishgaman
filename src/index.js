import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import 'leaflet/dist/leaflet.css';
// import MyComponent from "./1";
// ReactDOM.render(<App />, document.querySelector("#root"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
