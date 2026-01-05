import { createRoot } from "react-dom";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.scss";
import App from "./components/App.js";



const $root = document.getElementById("app");
const root = createRoot($root);



window.onload = () => {
  root.render(App);
};
