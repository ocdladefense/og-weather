import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.scss";


import Controller from "./Controller.js";

let controller = new Controller();

// Initialize the Weather class on window load
window.onload = () => {
  controller.render();
};
