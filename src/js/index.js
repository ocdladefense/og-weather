import { createRoot } from "./components/React";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.scss";


import Controller from "./Controller.js";

let controller = new Controller();

const $root = document.getElementById("app");
const root = createRoot($root);



// Initialize the Weather class on window load
window.onload = () => {
  controller.render();
  // root.render(Controller);
};
