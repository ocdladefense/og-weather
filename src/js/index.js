import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.scss";
import "regenerator-runtime/runtime";

import bootstrap from "bootstrap";
import App from "./App.js";

let app = new App();

// Initialize the Weather class on window load
window.onload = () => {
  app.render();
};
